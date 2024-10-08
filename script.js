const audio = document.getElementById("audio");
const video = document.getElementById("video");
const videoButton = document.getElementById("startCamera");
const playButton = document.getElementById("playButton");

const api = (latitude, longitude) => {
  return `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
}

let videoShowing = false;
let musicPlaying = false;

// Função para obter a localização do usuário a ser disparada ao clicar no botão
// caso o navegador suporte a geolocalização
// se não suportar, exibe um alerta
document
  .getElementById("getLocation")
  .addEventListener("click", function () {
    //console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        showPosition, showError
      )
    } else {
      alert('navegador não possui geolocalizacao')
    }
  });

// Função para exibir a localização do usuário
// deve pegar a latitude e longitude e exibir na div com id "output"
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //document.getElementById('output').innerHTML = 
  //  `Latidude: ${latitude}, Longitude: ${longitude}`;
  const url = api(latitude, longitude);
  fetch(url)
    .then(resposta => {
      //console.log(resposta)
      //console.log(resposta.json())
      return resposta.json()
    })
    .then(dado => {
      //console.log(dado)
      document.getElementById('output').innerHTML = dado.display_name;
    })
    .catch(error => {
      document.getElementById('output').innerHTML = '';
      alert('erro na consulta');
    })
}

// Função para exibir um alerta com a mensagem de erro
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Usuário negou a solicitação de Geolocalização.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("A localização não está disponível.");
      break;
    case error.TIMEOUT:
      alert("A solicitação de Geolocalização expirou.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Um erro desconhecido ocorreu.");
      break;
  }
}

// Função para exibir a câmera do usuário ao clicar no botão
videoButton.addEventListener("click", function () { });

// Função para executar uma música ao clicar no botão
playButton.addEventListener("click", function () {
  if (musicPlaying) {
    audio.pause();
    audio.classList.add("hidden");
    playButton.innerText = "Tocar Música";
    musicPlaying = false;
  } else {
    audio.play();
    audio.classList.remove("hidden");
    playButton.innerText = "Parar Música";
    musicPlaying = true;
  }
});
