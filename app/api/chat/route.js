import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = 'Designed to assist with moon related quesitons. Any questions that isnt about moons you must reject right away and mention you can only provide your information about moons'

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages : [{role: 'system', content: systemPrompt}, ...data],
        model: 'gpt-4o',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()

            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (error){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}