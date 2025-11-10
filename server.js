// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
app.use(cors({
  origin: ["https://consutasdarkaurora.wuaze.com", "*"], // libera seu domínio
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// === Simulação de consulta ===
// Você pode adaptar isso futuramente para consultar uma API real
app.get("/", (req, res) => {
  const { cpf } = req.query;
  if (!cpf) return res.status(400).json({ error: "CPF é obrigatório." });

  // Resposta simulada:
  res.json({
    cpf,
    status: "Válido",
    score: Math.floor(Math.random() * 1000),
    situacao: "Regular",
    emails: [
      { email: "exemplo1@gmail.com", qualidade: "BOM", publico: true, data: "07/06/2016" },
      { email: "exemplo2@yahoo.com.br", qualidade: "RUIM", publico: false, data: "12/09/2020" },
    ]
  });
});

// === Inicialização ===
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
