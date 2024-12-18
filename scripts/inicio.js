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