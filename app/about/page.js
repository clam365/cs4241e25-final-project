import Image from "next/image";

export default function Page() {
    return(
        <div>
            {/* Image from https://www.pexels.com/photo/white-ceramic-mug-on-espresso-machine-filling-with-brown-liquid-302894/ */}
            <Image src={"/coffee.jpg"} alt={"About"} width={1920} height={1080} className={"w-full h-[25rem] object-cover"}/>
            <div className={"text-center my-16"}>
                <h1 className={"font-semibold text-4xl"}>SEASON ONE OF NORTHSTAR.CO!</h1>
                <p className={"text-gray-400 mt-6 w-1/2 m-auto"}>
                    northstar.co is officially open!! Located in the Worcester County area, our home coffee shop is dedicated to serving thoughtfully crafted coffee
                    and tea beverages in a cozy and welcoming space. Whether you are grabbing your morning latte, catching up with friends, or just want to sit in the sun,
                    we aim to be your guiding star for a great drink and community.

                    <br/>
                    <br/>
                    - Chris
                </p>
            </div>
        </div>
    )
}