// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS from any origin (you can restrict to your domain if preferir)
app.use(cors({
  origin: "*",
  methods: ["GET"],
  allowedHeaders: ["Content-Type"]
}));

app.get("/", async (req, res) => {
  const cpf = req.query.cpf;
  if (!cpf) {
    return res.status(400).json({ error: "CPF é obrigatório." });
  }

  const targetUrl = `https://apis-brasil.shop/apis/apiserasacpf2025.php?cpf=${encodeURIComponent(cpf)}`;

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: { "User-Agent": "Dark-Aurora-Proxy/1.0" },
      // no redirect handling needed
    });

    const text = await response.text();

    // tenta parse para JSON, se falhar retornamos a string no campo "raw" ou como texto
    try {
      const json = JSON.parse(text);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      return res.status(response.ok ? 200 : 502).json(json);
    } catch (err) {
      // resposta não-JSON (retornamos como texto dentro de um JSON para o frontend tratar)
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      return res.status(response.ok ? 200 : 502).json({ response: text });
    }
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Erro ao consultar API externa" });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy online on port ${PORT}`));
