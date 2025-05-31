// Função para calcular a pegada de carbono
function calcularPegada() {
  const transporte = Number(document.getElementById("transporte").value);
  const energia = Number(document.getElementById("energia").value);
  const carne = document.getElementById("carne").value;

  // Fatores de emissão (valores aproximados, para fins educativos)
  const fatorTransporte = 0.21; // kg CO₂ por km (semanal x4 para mês)
  const fatorEnergia = 0.5;     // kg CO₂ por kWh
  const fatorCarne = {
    nunca: 0,
    ocasional: 30,
    frequente: 60,
    diario: 100
  };

  const pegada = (transporte * fatorTransporte * 4) + (energia * fatorEnergia) + fatorCarne[carne];

  let classificacao = "";
  let cor = "";

  if (pegada < 200) {
    classificacao = "Baixa";
    cor = "green";
  } else if (pegada < 400) {
    classificacao = "Média";
    cor = "orange";
  } else {
    classificacao = "Alta";
    cor = "red";
  }

  const resultado = document.querySelector(".calculadora__resultado");
  resultado.innerHTML = `
    <p>Sua pegada estimada de carbono é <strong>${pegada.toFixed(2)} kg de CO₂/mês</strong>.</p>
    <p>Classificação: <strong style="color: ${cor}">${classificacao}</strong></p>
  `;

  if (!transporte || !energia) {
    resultado.innerHTML = `<p style="color: red;">Por favor, preencha todos os campos.</p>`;
    return;
  }
}

function limparCampos() {
  document.getElementById("transporte").value = "";
  document.getElementById("energia").value = "";
  document.getElementById("carne").value = "Nunca";
  document.querySelector(".calculadora__resultado").innerHTML = "";
}

// Eventos
document.getElementById("calcular").addEventListener("click", calcularPegada);
document.getElementById("limpar").addEventListener("click", limparCampos);