"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="bg-[#F8F8DE] flex h-screen justify-center items-center px-6">
      <div className="rounded-xl h-[650px] w-full max-w-lg bg-[#F5F5DC] p-10 flex flex-col justify-center items-center shadow-xl border border-[#D3C6A6]">
        <h1 className="text-[#4A4A2F] text-3xl font-bold text-center leading-snug">
          Welcome to  
          <span className="block text-[#5C4033] text-4xl mt-2">NEWS KNOWLEDGE</span>
        </h1>
        <p className="text-[#706F6F] text-lg mt-4 text-center max-w-md leading-relaxed">
          Your gateway to the latest headlines, insights, and in-depth news coverage.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-10 px-6 py-3 bg-[#C3B091] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#A89F71] hover:scale-105 transition-all duration-300 w-[250px] h-[50px] flex items-center justify-center"
        >
          Go to Log In Page
        </button>
      </div>
    </main>
  );
}
