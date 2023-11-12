const animais = ["gato", "rato", "macaco", "leopardo", "golfinho"]
const palavraOculta =
  animais[Math.floor(Math.random() * animais.length)];
const letrasErradas = [];
const letrasCorretas = [];

document.addEventListener("keydown", (evento) => {
  const codigo = evento.keyCode; 
  if (isLetra(codigo)) {
    const letra = evento.key;
    if (letrasErradas.includes(letra)) {
      mostrarAviso();
    } else {
      if (palavraOculta.includes(letra)) {
        letrasCorretas.push(letra);
      } else {
        letrasErradas.push(letra);
      }
    }
    atualizarForca();
  }
});

function atualizarForca() {
  mostrarErradas();
  mostrarCertas();
  desenharBoneco();
  checarPalavras();
}

function mostrarErradas() {
  const div = document.querySelector(".letras-erradas-container");
  div.innerHTML = "<h3>Letras erradas</h3>";
  letrasErradas.forEach((letra) => {
    div.innerHTML += `<span>${letra}</span>`;
  });
}

function mostrarCertas() {
  const container = document.querySelector(".palavra-secreta-container");
  container.innerHTML = "";
  palavraOculta.split("").forEach((letra) => {
    if (letrasCorretas.includes(letra)) {
      container.innerHTML += `<span>${letra}</span>`;
    } else {
      container.innerHTML += `<span>_</span>`;
    }
  });
}

function checarPalavras() {
  let mensagem = "";
  const container = document.querySelector(".palavra-secreta-container");
  const partesCorpo = document.querySelectorAll(".forca-parte");

  if (letrasErradas.length === partesCorpo.length) {
    mensagem = "Fim de jogo! Você perdeu!";
  }

  if (palavraOculta === container.innerText) {
    mensagem = "Parabéns! Você ganhou!";
  }

  if (mensagem) {
    document.querySelector("#mensagem").innerHTML = mensagem;
    document.querySelector(".popup-container").style.display = "flex";
  }
}

function desenharBoneco() {
  const partesCorpo = document.querySelectorAll(".forca-parte");
  for (let i = 0; i < letrasErradas.length; i++) {
    partesCorpo[i].style.display = "block";
  }
}

function mostrarAviso() {
  const aviso = document.querySelector(".aviso-palavra-repetida");
  aviso.classList.add("show");
  setTimeout(() => {
    aviso.classList.remove("show");
  }, 1000);
}

function isLetra(codigo) {
  return codigo >= 65 && codigo <= 90;
}

function reiniciarForca() {
  window.location.reload();
}
