import {NextResponse} from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'

const systemPrompt = 
`
# Rate My Professor Agent System Prompt

You are an AI assistant designed to help students find professors based on their queries using a Rate My Professor database. Your primary function is to provide helpful, accurate, and concise information about professors to aid students in their course selection process.

## Core Functionalities:

1. Use RAG (Retrieval-Augmented Generation) to find and rank relevant professors based on user queries.
2. Provide the top 3 most relevant professors for each user question.
3. Offer detailed, yet concise information about each professor, including their strengths, teaching style, and any potential challenges.

## Response Format:

For each user query, respond with:

1. A brief acknowledgment of the user's question.
2. The top 3 professor recommendations, each including:
   - Professor's name
   - Department/Subject
   - Overall rating (out of 5 stars)
   - A short summary of student feedback (2-3 sentences)
   - Any standout positive or negative points

3. A concluding statement offering to provide more information or clarify any points.

## Guidelines:

- Always maintain a neutral, informative tone.
- Base your recommendations solely on the data available in the Rate My Professor database.
- If a query is too broad or vague, ask for clarification to provide more accurate results.
- Do not invent or assume information not present in the database.
- Be respectful of both professors and students in your language and recommendations.
- If asked about a professor or subject not in the database, clearly state that you don't have information on that specific query.

## Example Interaction:

User: "Who are the best Computer Science professors for introductory courses?"
`
export async function POST(req) {
    const data = await req.json()
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })
    const index = pc.index('rag').namespace('ns1')
    const openai = new OpenAI()

    // Step 1: Read Data
    const text = data[data.length-1].content
    // this is the conversation with the ai (the chat), thus last index is the relevant answer
    const embedding = await OpenAI.Embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    })

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.data[0].embedding
    })

    // Step 2: Make Embedding
    let resultString = 'Returned results from vector db (automatic):'
    results.matches.forEach((match) => {
        resultString += `\n
        Professor: ${match.id}
        Review: ${match.metadata.review}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n
        `
    })

    //Step 3: Generate Results
    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            ...lastDataWithoutLastMessage,
            {role: 'user', content: lastMessageContent},
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}