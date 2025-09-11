import OpenAI from 'openai';
import { ConversationRepository } from '../repositories/conversationRepository';

const openAIClient = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});
const conversationRepo = new ConversationRepository();

export async function handleChat(prompt: string, conversationId: string) {
    const response = await openAIClient.responses.create({
        model: 'gpt-5-nano',
        input: prompt,
        max_output_tokens: 256,
        reasoning: { effort: 'minimal' },
        text: { verbosity: 'low' },
        previous_response_id: conversationRepo.get(conversationId),
    });

    conversationRepo.set(conversationId, response.id);
    return response.output_text || 'No response from OpenAI';
}
