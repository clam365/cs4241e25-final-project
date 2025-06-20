"use client"
import Link from "next/link";
import {CircleUserRound} from "lucide-react";
import {usePathname} from "next/navigation";

export const Navbar = () => {
    const pathname = usePathname();
    const onPage = (path) => {
        return `hover:underline hover:underline-offset-1 transition ${pathname === path ? "text-matchaGreen font-semibold underline underline-offset-1" : ""}`
    };

    return(
        <div className={"flex justify-evenly  p-6 md:p-10  items-center"}>
            <Link href={"/"} >
                <h1 className={"font-bold text-xl"}>northstar</h1>
            </Link>
            <Link href={"/order"} className={onPage("/order")}>order</Link>
            <Link href={"/about"} className={onPage("/about")}>about</Link>
            <Link href={"#contact"} className={onPage("/#contact")}>contact</Link>
            <Link href={"/login"} className={`flex items-center gap-x-2 ${onPage("/login")}`}><CircleUserRound className={"hidden md:block"}/>login</Link>
        </div>
    )
}

