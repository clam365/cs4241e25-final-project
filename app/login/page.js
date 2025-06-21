"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Page() {
    //Message to say if we don't have account or not logged in correctly
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        //send the meesage with a timer for view
        const params = new URLSearchParams(window.location.search);
        const msg = params.get('msg');
        if (msg) {
            setMessage(msg);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, []);

    //handle our submit functionality, same thing as in server.js , just simpler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = new FormData(e.target);
        const username = loginData.get('username');
        const password = loginData.get('password');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (result.success) {
                router.push('/admin');
            } else {
                // Handle error responses
                setMessage(result.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Error occurred.');
        }
    };
    return(
        <div className="bg-white w-1/2 justify-center flex flex-col m-auto">
            <div className="pt-20">
                <div className="flex items-center m-auto gap-4 justify-center">
                    <div className="flex gap-4 items-center m-auto">
                        <Image id="northstar" src="/northstar.jpg" alt="northstar" width={50} height={50}/>
                        <h1 className="font-bold text-2xl">Northstar Cafe</h1>
                    </div>
                </div>
                <form className="w-1/2 m-auto pt-10" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="text-md mb-2 text-[#5E718E]">
                        Username<span className="text-[#ef4444]"> *</span>
                    </label>
                    <input
                        required
                        name="username"
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        className="w-full p-4 border border-[#ECEBEB] rounded bg-[#FCFCFC] focus:outline-none focus:border-[#5E718E]"
                    />
                    <br/>
                    <br/>
                    <label htmlFor="password" className="text-md mb-2 text-[#5E718E]">
                        Password<span className="text-[#ef4444]"> *</span>
                    </label>
                    <input
                        required
                        name="password"
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        className="w-full p-4 border border-[#ECEBEB] rounded bg-[#FCFCFC] focus:outline-none focus:border-[#5E718E]"
                    />
                    <br/>
                    <br/>
                    <button
                        id="submitLogin"
                        type="submit"
                        className="text-white bg-black p-3 rounded-md hover:bg-[#161513] transition w-full m-auto"
                    >
                        Sign In
                    </button>
                </form>
                <br/>
                <br/>
                {message && (
                    <div className="mt-10 w-1/2 m-auto text-center text-red-600 flex justify-center">
                        {message}
                    </div>
                )}
            </div>
        </div>
    )
}