let selectedItems = []; //lista de items selecionados

function changeBorder(element) {

  if (selectedItems.includes(element)) { //se o item clicado está na lista
    element.style.border = "2px solid black";
    selectedItems = selectedItems.filter(item => item !== element); //remove o item da lista

  } else {
    
    if (selectedItems.length >= 3) { //se a lista de itens selecionados for maior que 3
      alert("Você só pode selecionar até 3 itens."); //manda um aviso
      return;
    }

    element.style.border = "2px solid yellow";
    selectedItems.push(element); // Adiciona à lista de itens selecionados

  }
}

// Pontos

let pontos = parseInt(localStorage.getItem("pontos"));

function acertou(){
  event.preventDefault();

  var corretas = 0;

  for (var i = 0; i < 3; i++) {

    let elemento = selectedItems[i];

    if (elemento.classList.contains("correta")){
      corretas++;
    }
  }

  const elemento = document.getElementById("overlay");
  const botao = document.getElementById("botao");

  console.log(elemento);
  console.log(botao);

  let proximo = botao.className;
  
  console.log(proximo);
  
  if (corretas === 3){
    pontos += 10;

    const sucesso = document.getElementById("sucesso");

    console.log(sucesso);

    elemento.classList.remove("hidden");
    sucesso.classList.remove("hidden");

    setTimeout(() => {
      elemento.classList.add("hidden");
      sucesso.classList.add("hidden");

      location.href = `${proximo}.html`;
    }, 3750);

  }

  else if (corretas === 2){
    pontos += 7;

    const falha = document.getElementById("falha");

    console.log(falha);

    elemento.classList.remove("hidden");
    falha.classList.remove("hidden");
    
    setTimeout(() => {
      elemento.classList.add("hidden");
      falha.classList.add("hidden");

      location.href = `${proximo}.html`;
    }, 3750);
  }

  else if (corretas === 1) {
    pontos += 3;

    const falha = document.getElementById("falha");

    console.log(falha);


    elemento.classList.remove("hidden");
    falha.classList.remove("hidden");

    setTimeout(() => {
      elemento.classList.add("hidden");
      falha.classList.add("hidden");

      location.href = `${proximo}.html`;
    }, 3750);
  }

  else {

    const falha = document.getElementById("falha");

    console.log(falha);


    elemento.classList.remove("hidden");
    falha.classList.remove("hidden");

    setTimeout(() => {
      elemento.classList.add("hidden");
      falha.classList.add("hidden");

      location.href = `${proximo}.html`;
    }, 3750);
  }

  console.log(`pontos: ${pontos}`);

  localStorage.setItem("pontos", pontos);

}


// Timer

let minutes;
let seconds;

const savedTime = JSON.parse(localStorage.getItem("timer"));

if (savedTime && savedTime.minutes >= 0 && savedTime.seconds >= 0) {
  minutes = savedTime.minutes;
  seconds = savedTime.seconds;
}else{
  minutes = 10;
  seconds = 0;
}


const timerElement = document.querySelector(".temporizador");

timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

const timerInterval = setInterval(() => {
  if (minutes === 0 && seconds === 0) {
    clearInterval(timerInterval);
    localStorage.removeItem("timer");
    alert("Tempo esgotado!");
    window.location.href = "final.html";
    return;
  }

  if (seconds === 0) {
    seconds = 59;
    minutes -= 1;
  } else {
    seconds -= 1;
  }

  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  localStorage.setItem("timer", JSON.stringify({ minutes, seconds }));

}, 1000);
