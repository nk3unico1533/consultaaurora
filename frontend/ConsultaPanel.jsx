import React, { useState } from "react";
import Card from "./Card";
import KV from "./KV";
import EmptyState from "./EmptyState";

export default function ConsultaPanel() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("basica");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const endpoints = {
    basica: (q) => `https://apis-brasil.shop/apis/apicpfdatasus.php?cpf=${q}`,
    cadsus: (q) => `https://apis-brasil.shop/apis/apicpfcadsus.php?cpf=${q}`,
    serasa: (q) => `https://apis-brasil.shop/apis/apiserasacpf2025.php?cpf=${q}`,
    nome: (q) => `https://apis-brasil.shop/apis/apicpfdatasus.php?cpf=${q}`
  };

  async function handleSearch(type) {
    setActive(type);
    setError(null);
    setResult(null);

    if (!query) {
      setError("Digite um CPF válido (somente números).");
      return;
    }

    const url = endpoints[type](query);
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(`Falha ao consultar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-6xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Painel de Consulta CPF</h1>
          <p className="text-gray-600 mt-1">Quatro tipos de busca — organizado e profissional.</p>
        </header>

        <section className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">CPF</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value.replace(/\D/g, ''))}
                placeholder="Digite o CPF (somente números)"
                className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 p-3"
              />
            </div>
            <div className="flex gap-2">
              {['basica', 'cadsus', 'serasa', 'nome'].map((t) => (
                <button
                  key={t}
                  onClick={() => handleSearch(t)}
                  className={\`px-4 py-2 rounded-lg font-semibold capitalize \${active === t ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700'}\`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {loading && <div className="p-4 bg-indigo-50 text-indigo-700 rounded-md">Carregando...</div>}
            {error && <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}
            {!loading && !error && result && (
              <Card title="Resultado">
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
