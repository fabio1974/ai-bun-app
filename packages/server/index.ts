import express from "express";
import type { Request, Response } from "express";

// set dotenv package
import dotenv from "dotenv";
dotenv.config();

const app  = express();

// port
const port = process.env.PORT || 3000;

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: `Hello World` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
