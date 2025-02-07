import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const { url } = await req.json();

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const prompt = `Provide a concise yet detailed summary of the article described by the URL, highlighting the three most important points with key details.Each point should just be a sentence of its explanations with no titles or numbering given.Ensure each point is comprehensive but brief, and separate each point with a '/': ${url}`;
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const summary = response.choices[0]?.message?.content || "No summary available.";
        
        return NextResponse.json({ summary });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}