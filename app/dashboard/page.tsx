"use client";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import ReadingTimer from "../components/ReadingTimer";
import NewsFeedSection from "../components/NewsFeedSection";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [showWelcome, setShowWelcome] = useState(true);
    
    useEffect(() => {
        // Auto-hide welcome message after 5 seconds
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // ... (existing variants remain the same)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F8DE]">
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <main className="bg-[#F8F8DE] min-h-screen pt-16 "> 
            <Navbar />
            
            <AnimatePresence>
                {showWelcome && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg border border-[#D3C6A6] z-40"
                    >
                        <p className="text-[#4A4A2F]">👋 Welcome back! Ready to explore today&apos;s news?</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div 
                className="container mx-auto px-4 py-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="bg-white rounded-xl shadow-lg p-8 border border-[#D3C6A6] mb-8"
                    variants={itemVariants}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl text-[#4A4A2F] font-bold">
                                Welcome back, <span className="text-[#5C4033]">{session?.user?.name}</span>
                            </h1>
                            <p className="text-[#706F6F] mt-2">
                                Stay updated with the latest news and insights
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="p-3 bg-[#F5F5DC] rounded-full cursor-pointer"
                            >
                                <Clock className="w-6 h-6 text-[#5C4033]" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    variants={itemVariants}
                >
                    {[
                        { title: "Articles Read", value: "28", change: "+12%" },
                        { title: "Saved Articles", value: "15", change: "+5%" },
                        { 
                            title: "Reading Time", 
                            component: <ReadingTimer />,
                            customStyle: true 
                        }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md border border-[#D3C6A6]"
                            variants={cardHoverVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-[#706F6F] text-sm font-medium mb-2">{stat.title}</h3>
                            {stat.customStyle ? (
                                stat.component
                            ) : (
                                <div className="flex items-end justify-between mt-2">
                                    <span className="text-2xl font-bold text-[#4A4A2F]">{stat.value}</span>
                                    <span className="text-green-500 text-sm">{stat.change}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* News Feed Section */}
                <NewsFeedSection/>
            </motion.div>
        </main>
    );
}