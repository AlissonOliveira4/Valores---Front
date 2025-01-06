if (window.location.pathname.endsWith("login.html")) {
    console.log("Reiniciou!");
    const m_padrao = 10;
    const s_padrao = 0;
    localStorage.removeItem("timer");
    localStorage.setItem("timer", JSON.stringify({ m_padrao, s_padrao }));
    localStorage.setItem("pontos", 0);
}

function fazPost(url, body){
    console.log(body);

    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(body));

    request.onload = function() {
        console.log(this.responseText);
    }

    return request.responseText;
}

function saveUser(){
  event.preventDefault();
  let url = "https://valores-back.onrender.com/valores/create-user";
  let nome = document.getElementById("nome").value;

  console.log(nome);

  localStorage.setItem("nome", nome);

  let body = {
        "nome": nome,
        "pontos": 0
  };

  fazPost(url, body);
}