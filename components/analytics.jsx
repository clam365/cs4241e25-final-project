"use client"
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

//register chartjs
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics() {
    const [chartData, setChartData] = useState(null);
    const [analyticsStats, setAnalyticsStats] = useState(null);

    useEffect(() => {
        loadAnalyticsData().then();
    }, []);

    const loadAnalyticsData = async () => {
        try {
            const response = await fetch('/analytics');
            if (!response.ok) {
                console.log("Failed to fetch analytics data")
                return;
            }
            const analyticsData = await response.json();

            //Analytical Data
            const drinkCount = {};
            let totalRevenue = 0;
            let completedOrders = 0;
            let totalProcessingTime = 0;

            //drinkTypes will be separated for comparison

            analyticsData.forEach(order => {
                const drinkType = order.drink;
                if (drinkType) {
                    drinkCount[drinkType] = (drinkCount[drinkType] || 0) + 1;
                }

                totalRevenue += order.price; //total revenue

                //average processing time & complete order +1
                if (order.orderStatus === 'Completed') {
                    const placedTime = new Date(order.placedAt);
                    const completedTime = new Date(order.completedAt);
                    const processingTime = (completedTime - placedTime) / (1000 * 60);
                    totalProcessingTime += processingTime;
                    completedOrders++;
                }

            })

            //taken from base chartjs colors from their site example on doughnut charts
            const colors = ['#FFCD56', '#36A2EB', '#FF6384' ]

            //chart data
            const data = {
                labels: Object.keys(drinkCount),
                datasets: [{
                    label: 'Drink Orders',
                    data: Object.values(drinkCount),
                    backgroundColor: colors.slice(0, Object.keys(drinkCount).length), //limit colors to just the drink type amounts, but its already technically defined already
                    hoverOffset: 4
                }]
            }

            //stats
            const stats = {
                totalOrders: analyticsData.length,
                totalRevenue: totalRevenue.toFixed(2),
                //need to be more than 0 here
                averageProcessingTime: completedOrders > 0 ? (totalProcessingTime / completedOrders).toFixed(1) : 'N/A'
            }
            setChartData(data);
            setAnalyticsStats(stats);
        }
        catch (err) {
            console.error('Error loading analytics data', err);
        }
    }

    if (!chartData) {
        return <div className={"mt-10 text-center"}>Loading our analytics...</div>
    }
    return(
        <div className=" max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-2">Drink Order Analytics</h1>
            <p className={"mb-6 text-center"}>(Total Orders)</p>
            <div className={"flex flex-col md:flex-row md:items-center md:justify-center md:gap-10 m-auto"}>
                <Doughnut
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }}
                />
                <div>
                    <h1 className={"whitespace-nowrap "}>
                        <span className={"font-semibold "}>Total Order Amounts: </span>{analyticsStats.totalOrders}
                    </h1>
                    <h1 className={"whitespace-nowrap "}>
                        <span className={"font-semibold"}>Total Revenue: </span>${analyticsStats.totalRevenue}
                    </h1>
                    <h1 className={"whitespace-nowrap "}>
                        <span className={"font-semibold"}>Average time to make drinks: </span>{analyticsStats.averageProcessingTime} minutes
                    </h1>
                </div>
            </div>

        </div>
    )
}