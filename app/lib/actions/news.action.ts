import { NewsItem, RssFeed } from "@/app/types/News";
import { fetchRssFeed } from "@/app/utils/rssParser";

const RSS_FEEDS = [
    {TOI: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms'},
    {NEWS18: 'https://www.news18.com/rss/india.xml'},
    {ET: 'https://economictimes.indiatimes.com/rssfeedstopstories.cms'},
    {HT: 'https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml'},
];
export async function getAllNews(): Promise<NewsItem[]> {
  try {
    const feedPromises = (RSS_FEEDS).map((feed_obj) =>  {
      const [source, url] = Object.entries(feed_obj)[0];
      return fetchRssFeed(url, source);
    });

    const feeds = await Promise.allSettled(feedPromises);
    
    const allNews: NewsItem[] = feeds
      .filter((result): result is PromiseFulfilledResult<RssFeed> => 
        result.status === 'fulfilled'
      )
      .flatMap(result => result.value.items);

    // Sort by publication date if available
    return allNews.sort((a, b) => {
      if (!a.pubDate || !b.pubDate) return 0;
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}