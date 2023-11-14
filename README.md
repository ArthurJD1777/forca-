# Forca Horror 

## Autores 
Fernanda e Arthur 

### Introdução 
Viemos apresentar trabalho orientado e guiado por Nivia.


### Sobre o Jogo 
Nosso jogo não é apenas um jogo da Forca com palavras aleatórias, mas sim jogo da força especialmente para amantes do terror


* Script em Java, CSS e Html 
* Palavras limitadas(ou seja vão se repetir) 

### Códigos 
* Html
Aqui está brevemente o código que usamos em HTML para o jogo 
```ruby 
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="img/jason.png">
    <link href="css/estilo.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
    <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Monaco">
    />
    <title>Jogo da Forca</title>
  </head>
  <body>
    <h1>Jogo da forca</h1>
    <h2>Digite no teclado uma letra e tente adivinhar a palavra! (dica: Personagens de filme de terror)</h2>
    <div class="jogo-container">
      <div class="forca-container">
        <svg height="250" width="200" class="forca">
          <!-- forca -->
          <line x1="60" y1="20" x2="140" y2="20" />
          <line x1="140" y1="20" x2="140" y2="50" />
          <line x1="60" y1="20" x2="60" y2="230" />
          <line x1="20" y1="230" x2="100" y2="230" /> 

          <!-- cabeça -->
          <circle cx="140" cy="70" r="20" class="forca-parte" />
          <!-- corpo -->
          <line x1="140" y1="90" x2="140" y2="150" class="forca-parte" />
          <!-- braços -->
          <line x1="140" y1="120" x2="120" y2="100" class="forca-parte" />
          <line x1="140" y1="120" x2="160" y2="100" class="forca-parte" />
          <!-- pernas -->
          <line x1="140" y1="150" x2="120" y2="180" class="forca-parte" />
          <line x1="140" y1="150" x2="160" y2="180" class="forca-parte" />
        </svg>
      </div> 

      <div class="letras-erradas-container">
        <h3>Letras erradas</h3>
      </div>
    </div> 

    <div class="palavra-secreta-container"></div> 

    <div class="aviso-palavra-repetida">
      Você já usou essa letra!
    </div> 

    <div class="popup-container">
      <div class="popup">
        <h2 id="mensagem"></h2>
        <button id="btn-jogar" onclick="reiniciarForca()">
          Jogar novamente
        </button>
      </div>
    </div> 

    <script src="js/script.js"></script>
  </body>
</html> 

`


```
* CSS 
Usado para estética macabra desse "Game"
```ruby
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url(../img/foto2.jpg);
    color: rgb(55, 143, 131);
    font-family: "Monaco", monospace;
  } 

  .jogo-container {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  } 

  .forca {
    fill: transparent;
    stroke: #fff;
    stroke-width: 4px;
    stroke-linecap: round;
  } 

  .forca-parte {
    display: none;
  } 

  .letras-erradas-container {
    font-size: 32px;
  } 

  .letras-erradas-container span {
    margin: 0 2px;
  } 

  .palavra-secreta-container {
    font-size: 45px;
  } 

  .aviso-palavra-repetida {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px 10px 0 0;
    padding: 15px 20px;
    position: absolute;
    bottom: -55px;
    transition: transform 0.3s ease-in-out;
  } 

  .aviso-palavra-repetida p {
    margin: 0;
  } 

  .aviso-palavra-repetida.show {
    transform: translateY(-50px);
  } 

  .palavra-secreta-container span {
    margin: 0 5px;
  } 

  .popup-container {
    background-color: rgba(0, 0, 0, 0.849);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* display: flex; */
    display: none;
    align-items: center;
    justify-content: center;
  } 

  .popup {
    background: #051d2c;
    border-radius: 5px;
    box-shadow: 0 15px 10px 3px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
  } 

  .popup button {
    cursor: pointer;
    background-color: #fff;
    border: 0;
    margin-top: 20px;
    padding: 12px 20px;
    font-size: 16px;
  } 

```
* Javascript 
Ferramenta principal para funcionamento do nosso código
```ruby
const personagens = ["chucky", "jason", "ghostface","pearl", "maxinne", "leatherface", "anabelle"]
const palavraOculta =
  personagens[Math.floor(Math.random() * personagens.length)];
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
``` 

## Diagrama 


## Vídeo Do Jogo

