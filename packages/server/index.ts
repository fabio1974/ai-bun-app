import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatController } from './controllers/chatController';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.post('/api/chat', chatController);

app.listen(port, () => {
    console.log(`Server is  running on http://localhost:${port}`);
});
