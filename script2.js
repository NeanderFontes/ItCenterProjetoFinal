// Acesso aos elementos HTML
const calendario = document.querySelector(".calendario");
const dataAtualSistema = document.querySelector(".data");
const diasDoMes = document.querySelector(".dias");
const diaAnterior = document.querySelector(".prev");
const diaPosterior = document.querySelector(".next");

// Variáveis de controle do calendário
let diaAtual = new Date();
let mesAtual = diaAtual.getMonth();
let anoAtual = diaAtual.getFullYear();

// Lista com os nomes dos meses
const nomeMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Função para criar o calendário
function criarCalendario() {
    const primeiroDia = new Date(anoAtual, mesAtual, 1);
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0);
    const primeiroDiaSemana = primeiroDia.getDay();
    const ultimoDiaMes = ultimoDia.getDate();

    // Limpa o conteúdo do calendário
    diasDoMes.innerHTML = "";

    // Define o título do calendário
    dataAtualSistema.innerHTML = nomeMeses[mesAtual] + " " + anoAtual;

    // Adiciona dias do mês anterior
    for (let i = primeiroDiaSemana; i > 0; i--) {
        const diaAnterior = new Date(anoAtual, mesAtual, -i + 1).getDate();
        diasDoMes.innerHTML += `<div class="dia prev-date">${diaAnterior}</div>`;
    }

    // Adiciona os dias do mês atual
    for (let i = 1; i <= ultimoDiaMes; i++) {
        const classeDia = i === diaAtual.getDate() && mesAtual === diaAtual.getMonth() ? "hoje" : "";
        diasDoMes.innerHTML += `<div class="dia ${classeDia}">${i}</div>`;
    }
}

// Função para ir para o mês anterior
function mesAnterior() {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    criarCalendario();
}

// Função para ir para o próximo mês
function proximoMes() {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    criarCalendario();
}

// Associar eventos aos botões de navegação
diaAnterior.addEventListener("click", mesAnterior);
diaPosterior.addEventListener("click", proximoMes);

// Inicializa o calendário
criarCalendario();
