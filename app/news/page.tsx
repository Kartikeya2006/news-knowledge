'use client';
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { NewsItem } from "../types/News";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, ChevronLeft, Search, Book } from "lucide-react";
import jsPDF from "jspdf";

export default function News() {
    const [news18, setNews18] = useState<NewsItem[]>([]);
    const [toi, setToi] = useState<NewsItem[]>([]);
    const [et, setEt] = useState<NewsItem[]>([]);
    const [ht, setHt] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, setIsVisible] = useState(false);
    const [notesOpen, setNotesOpen] = useState(false);
    const [note, setNote] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSource, setSelectedSource] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch('/api/news');
                if (!response.ok) throw new Error('Failed to fetch news');
                const data = await response.json();

                setNews18(data.filter((item: NewsItem) => item.source === "NEWS18"));
                setToi(data.filter((item: NewsItem) => item.source === "TOI"));
                setEt(data.filter((item: NewsItem) => item.source === "ET"));
                setHt(data.filter((item: NewsItem) => item.source === "HT"));
                
                setTimeout(() => setIsVisible(true), 300);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching news');
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, []);

    const handleDownload = () => {
        const doc = new jsPDF();
        const margin = 10;
        const pageWidth = doc.internal.pageSize.width - margin * 2;
        
        // Add background
        doc.setFillColor(245, 245, 220);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
        
        // Add header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(74, 74, 47);
        doc.text('News Knowledge', margin, margin + 20);
        
        // Add timestamp
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(12);
        doc.text(new Date().toLocaleString(), margin, margin + 30);
        
        // Add note content
        doc.setFont('times', 'normal');
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(note, margin, margin + 50, { maxWidth: pageWidth });
        
        doc.save('news-notes.pdf');
    };

    const filterNewsBySource = (articles: NewsItem[]) => {
        if (!searchTerm && !selectedSource) return articles;
        
        return articles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSource = !selectedSource || article.source === selectedSource;
            return matchesSearch && matchesSource;
        });
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="w-16 h-16 border-4 border-[#8B5CF6] border-t-transparent rounded-full"
            />
        </div>
    );

    if (error) return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center bg-[#F5F5DC]"
        >
            <div className="bg-red-100 p-6 rounded-lg shadow-lg">
                <h3 className="text-red-600 font-semibold text-lg">Error Loading News</h3>
                <p className="text-red-500">{error}</p>
            </div>
        </motion.div>
    );

    return (
        <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#E5E5D1]"
        >
            {/* Header */}
            <div className="sticky top-0 z-50 bg-[#F5F5DC] bg-opacity-90 backdrop-blur-sm shadow-md">
                <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center space-x-4"
                    >
                        <button 
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center text-[#4A4A2F] hover:text-[#8B5CF6] transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                            <span className="font-bold text-xl">Dashboard</span>
                        </button>
                    </motion.div>

                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-center space-x-4"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                            />
                        </div>

                        <select
                            value={selectedSource || ''}
                            onChange={(e) => setSelectedSource(e.target.value || null)}
                            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                        >
                            <option value="">All Sources</option>
                            <option value="TOI">Times of India</option>
                            <option value="ET">Economic Times</option>
                            <option value="NEWS18">News18</option>
                            <option value="HT">Hindustan Times</option>
                        </select>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 md:p-10">
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[#4A4A2F] font-bold text-3xl md:text-4xl mb-8 text-center"
                >
                    Today&apos;s Headlines
                </motion.h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Cards paperName="Times of India" articles={filterNewsBySource(toi)}/>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Cards paperName="Economic Times" articles={filterNewsBySource(et)}/>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Cards paperName="News18" articles={filterNewsBySource(news18)}/>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Cards paperName="Hindustan Times" articles={filterNewsBySource(ht)}/>
                    </motion.div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 right-6 bg-[#8B5CF6] text-white p-4 rounded-full shadow-lg"
                    onClick={() => setNotesOpen(true)}
                >
                    <Book className="w-6 h-6" />
                </motion.button>

                <AnimatePresence>
                    {notesOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-[#F5F5DC] p-6 rounded-lg shadow-xl w-full max-w-4xl"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-[#4A4A2F]">Quick Notes</h2>
                                    <button
                                        onClick={() => setNotesOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <textarea
                                    className="w-full h-96 p-4 mb-4 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent resize-none"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Take notes while reading..."
                                />

                                <div className="flex justify-end space-x-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center space-x-2 bg-[#8B5CF6] text-white px-6 py-3 rounded-lg"
                                        onClick={handleDownload}
                                    >
                                        <Download className="w-5 h-5" />
                                        <span>Export PDF</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.main>
    );
}