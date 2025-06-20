import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Theme} from "@radix-ui/themes";
import {Navbar} from "@/components/navbar";
import Contact from "@/components/contact";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "northstar.co",
    description: "Final Project",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Theme>
            <Navbar/>
            {children}
            <Contact/>
        </Theme>
        </body>
        </html>
    );
}
