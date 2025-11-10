import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Permite chamadas de qualquer origem (para o InfinityFree)
app.use(cors({ origin: "*" }));

// Endpoint principal — repassa a consulta
app.get("/", async (req, res) => {
  const { cpf } = req.query;

  if (!cpf) {
    return res.status(400).json({ error: "CPF é obrigatório." });
  }

  try {
    // 🔗 API verdadeira
    const apiUrl = `https://apis-brasil.shop/apis/apiserasacpf2025.php?cpf=${cpf}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Retorna diretamente os dados
    res.json(data);
  } catch (error) {
    console.error("Erro ao consultar API:", error);
    res.status(500).json({ error: "Erro ao buscar dados na API." });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
