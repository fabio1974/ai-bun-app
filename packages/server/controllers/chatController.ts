import type { Request, Response } from 'express';
import { chatSchema } from '../schemas/chatSchema';
import { handleChat } from '../services/chatService';

export const chatController = async (req: Request, res: Response) => {
    console.log('Received chat request:', req.body);

    const parseResult = chatSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.errors.map((e) => e.message).join(', '),
        });
    }

    const { prompt, conversationId } = parseResult.data;

    try {
        const message = await handleChat(prompt, conversationId);
        res.json({ message });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
};
