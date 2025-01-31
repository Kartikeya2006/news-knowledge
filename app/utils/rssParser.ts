import { parseStringPromise } from 'xml2js';
import axios from 'axios';
import { NewsItem, RssFeed } from '../types/News';

export async function fetchRssFeed(url: string, source: string): Promise<RssFeed> {
  try {
    const response = await axios.get(url);
    const result = await parseStringPromise(response.data);
    
    const items: NewsItem[] = result.rss.channel[0].item.map((item: { title: string[]; description: string[]; link: string[]; pubDate: string[] }) => ({
      title: item.title ? item.title[0] : 'No Title',
      description: item.description && item.description[0]
        ? item.description[0].replace(/<[^>]*>/g, '') // Remove HTML tags
        : 'No Description', // Fallback for missing descriptions
      url: item.link ? item.link[0] : '#',
      source: source,
      pubDate: item.pubDate ? item.pubDate[0] : undefined
    }));

    return { items, source };
  } catch (error) {
    console.error(`Error fetching RSS feed for ${source}:`, error);
    return { items: [], source };
  }
}