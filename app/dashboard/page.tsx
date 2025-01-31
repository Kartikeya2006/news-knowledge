"use client";

import { useSession } from "next-auth/react";
import Navbar from "../components/NavBar";

export default function Dashboard() {
    const { data: session } = useSession();
    
    return (
        <main className="bg-[#F8F8DE] h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center justify-center p-8">
                <div className="bg-white rounded-xl shadow-md p-8 border border-[#D3C6A6] max-w-2xl w-full">
                    <h1 className="text-2xl text-[#4A4A2F] font-semibold mb-4 text-center">
                        Welcome, <span className="text-[#5C4033]">{session?.user?.name}</span> 👋
                    </h1>
                    <p className="text-lg text-[#706F6F] text-center">
                        You are now logged into <span className="font-semibold text-[#5C4033]">News Knowledge</span> 🎉
                    </p>
                    <div className="mt-6 p-4 bg-[#F5F5DC] rounded-lg shadow-sm border border-[#C3B091] text-center">
                        <h2 className="text-lg font-semibold text-[#4A4A2F]">Your Details:</h2>
                        <p className="text-md text-[#5C4033]">📧 {session?.user?.email}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
