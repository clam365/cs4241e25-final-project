"use client"
import {Table, Checkbox} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import Analytics from "@/components/analytics";

export default function Page() {
    //because we are using RadixUI, we cant just use DOM. We instead will use this to map it out in the actual component from here
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadTableData().then();

    }, []);

    const loadTableData = async function () {
        try {
            const response = await fetch("/orders");
            if (!response.ok) {
                const text = await response.text();
                alert("Server error: " + text);
                return;
            }

            // Grab our orders from json form and store in array form to be mapped out
            const drinkOrders = await response.json();
            setOrders(drinkOrders);
        }
        catch (err) {
            console.error("Could not load entries", err)
        }
    }

    async function completeOrder(id) {
        try {
            const response = await fetch(`/orders/${id}`, { //grab id
                method: 'DELETE'
            });
            if (!response.ok) {
                const text = await response.text();
                alert("Failed to complete: " + text);
                return;
            }
            await loadTableData(); // refresh the table
        }
        catch (err) {
            console.error('Error completing order', err);
            alert("Could not complete order, error");
        }
    }

    return(
        <div className={"flex flex-col justify-center"}>
            <Table.Root className={"mt-10 w-[80%] md:w-[65%] lg:w-1/2 m-auto"}>
                <Table.Header className={"bg-[#f2f2f2] "}>
                    <Table.Row>
                        <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Drink</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Temperature</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Milk</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Sweetness</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Special Instructions</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Timestamp</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Completed</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {orders.map(order => (
                        <Table.Row key={order._id} className={"align-middle"}>
                            <Table.Cell>{order.firstName}</Table.Cell>
                            <Table.Cell>{order.drink}</Table.Cell>
                            <Table.Cell>{order.temp}</Table.Cell>
                            <Table.Cell>{order.milk}</Table.Cell>
                            <Table.Cell>{order.sweetness}</Table.Cell>
                            <Table.Cell>{order.specialInstructions}</Table.Cell>
                            <Table.Cell>{dayjs(order.timestamp).format('M/D [at] h:mm A')}</Table.Cell>
                            <Table.Cell className={"text-center"} >
                                <Checkbox className={"m-auto flex justify-center"} color={"brown"} onClick={() => completeOrder(order._id)}/>
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table.Root>
            <div className={"mt-10"}></div>
            <Analytics/>
        </div>
    )
}