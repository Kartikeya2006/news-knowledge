import { getAllNews } from '@/app/lib/actions/news.action';

export async function GET() {
  try {
    const news = await getAllNews();
    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(JSON.stringify({ message: 'Error fetching news' }), { status: 500 });
  }
}