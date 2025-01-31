export interface NewsItem {
    title: string;
    description: string;
    url: string;
    source: string;
    pubDate?: string;
}
  
export interface RssFeed {
    items: NewsItem[];
    source: string;
}