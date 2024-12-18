// Feedback

const pontos = parseInt(localStorage.getItem("pontos"))

let ponto = document.getElementById("ponto")

ponto.textContent = `${pontos} pontos!`;

if (pontos === 70){
    let feedback = document.getElementById("perfeito");

    feedback.classList.remove("hidden")
} else if (pontos >= 50 && pontos < 70){
    let feedback = document.getElementById("bom");

    feedback.classList.remove("hidden")
} else if (pontos >= 30 && pontos < 50){
    let feedback = document.getElementById("médio");

    feedback.classList.remove("hidden")
}else{
    let feedback = document.getElementById("ruim");

    feedback.classList.remove("hidden")
}

// Model

// Seleciona todos os botões que abrem sobreposições
const openButtons = document.querySelectorAll("[data-overlay]");
// Seleciona todos os botões que fecham sobreposições
const closeButtons = document.querySelectorAll(".closeOverlay");

console.log(openButtons)
console.log(closeButtons)

// Abre a sobreposição correspondente
openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const overlayId = button.getAttribute("data-overlay");
        const overlay = document.getElementById(overlayId);

        console.log(overlay)

        if (overlay) {
          console.log("Apareceu")
            overlay.classList.remove("hidden");
        }
    });
});

// Fecha a sobreposição correspondente
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        const overlay = button.closest(".overlay");
        if (overlay) {
          console.log("Desapareceu")
            overlay.classList.add("hidden");
        }
    });
});

function fazPost(url, body){
    console.log(body);

    let request = new XMLHttpRequest();
    request.open("PUT", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));

    request.onload = function() {
        console.log(this.responseText);
    }

    return request.responseText;
}

function updateUser(){
  event.preventDefault();
  let url = `http://localhost:8080/valores/update-user?nome=${localStorage.getItem("nome")}`;
  console.log(url)

  console.log(localStorage.getItem("nome"));
  console.log(parseInt(localStorage.getItem("pontos")));
  console.log(localStorage.getItem("timer"))

  let tempoObj = JSON.parse(localStorage.getItem("timer"));
  
  console.log(tempoObj)

  let horas = 0;
  let minutos = tempoObj.minutes;
  let segundos = tempoObj.seconds;

  let tempoFormatado = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

  console.log(tempoFormatado);

  let body = {
        "nome": localStorage.getItem("nome"),
        "pontos": parseInt(localStorage.getItem("pontos")),
        "tempo": tempoFormatado
  };

  fazPost(url, body);
}

//Ranking

const apiUrl = "http://localhost:8080/valores/ranking";

async function fetchRankingData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Erro ao buscar os dados da API");
        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        return [];
    }
}

async function renderRanking() {

    const rankingData = await fetchRankingData();

    const tableBody = document.querySelector("#ranking-table tbody");

    tableBody.innerHTML = "";

    rankingData.forEach((user, index) => {
        const row = document.createElement("tr");

        const positionCell = document.createElement("td");
        positionCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = user.nome;

        const pointsCell = document.createElement("td");
        pointsCell.textContent = user.pontos;

        const timeCell = document.createElement("td");
        timeCell.textContent = user.tempo;

        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(pointsCell);
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", renderRanking);