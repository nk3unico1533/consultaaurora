const inputCPF = document.getElementById("cpf");
const btnConsultar = document.getElementById("consultar");
const resultado = document.getElementById("resultado");
const toast = document.getElementById("toast");
const clickSound = document.getElementById("click-sound");
const successSound = document.getElementById("success-sound");

// Máscara automática de CPF
inputCPF.addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  e.target.value = v;
});

// Toast RGB
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// Consulta CPF
btnConsultar.addEventListener("click", async () => {
  clickSound.play();

  const cpf = inputCPF.value.replace(/\D/g, "");
  if (cpf.length !== 11) {
    showToast("CPF inválido!");
    return;
  }

  resultado.innerHTML = "<p>🔄 Consultando...</p>";

  try {
    const response = await fetch(`https://dark-aurora-api.onrender.com/?cpf=${cpf}`);
    if (!response.ok) throw new Error("Erro na consulta.");

    const data = await response.json();
    successSound.play();

    resultado.innerHTML = `
      👤 <b>Nome:</b> ${data.nome}
      🧬 <b>CPF:</b> ${data.cpf}
      🎂 <b>Nascimento:</b> ${data.nascimento}
      📊 <b>Score:</b> ${data.score}
      📧 <b>Email:</b> ${data.email}
      ⚙️ <b>Situação:</b> ${data.situacao}
    `;
  } catch (err) {
    resultado.innerHTML = `<p>❌ Erro na consulta.</p>`;
  }
});
