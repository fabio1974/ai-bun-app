import { z } from 'zod';

export const chatSchema = z.object({
    prompt: z
        .string()
        .min(1, 'Prompt is required')
        .max(100, 'Prompt is too long'),
    conversationId: z.string().uuid('Invalid conversation ID'),
});
