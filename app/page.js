"use client";
import Image from "next/image";
import {Button, Dialog, RadioGroup} from "@radix-ui/themes";
import {X} from "lucide-react";
import {drinkData} from "@/components/menuItems";
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Home() {
    return (
        <div className="">
            {/* image from https://www.pexels.com/photo/elegant-ceramic-tea-set-on-wooden-tray-31251474/ , edited using Canva*/}
            <Image src={"/northstar.co.png"} alt={"Hero Section"} width={3000} height={2000} />
            <div className={"p-16 flex justify-center text-center"}>
                <h1 className={"font-bold text-4xl md:text-6xl text-midnightBlack"}>coffee that points <br/> you home.
                </h1>
            </div>
            {/* drink content */}
            <div className={"grid grid-cols-1 md:grid-cols-3 p-6 md:p-16 gap-8"} id={"order"}>
                {drinkData.map((drink) => (
                    <DrinkItem key={drink.id} drink={drink}/>
                ))}
            </div>
        </div>
    );
}

export const DrinkItem = ({drink}) => {
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false); //this is to close the dialog when a form is submitted
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        //drink entry data
        const drinkEntry = new FormData(e.target);
        const data = {
            firstName: drinkEntry.get('firstName'),
            drink: drinkEntry.get('drinkType'),
            temp: drinkEntry.get('temp'),
            price: drink.price,
            milk: drinkEntry.get('milk'),
            sweetness: drinkEntry.get('sweetness'),
            timestamp: new Date().toISOString(),
            specialInstructions: drinkEntry.get('specialInstructions') || '' //optional comments
        };

        //Post
        try {
            const response = await fetch('orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                //Show success
                alert('Thank you for your order! We will call your name shortly for your order. -Chris');
                //Reset form
                e.target.reset();
                setOpen(false);
            }
            else {
                const error = await response.json();
                alert(`Error: ${error.error || 'failed to submit form'}`);
            }
        }
        catch (error) {
            console.log("Form submission error:", error);
            alert('An error occurred while submitting the form. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }



    return (
        <div>
            {/* image from https://www.freepik.com/free-ai-image/delicious-matcha-tea-scene_358281285.htm#fromView=keyword&page=1&position=4&uuid=090c6e9d-da5c-44d4-8a75-6f9f95ea2867&query=Matcha+Latte+Png*/}
            <Image src={drink.image || "/matchaMockup.jpg"} alt={drink.drinkType || "drink"} height={500} width={400} className={"w-[750] h-[500px] object-cover"}/>
            <h1 className={" text-xl mt-4"}>{drink.drinkType}</h1>
            <p className={"text-gray-400"}>${drink.price?.toFixed(2)}</p>
            <div className={"justify-center flex mt-4"}>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger>
                        <Button
                            className={"bg-deepExpressoClay hover:bg-hoverDeepExpressoClay text-xl p-6 px-8 rounded-full cursor-pointer "}>order</Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title id={"drink"}>{drink.drinkType}</Dialog.Title>
                        <div className={"justify-between flex items-center"}>
                            <div>
                                <Dialog.Description>
                                    {drink.description || "Cool drink am i right?"} <br/>
                                    ${drink.price?.toFixed(2)}
                                </Dialog.Description>
                            </div>
                            <Dialog.Close className={"cursor-pointer"}>
                                <X className={"w-10 h-10 text-midnightBlack"}/>
                            </Dialog.Close>
                        </div>
                        <br/>
                        <img src={drink.image || "/matchaMockup.jpg"} alt={drink.drinkType || "drink"}  height={300}
                               width={250} className={"m-auto mb-10 rounded-lg"}/>
                        <form id={"orderDrink"} className={"space-y-4"} onSubmit={handleSubmit}>
                            {/* Drink Type; hidden because we already have it when opening tab */}
                            <input type="hidden" name="drinkType" value={drink.drinkType}/>
                            {/* Temperature */}
                            <RadioGroup.Root required color={"brown"} defaultValue={"Iced"} name={"temp"} id={"temp"}>
                                <h1 className={"text-md text-[#5E718E]"}>Temperature<span
                                    className="text-[#ef4444]"> *</span></h1>
                                <RadioGroup.Item value={"Iced"}>Iced</RadioGroup.Item>
                                <RadioGroup.Item value={"Hot"}>Hot</RadioGroup.Item>
                            </RadioGroup.Root>
                            {/* Milk Options */}
                            <RadioGroup.Root required color={"brown"} defaultValue={"Whole Milk"} name={"milk"}
                                             id={"milk"}>
                                <h1 className={"text-md text-[#5E718E]"}>Milks<span className="text-[#ef4444]"> *</span>
                                </h1>
                                <RadioGroup.Item value={"Whole Milk"}>Whole Milk</RadioGroup.Item>
                                <RadioGroup.Item value={"Oat Milk"}>Oat Milk</RadioGroup.Item>
                            </RadioGroup.Root>
                            {/* Sweetness */}
                            <div>
                                <label htmlFor="sweetness" className="text-md mb-2 text-[#5E718E]">
                                    Sweetness<span className="text-[#ef4444]"> *</span>
                                </label>
                                <input
                                    required
                                    name="sweetness"
                                    type="number"
                                    id="sweetness"
                                    placeholder="Enter your sweetness amount"
                                    className="w-full p-4 border border-[#ECEBEB] rounded bg-[#FCFCFC] focus:outline-none focus:border-[#5E718E]"
                                />
                            </div>
                            {/* First Name */}
                            <div>
                                <label htmlFor="specialInstructions" className="text-md mb-2 text-[#5E718E]">
                                    First Name<span className="text-[#ef4444]"> *</span>
                                </label>
                                <input
                                    required
                                    name="firstName"
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    className="w-full p-4 border border-[#ECEBEB] rounded bg-[#FCFCFC] focus:outline-none focus:border-[#5E718E]"
                                />
                            </div>
                            {/* Special Instructions */}
                            <div>
                                <label htmlFor="specialInstructions" className="text-md mb-2 text-[#5E718E]">
                                    Special Instructions
                                </label>
                                <input
                                    name="specialInstructions"
                                    type="text"
                                    id="specialInstructions"
                                    placeholder="Enter any special instructuions"
                                    className="w-full p-4 border border-[#ECEBEB] rounded bg-[#FCFCFC] focus:outline-none focus:border-[#5E718E]"
                                />
                            </div>
                            <Button
                                type={"submit"}
                                className={" mt-6 w-full bg-deepExpressoClay hover:bg-hoverDeepExpressoClay text-xl p-6 px-8 rounded-full cursor-pointer"}>Order
                                Drink
                            </Button>
                        </form>
                    </Dialog.Content>
                </Dialog.Root>


            </div>
        </div>
    )
}
