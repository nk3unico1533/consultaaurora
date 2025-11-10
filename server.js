// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const { cpf } = req.query;

  if (!cpf) {
    return res.status(400).json({ error: "CPF é obrigatório." });
  }

  try {
    // Simulação de consulta real
    const mockData = {
      status: "sucesso",
      cpf,
      nome: "Fulano da Silva",
      nascimento: "12/03/1988",
      situacao: "Regular",
      email: "fulano@example.com",
      score: Math.floor(Math.random() * 1000),
    };

    await new Promise((r) => setTimeout(r, 1000)); // simula delay
    res.json(mockData);
  } catch (err) {
    res.status(500).json({ error: "Erro ao consultar CPF." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor online na porta ${PORT}`));
