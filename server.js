import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  const cpf = req.query.cpf;
  if (!cpf) return res.json({ error: "CPF é obrigatório." });

  try {
    const url = `https://apis-brasil.shop/apis/apiserasacpf2025.php?cpf=${cpf}`;
    const response = await fetch(url);
    const data = await response.text();

    // tenta converter para JSON
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch {
      res.send(data); // caso o retorno não seja JSON puro
    }
  } catch (err) {
    console.error("Erro ao consultar API:", err);
    res.status(500).json({ error: "Erro ao consultar API externa." });
  }
});

app.listen(PORT, () => console.log(`✅ Servidor proxy online na porta ${PORT}`));


// === Inicialização ===
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
