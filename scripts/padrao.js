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