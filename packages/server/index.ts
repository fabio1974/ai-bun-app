import express from "express";
import type { Request, Response } from "express";

// set dotenv package
import dotenv from "dotenv";
dotenv.config();

const app  = express();

// port
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`OPEN_AI_KEY: ${process.env.OPEN_AI_KEY}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
