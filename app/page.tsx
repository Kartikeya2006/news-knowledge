"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8F8DE] to-[#F5F5DC] flex justify-center items-center p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="rounded-2xl w-full max-w-xl bg-white p-12 shadow-lg border border-[#D3C6A6]"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 mb-8 rounded-full bg-gradient-to-r from-[#C3B091] to-[#A89F71] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
              />
            </svg>
          </div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-2 text-[#4A4A2F]"
          >
            Welcome to{" "}
            <span className="block text-5xl mt-2 bg-gradient-to-r from-[#5C4033] to-[#8B7355] bg-clip-text text-transparent">
              NEWS KNOWLEDGE
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[#706F6F] text-lg mt-6 text-center max-w-md leading-relaxed"
          >
            Your premium destination for curated headlines, expert insights, and comprehensive news coverage from around the globe.
          </motion.p>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/login")}
            className="mt-10 px-8 py-4 bg-gradient-to-r from-[#C3B091] to-[#A89F71] text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm"
          >
            Continue
          </motion.button>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-[#706F6F] text-sm"
          >
            Get started with your news journey today
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  );
}