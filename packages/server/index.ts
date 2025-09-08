import express from 'express';
import type { Request, Response } from 'express';
import OpenAI from 'openai';

// set dotenv package
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// port
const port = process.env.PORT || 3000;

const openAIClient = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: `Hello World, My Friend` });
});

app.listen(port, () => {
    console.log(`Server is  running on http://localhost:${port}`);
});

app.post('/api/chat', async (req: Request, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        const response = await openAIClient.responses.create({
            model: 'gpt-4o-mini',
            input: prompt,
            max_output_tokens: 100,
            temperature: 0.2,
        });

        res.json({ message: response.output_text });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
});
