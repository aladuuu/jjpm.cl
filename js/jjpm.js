const apiKey = "o0e5F0JWYcMndfAYEqmYHfG8u2X6EAmCDlJSfjZd";
const updateInterval = 5 * 60 * 1000;
let currentSearchResult = null;
let backgroundTimer = null;

function displayDateTime() {
  var date = new Date();
  var months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime =
    month + " " + day + ", " + year + " " + hours + ":" + minutes + " " + ampm;
  document.getElementById("fecha").innerHTML = strTime;
}
setInterval(displayDateTime, 1000);

function updateBackground() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.media_type === "video") {
        setVideoBackground(data.url);
      } else {
        setImageBackground(data.url);
      }
    })
    .catch((error) => {
      console.error("Error fetching APOD:", error);
      setDefaultBackground();
    });
}

function setImageBackground(url) {
  const container = document.getElementById("background-container");
  container.style.backgroundImage = `url(${url})`;
  removeExistingVideo();
}

function setVideoBackground(url) {
  const container = document.getElementById("background-container");
  container.style.backgroundImage = "none";
  removeExistingVideo();
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = extractYouTubeId(url);
    const iframe = document.createElement("iframe");
    iframe.id = "background-video";
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.style.position = "absolute";
    iframe.style.top = "50%";
    iframe.style.left = "50%";
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.transform = "translate(-50%, -50%)";
    iframe.style.objectFit = "cover";
    container.appendChild(iframe);
  } else {
    const video = document.createElement("video");
    video.id = "background-video";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.innerHTML = `<source src="${url}" type="video/mp4">`;
    video.style.position = "absolute";
    video.style.top = "50%";
    video.style.left = "50%";
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.transform = "translate(-50%, -50%)";
    video.style.objectFit = "cover";
    container.appendChild(video);
  }
}

function removeExistingVideo() {
  const existingVideo = document.getElementById("background-video");
  if (existingVideo) {
    existingVideo.remove();
  }
}

function setDefaultBackground() {
  setImageBackground(
    "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia16613_orig.jpg"
  );
}

function extractYouTubeId(url) {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const searchButton = document.getElementById("search-button");
  const closeButton = document.getElementsByClassName("close")[0];
  const dateInput = document.getElementById("date-input");
  const searchDateButton = document.getElementById("search-date");
  const modalResult = document.getElementById("modal-result");
  const applyBackgroundButton = document.getElementById("apply-background");

  searchButton.onclick = function () {
    modal.style.display = "block";
  };

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  searchDateButton.onclick = function () {
    const date = dateInput.value;
    if (date) {
      fetchAPODByDate(date);
    } else {
      alert("Selecciona una fecha...");
    }
  };

  applyBackgroundButton.onclick = applyTemporaryBackground;

  function fetchAPODByDate(date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
      .then((response) => response.json())
      .then((data) => {
        displayResult(data);
      })
      .catch((error) => {
        console.error("Error fetching APOD:", error);
        modalResult.innerHTML =
          "Error al obtener la imagen. Por favor, intenta de nuevo.";
      });
  }

  function displayResult(data) {
    currentSearchResult = data;
    let content = `<h3>${data.title}</h3>`;
    if (data.media_type === "image") {
      content += `<img src="${data.url}" alt="${data.title}">`;
    } else if (data.media_type === "video") {
      if (data.url.includes("youtube.com") || data.url.includes("youtu.be")) {
        const videoId = extractYouTubeId(data.url);
        content += `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        content += `<video controls>
                                <source src="${data.url}" type="video/mp4">
                                Tu navegador no soporta el tag de video.
                            </video>`;
      }
    }
    content += `<p>${data.explanation}</p>`;
    modalResult.innerHTML = content;
    applyBackgroundButton.style.display = "block";
  }

  function applyTemporaryBackground() {
    if (currentSearchResult) {
      if (currentSearchResult.media_type === "image") {
        setImageBackground(currentSearchResult.url);
      } else if (currentSearchResult.media_type === "video") {
        setVideoBackground(currentSearchResult.url);
      }

      if (backgroundTimer) {
        clearTimeout(backgroundTimer);
      }

      backgroundTimer = setTimeout(() => {
        updateBackground();
      }, 60 * 60 * 1000);

      modal.style.display = "none";
    }
  }

  updateBackground();
  setInterval(updateBackground, updateInterval);
});
