const apiKey = "o0e5F0JWYcMndfAYEqmYHfG8u2X6EAmCDlJSfjZd";
const updateInterval = 5 * 60 * 1000;

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
  updateBackground();
  setInterval(updateBackground, updateInterval);
});