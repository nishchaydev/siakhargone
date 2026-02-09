
'use server';

/**
 * @fileOverview A school assistant AI flow.
 * - chatbotFlow - A function that handles the chatbot conversation.
 */

import { z } from "zod";
import { schoolData } from "@/data/schoolData";
import { type FlowMessage } from '@/lib/definitions';

// The AI call has been temporarily disabled for deployment.
// The function now returns a static message.

export async function chatbotFlow(history: FlowMessage[]): Promise<string> {
    const staticResponse = "This is just a prototype. This function will be available on the full webpage.\nContact - nishchaydev@outlook.com";

    // To re-enable the AI, comment out the line above and uncomment the code below.
    // You will need to ensure your API key is configured in your deployment environment.
    /*
    const { ai } = await import('@/ai/genkit');
    const { googleAI } = await import('@genkit-ai/google-genai');

    const schoolSystemPrompt = {
        role: 'system' as const,
        content: [{
            text: `You are a friendly and helpful school assistant for Sanskar International Academy, Khargone.
            Your goal is to answer questions from parents or prospective students.
            Use the provided information to answer questions about admissions, facilities, contact details, and the school's mission.
            Keep your answers concise, friendly, and to the point.
            
            SCHOOL INFORMATION:
            - School Name: Sanskar International Academy (SIA), Khargone
            - Mission: To provide a stimulating learning environment which maximizes individual potential and ensures that students are well-equipped to meet the challenges of life.
            - Vision: To be a center for excellence in education which, in keeping with the rich heritage of India, will stress the simultaneous development of Spirit, Mind, and Body.
            - Contact: Phone - ${schoolData.contact.phone[0]}, Email - ${schoolData.contact.email}, Address - ${schoolData.contact.address}.
            - Admission Process: The admission process is simple. Interested parents should fill out the contact form on the website to start the application. The admissions team will then guide them through the next steps.
            - Facilities: The school offers state-of-the-art facilities including modern classrooms, science labs, a large library, sports grounds, and a virtual tour is available on the website.
            `
        }]
    };

    const result = await ai.generate({
        model: googleAI.model('gemini-1.5-flash-latest'),
        messages: [
            schoolSystemPrompt, 
            ...history,
        ],
    });

    return result.text;
    */

    // Return the static response.
    return new Promise(resolve => setTimeout(() => resolve(staticResponse), 500));
}
