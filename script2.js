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

// Eventos Default lista:
const eventsArray = [
    {
        day: 7,
        month: 11,
        year: 2023,
        events: [
            {
                title: "Event 1 lore ipsun",
                time: "10:00 AM",
            },
            {
                title: "Event 2",
                time: "11:00 AM"
            },
        ],
    },
    {
        day: 10,
        month: 11,
        year: 2023,
        events: [
            {
                title: "Event 1 lore ipsun",
                time: "10:00 AM",
            },
        ],
    },
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
        // Verifique se há eventos para a data atual
        const eventsForDate = eventsArray.find((eventObj) => {
            return eventObj.day === i && eventObj.month === mesAtual + 1 && eventObj.year === anoAtual;
        });

        let classeDia = "";

        // Se a data atual corresponder ao dia do evento
        if (i === diaAtual.getDate() && mesAtual === diaAtual.getMonth() && anoAtual === diaAtual.getFullYear()) {
            classeDia = "hoje";
        }

        // Construa a string HTML com a classe apropriada com base nos eventos
        if (eventsForDate) {
            const eventTitles = "";
            diasDoMes.innerHTML += `<div class="dia event ${classeDia}">${i}<br>${eventTitles}</div>`;
        } else {
            diasDoMes.innerHTML += `<div class="dia ${classeDia}">${i}</div>`;
        }
    }

    addListener();
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

// Função para adicionar ouvintes de clique aos dias do calendário
function addListener() {
    // Seleciona todos os elementos com a classe "dia"
    const days = document.querySelectorAll(".dia");

    // Itera sobre cada dia
    days.forEach((dia) => {
        dia.addEventListener("click", (e) => {
            // Atualiza o dia ativo com o número do dia clicado
            activeDay = Number(e.target.innerHTML);

            // 
            getActiveDay(e.target.innerHTML);

            // Remove a classe "active" de todos os dias
            days.forEach((dia) => {
                dia.classList.remove("active");
            });

            // Verifica se o dia clicado é do mês anterior
            if (e.target.classList.contains("prev-date")) {
                // Chama a função para navegar para o mês anterior
                mesAnterior();

                // Aguarda 100ms antes de atualizar os dias ativos
                setTimeout(() => {
                    const days = document.querySelectorAll(".dia");

                    // Itera sobre os dias para encontrar o dia clicado no novo mês
                    days.forEach((dia) => {
                        if (!dia.classList.contains("prev-date") && dia.innerHTML === e.target.innerHTML) {
                            dia.classList.add("active"); // Adiciona a classe "active" ao dia clicado
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                // Chama a função para navegar para o próximo mês
                proximoMes();

                setTimeout(() => {
                    const days = document.querySelectorAll(".dia");

                    // Itera sobre os dias para encontrar o dia clicado no novo mês
                    days.forEach((dia) => {
                        if (!dia.classList.contains("next-date") && dia.innerHTML === e.target.innerHTML) {
                            dia.classList.add("active"); // Adiciona a classe "active" ao dia clicado
                        }
                    });
                }, 100);
            } else {
                // Se o dia clicado não é do mês anterior ou do próximo mês, apenas adiciona a classe "active"
                e.target.classList.add("active");
            }
        });
    });
}

// Função para ativar os eventos do dia ativo:
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");

function getActiveDay(diaAtual) {
    // Cria uma data com base no ano, mês e dia atual
    const day = new Date(anoAtual, mesAtual, diaAtual);

    // Extrai o nome do dia da semana (por exemplo, "Seg" para segunda-feira)
    const dayName = day.toString().split(" ")[0];

    // Atualiza o conteúdo do elemento com a classe "event-day" com o nome do dia da semana
    eventDay.innerHTML = dayName;

    // Atualiza o conteúdo do elemento com a classe "event-date" com a data completa (dia, mês e ano)
    eventDate.innerHTML = diaAtual + " " + nomeMeses[mesAtual] + " " + anoAtual;
}