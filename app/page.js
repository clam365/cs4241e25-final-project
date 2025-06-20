import Image from "next/image";
import {Button} from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="">
        {/* image from https://www.pexels.com/photo/elegant-ceramic-tea-set-on-wooden-tray-31251474/ , edited using Canva*/}
        <Image src={"/northstar.co.png"} alt={"Hero Section"} width={3000} height={2000} className={"w-full"}/>
        <div className={"p-16 flex justify-center text-center"}>
            <h1 className={"font-bold text-4xl md:text-6xl text-midnightBlack"}>coffee that points <br/> you home.</h1>
        </div>
        {/* drink content */}
        <div className={"grid grid-cols-1 md:grid-cols-3 p-6 md:p-16 gap-8"} id={"order"}>
            <div>
                <Image src={"/matchaMockup.jpg"} alt={"mockup"} height={750} width={500}/>
                <h1 className={" text-xl mt-4"}>Matcha Latte</h1>
                <p className={"text-gray-400"}>$5.00</p>
                <div className={"justify-center flex mt-4"}>
                    <Button className={"bg-deepExpressoClay hover:bg-hoverDeepExpressoClay text-xl p-6 px-8 rounded-full cursor-pointer"}>order</Button>
                </div>
            </div>
            <div>
                <Image src={"/matchaMockup.jpg"} alt={"mockup"} height={750} width={500}/>
                <h1 className={" text-xl mt-4"}>Strawberry Matcha Latte</h1>
                <p className={"text-gray-400"}>$5.50</p>
                <div className={"justify-center flex mt-4"}>
                    <Button
                        className={"bg-deepExpressoClay hover:bg-hoverDeepExpressoClay text-xl p-6 px-8 rounded-full cursor-pointer"}>order</Button>
                </div>
            </div>
            <div>
                <Image src={"/matchaMockup.jpg"} alt={"mockup"} height={750} width={500}/>
                <h1 className={" text-xl mt-4"}>Caramel Iced Coffee</h1>
                <p className={"text-gray-400"}>$4.75</p>
                <div className={"justify-center flex mt-4"}>
                    <Button
                        className={"bg-deepExpressoClay hover:bg-hoverDeepExpressoClay text-xl p-6 px-8 rounded-full cursor-pointer"}>order</Button>
                </div>
            </div>
        </div>
    </div>
  );
}
