'use client';
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { NewsItem } from "../types/News";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

export default function News() {
    const [news18, setNews18] = useState<NewsItem[]>([]);
    const [toi, setToi] = useState<NewsItem[]>([]);
    const [et, setEt] = useState<NewsItem[]>([]);
    const [ht, setHt] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [notesOpen, setNotesOpen] = useState(false);
    const [note, setNote] = useState('');
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
        
        doc.setFillColor(245, 245, 220);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
    
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(74, 74, 47);
        doc.text('News Knowledge', margin, margin + 20);
    
        doc.setFont('times', 'normal');
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
    
        doc.text(note, margin, margin + 40, { maxWidth: pageWidth });
    
        doc.save('note.pdf');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#8B5CF6]"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center text-red-500">
            Error: {error}
        </div>
    );

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#E5E5D1] p-6 md:p-10">
            <div className="absolute top-0 left-0 p-4 cursor-pointer" onClick={() => router.push('/dashboard')}>
                <h2 className={`text-2xl lg:text-4xl md:text-3xl font-bold text-[#4A4A2F] hover:underline transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>News Knowledge</h2>
            </div>
            <div className="max-w-7xl mx-auto relative">
                <div className="mt-15">
                    <h1 className={`text-[#4A4A2F] font-bold text-2xl md:text-3xl my-8 text-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Explore Today’s News from Trusted Sources
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <Cards paperName="Times of India" articles={toi}/>
                    </div>
                    <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <Cards paperName="Economic Times" articles={et}/>
                    </div>
                    <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <Cards paperName="News18" articles={news18}/>
                    </div>
                    <div className={`transition-all duration-700 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <Cards paperName="Hindustan Times" articles={ht}/>
                    </div>
                </div>
                <div>
                <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full" onClick={() => setNotesOpen(true)}>
                    📝
                </button>
                </div>
                {notesOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gradient-to-b from-[#F5F5DC] to-[#E5E5D1] p-8 rounded-lg shadow-lg w-2/3 h-3/4 max-w-4xl flex flex-col justify-between">
                            <h2 className="text-2xl font-bold text-[#4A4A2F] mb-6">Write Your Note</h2>
                            <textarea
                                className="w-full h-full p-6 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Write your note here..."
                            />
                            <div className="flex justify-between mt-6">
                                <button
                                    className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600"
                                    onClick={handleDownload}
                                >
                                    Download PDF
                                </button>
                                <button
                                    className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600"
                                    onClick={() => setNotesOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
