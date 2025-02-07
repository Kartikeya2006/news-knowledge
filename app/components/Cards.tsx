import { NewsItem } from "../types/News";

interface CardProps {
    paperName: string;
    articles?: NewsItem[];
}

export default function Cards({ paperName, articles = [] }: CardProps) {
    return (
        <div className="relative w-full bg-white shadow-md border border-gray-200 rounded-xl p-5 transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="flex justify-center mb-4">
                <h5 className="text-gray-800 text-2xl font-semibold hover:underline hover:cursor-pointer">
                    {paperName}
                </h5>
            </div>
            <div className="p-3 border-t border-gray-100 max-h-60 overflow-y-auto 
                [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-gray-300 
                [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-gray-100">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={index} className="mb-4 gap-2">
                            <p className="font-semibold text-[#6A7F8C] text-lg">
                                {article.title}
                            </p>
                            <div>
                                <button 
                                    className="bg-slate-300 p-1 rounded-md font-semibold shadow-md mx-2 hover:bg-slate-200"
                                    onClick={() => window.open(`/summary?url=${encodeURIComponent(article.description)}`,'_blank')}
                                >
                                    <span className="text-sm hover:text-blue-700">Generate the summary</span>
                                </button>
                                <button className="bg-slate-300 p-1 rounded-md font-semibold shadow-md hover:bg-slate-200">
                                    <a href={article.url} target="_blank">
                                    <span className="text-sm hover:text-blue-700">Link to article</span>
                                    </a>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No news available</p>
                )}
            </div>
        </div>
    );
}
