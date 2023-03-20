const apiKey = "o0e5F0JWYcMndfAYEqmYHfG8u2X6EAmCDlJSfjZd";
const updateInterval = 5 * 60 * 1000; // 5 minutes
function updateBackground() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      document.body.style.backgroundImage = `url(${data.url})`;
    })
    .catch(error => {
      console.error(error);
    });
}
updateBackground();
setInterval(updateBackground, updateInterval);