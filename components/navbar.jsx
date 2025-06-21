"use client"
import Link from "next/link";
import {CircleUserRound} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export const Navbar = () => {
    const pathname = usePathname();
    const [loggedIn, isLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [sessionCheckTrigger, setSessionCheckTrigger] = useState(0);
    const router = useRouter();

    //Check our session to display "log in or log out"
    const checkSession = async function () {
        try {
            const res = await fetch('/session');
            const data = await res.json();
            isLoggedIn(data.loggedIn);
            setUserId(data.userId);
        } catch (err) {
            console.log("Error fetching user data", err);
            isLoggedIn(false);
            setUserId(null);
        }
    }

    //check our session
    useEffect(() => {
        checkSession().then();
    }, [pathname, sessionCheckTrigger]);


    const onPage = (path) => {
        return `hover:underline hover:underline-offset-1 transition ${pathname === path ? "text-matchaGreen font-semibold underline underline-offset-1" : ""}`
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                credentials: 'include' // Important: include cookies
            });

            if (response.ok) {
                isLoggedIn(false);
                setUserId(null);
                router.push('/');
            }
            await checkSession().then();
            setSessionCheckTrigger(prev => prev + 1);
        } catch (error) {
            console.error('Logout error:', error);
            router.push('/');
            isLoggedIn(false); //reset
            setUserId(null);
            setSessionCheckTrigger(prev => prev + 1);
        }
    };

    return (
        <div className={"flex justify-evenly  p-6 md:p-10  items-center"}>
            <Link href={"/"}>
                <h1 className={"font-bold text-xl text-midnightBlack"}>northstar.co</h1>
            </Link>
            <Link href={"/#order"} className={onPage("/#order")}>order</Link>
            <Link href={"/about"} className={onPage("/about")}>about</Link>
            <Link href={"/#contact"} className={onPage("/#contact")}>contact</Link>
            {loggedIn ? (
                <div className="flex items-center gap-x-4">
                    <button onClick={handleLogout} className="text-red-500 hover:underline">logout</button>
                </div>
            ) : (
                <Link href={"/login"} className={`flex items-center gap-x-2 ${onPage("/login")}`}>
                    <CircleUserRound className={"hidden md:block"}/> login
                </Link>
            )}        </div>
    )
}

