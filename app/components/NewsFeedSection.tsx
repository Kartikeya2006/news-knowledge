import {motion} from 'framer-motion';
import { ChevronRight, Newspaper } from 'lucide-react';

export default function NewsFeedSection() {
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
    return (
        <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 border border-[#D3C6A6]"
            variants={itemVariants}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#4A4A2F]">Latest News</h2>
                <button className="flex items-center text-[#8B5CF6] hover:text-[#7B4FE0] transition-colors">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <motion.div
                        key={item}
                        className="p-4 border border-[#D3C6A6] rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        variants={cardHoverVariants}
                        whileHover="hover"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-[#F5F5DC] rounded-lg flex items-center justify-center">
                                <Newspaper className="w-8 h-8 text-[#5C4033]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#4A4A2F] mb-1">
                                    Featured Article Title {item}
                                </h3>
                                <p className="text-sm text-[#706F6F] line-clamp-2">
                                    Brief preview of the article content. Click to read more about this interesting topic.
                                </p>
                                <div className="flex items-center mt-2 text-xs text-[#706F6F]">
                                    <span>5 min read</span>
                                    <span className="mx-2">•</span>
                                    <span>Technology</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}