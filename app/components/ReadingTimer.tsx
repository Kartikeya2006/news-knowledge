import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Pause, Play, RotateCcw } from "lucide-react";

const ReadingTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            hrs.toString().padStart(2, '0'),
            mins.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ];
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
    };

    const [hours, minutes, seconds] = formatTime(time);

    return (
        <div className="flex flex-col space-y-4">
            {/* Timer Display */}
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={{ rotate: isRunning ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isRunning ? Infinity : 0, ease: "linear" }}
                    className="absolute -left-6 text-[#5C4033]"
                >
                    <Clock className="w-5 h-5" />
                </motion.div>
                <div className="grid grid-cols-3 gap-1 text-2xl font-bold text-[#4A4A2F]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`h-${hours}`}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="flex items-baseline"
                        >
                            <span>{hours}</span>
                            <span className="text-xs ml-1 text-[#706F6F]">h</span>
                        </motion.div>
                        <motion.div
                            key={`m-${minutes}`}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="flex items-baseline"
                        >
                            <span>{minutes}</span>
                            <span className="text-xs ml-1 text-[#706F6F]">m</span>
                        </motion.div>
                        <motion.div
                            key={`s-${seconds}`}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="flex items-baseline"
                        >
                            <span>{seconds}</span>
                            <span className="text-xs ml-1 text-[#706F6F]">s</span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-2">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsRunning(!isRunning)}
                    className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                        isRunning 
                            ? 'bg-[#D3C6A6] hover:bg-[#C4B596] text-[#4A4A2F]' 
                            : 'bg-[#F5F5DC] hover:bg-[#E6E6CC] text-[#5C4033]'
                    }`}
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: isRunning ? 0 : 360 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </motion.div>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    disabled={time === 0}
                    className={`p-2 rounded-lg flex items-center justify-center ${
                        time === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#F5F5DC] hover:bg-[#E6E6CC] text-[#5C4033]'
                    }`}
                >
                    <RotateCcw className="w-4 h-4" />
                </motion.button>
            </div>
        </div>
    );
};

export default ReadingTimer;