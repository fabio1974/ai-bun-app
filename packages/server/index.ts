import express from 'express';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`, req.headers);
    next();
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use('/api', chatRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});
