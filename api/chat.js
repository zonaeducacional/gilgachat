
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  try {
    const prompt = `Você é Gilgamesh, rei da antiga Mesopotâmia. Responda à pergunta de forma educativa e acessível para alunos do 6º ano, com linguagem clara e tom amigável.

Pergunta: ${question}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar resposta." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
