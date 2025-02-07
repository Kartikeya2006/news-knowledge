"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SummaryPage() {
    const searchParams = useSearchParams();
    const [summary, setSummary] = useState<string | null>(null);
    const url = searchParams.get("url");

    useEffect(() => {
        if (!url) return; 

        const fetchSummary = async () => {
            try {
                const response = await fetch("/api/summarize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                });

                const data = await response.json();
                setSummary(data.summary || "Failed to generate summary...");
            } catch (error) {
                setSummary("Summary not available");
                console.error(error);
            }
        };

        fetchSummary();
    }, [url]);

    const parts: string[] = (summary ?? "").split('/');

    return (
        <main className="bg-[#F5F5DC] min-h-screen flex flex-col items-center justify-center p-6">
            {/* Page Title */}
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl md:text-4xl font-bold text-[#4A4A2F] mb-6 text-center"
            >
                Article Summary
            </motion.h1>

            {/* Summary Box */}
            <motion.div
                className="relative bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg w-full max-w-lg border border-gray-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Loader when summary is being generated */}
                {summary === null ? (
                    <div className="flex items-center justify-center text-gray-700 text-lg font-semibold">
                        <span className="animate-pulse text-[#4A4A2F]">Generating Summary...</span>
                        <div className="ml-2 w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    parts.map((part, index) => (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            className="text-lg text-gray-800 font-medium mb-3"
                        >
                            {index + 1}. {part}
                        </motion.p>
                    ))
                )}
            </motion.div>
        </main>
    );
}