const apiKey = "o0e5F0JWYcMndfAYEqmYHfG8u2X6EAmCDlJSfjZd";
const updateInterval = 5 * 60 * 1000; // 5 minutes

function updateBackground() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.media_type === "image") {
        document.body.style.backgroundImage = `url(${data.url})`;
      } else if (data.media_type === "video") {
        document.body.style.backgroundImage = `url(${data.thumbnail_url})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.innerHTML += `
          <video autoplay loop muted style="position: fixed; z-index: -1; top: 0; left: 0; min-width: 100%; min-height: 100%;">
            <source src="${data.url}" type="video/mp4">
          </video>
        `;
      }
    })
    .catch(error => {
      console.error(error);
    });
}
updateBackground();
setInterval(updateBackground, updateInterval);