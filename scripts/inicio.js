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