// Acesso aos elementos HTML
const calendario = document.querySelector(".calendario");
const dataAtualSistema = document.querySelector(".data");
const diasDoMes = document.querySelector(".dias");
const diaAnterior = document.querySelector(".prev");
const diaPosterior = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");

// Variáveis de controle do calendário
let diaAtual = new Date();
let mesAtual = diaAtual.getMonth();
let anoAtual = diaAtual.getFullYear();
let activeDay;

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

// Inicializa o calendário
criarCalendario();

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


// Função para adicionar click para ir a "Data Atual":
todayBtn.addEventListener("click", () => {
    diaAtual = new Date();
    mesAtual = diaAtual.getMonth();
    anoAtual = diaAtual.getFullYear();
    criarCalendario();
})

// Função para adicionar Busca no calendário por mês e ano:
dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

    // Condição para adicionar "/" após 2 números
    if (dateInput.value.length === 2 && e.inputType !== "deleteContentBackward") {
        dateInput.value += "/";
    }

    // Condição para aceitar no máximo 7 caracteres (MM/YYYY)
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }

    // Condição para lidar com a tecla "Backspace"
    if (e.inputType === "deleteContentBackward" && dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
    }
});

// Função para ir a data específica do Botão "MM/YYYY"
gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
    const buscarData = dateInput.value.split("/");
    if (buscarData.length === 2) {
        if (buscarData[0] > 0 && buscarData[0] < 13 && buscarData[1].length === 4) {
            mesAtual = buscarData[0] - 1;
            anoAtual = buscarData[1];
            criarCalendario();
            return;
        }
    }
    alert("Data Inválida!");
}

// Adicionando JavaScript para Criar Eventos:

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEvenFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

// Evento de interatividade com "add-event-btn"
addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});

// Evento de interatividade com "add-event-btn"
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

// Evento de interatividade com "add-event-btn"
document.addEventListener("click", (e) => {
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
})

// Adicionando entrada de valor String em Nomem do Evento
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// Adicionando valor para entrada de Inicio Evento e validando:
addEvenFrom.addEventListener("input", (e) => {
    addEvenFrom.value = addEvenFrom.value.replace(/[^0-9:]/g, "");
    if (addEvenFrom.value.length === 2) {
        addEvenFrom.value += ":";
    }
    if (addEvenFrom.value.length > 5) {
        addEvenFrom.value = addEvenFrom.value.slice(0, 5);
    }
})

// Adicionando valor para entrada de Final Evento e validando:
addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
})
