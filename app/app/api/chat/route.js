import { NextResponse } from "next/server"
import OpenAI from "openai"

const systemPrompt = `
    The AI assistant is designed to help with questions on general topics and provide information about the landing page for students. It can assist with a wide range of subjects, including but not limited to technology, science, history, and more. Feel free to ask any questions you may have or request information about the landing page.

    Example questions you can ask:
    - What is the purpose of the landing page for students?
    - How can I navigate through the landing page?
    - Can you provide information about the features available on the landing page?
    - What resources are available for students on the landing page?
`;

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', 
            content: systemPrompt 
        },
        ...data,
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })


    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (error){
                console.error(error)
            }finally{
                controller.close()
            }
        }
    })


    return new NextResponse(stream)   
}

// Rest of your code...