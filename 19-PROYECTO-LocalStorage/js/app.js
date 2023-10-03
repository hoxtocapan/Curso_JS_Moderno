//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event listeners
eventListeners();

function eventListeners() {
  // cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  //cuando el documento esta listo
 document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    crearHTML();
 })
}

//Funciones
function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return;
  }
  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  //Añadir al areglo de tweet
  tweets = [...tweets, tweetObj];

  //Agregar el HTML
  crearHTML();

  formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("P");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //imsertar en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

//muestra un listado de los tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
    const btnEliminar = document.createElement('a');
    btnEliminar.classList.add('borrar-tweet');
    btnEliminar.innerText= 'X'
    btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
    }
    
      const li = document.createElement("LI");
      li.textContent = tweet.tweet;
      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Agregar los twees actuales a localstorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));

}

//Elimina un Tweet
function borrarTweet(id) {
    tweets = tweets.filter ( tweet => tweet.id != id);
    crearHTML();
}

//limpiar HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}


