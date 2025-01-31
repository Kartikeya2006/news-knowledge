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
                        <div key={index} className="mb-4">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                                {article.title}
                            </a>
                            {article.description !== 'No Description' && (
                                <p className="text-sm text-gray-600 mt-1">
                                    {article.description.split(" ").slice(0, 50).join(" ")}
                                    {article.description.split(" ").length > 50 && "..."}
                                </p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No news available</p>
                )}
            </div>
        </div>
    );
}
