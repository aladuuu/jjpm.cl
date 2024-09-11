const terminal = document.getElementById("terminal");
const terminalContent = document.getElementById("terminal-content");
const input = document.getElementById("input");
const cursor = document.getElementById("cursor");
const prompt = document.getElementById("prompt");
const measureText = document.getElementById("measure-text");
const commands = {
  help: "Available commands: whoami, work, certs, contact, time, date, motd, pong.",
  whoami: `<br>
════════════════════════
 J. Joaquin Perez M.
════════════════════════
- Industrial Designer
- Full Stack Developer
- Jiu Jitsu Black Belt
════════════════════════
<br>`,
  work: `<br>
════════════════════════
Latest Projects
════════════════════════
- <a href="https://jjpm.cl" target="_blank">JJPM</a>
- <a href="https://adbjj.cl" target="_blank">ADBJJ</a>
- <a href="https://al-shaalan.cl" target="_blank">EASH</a>
- <a href="https://jjpm.cl/webs/static/asistencia.adbjj.cl" target="_blank">ADBJJ Asistencia</a>
- <a href="https://evolutionmma.cl/store/index.html" target="_blank">EMAA</a>
- <a href="https://korona.cl" target="_blank">KORONA</a>
- <a href="https://jjpm.cl/webs/static/grupomontun.cl" target="_blank">GM</a>
- <a href="https://finest.cl" target="_blank">FINEST</a>
- <a href="https://jjpm.cl/webs/static/dilacon.cl" target="_blank">DILACON</a>
════════════════════════
<br>`,
  certs: `<br>
════════════════════════
Latest Certifications
════════════════════════
- <a href="https://www.coderhouse.com/certificados/66a2bb38086d130019bf0078" target="_blank">Carrera Full Stack</a>
- <a href="https://www.coderhouse.com/certificados/651e78d8c20c555d40bf6f85" target="_blank">Carrera Front End React</a>
- <a href="https://www.coderhouse.com/certificados/64301dfa60028a0002d41d3d" target="_blank">Carrera UX/UI</a>
- <a href="https://www.coderhouse.com/certificados/669c06dc7b40571f2725fd7b" target="_blank">Backend Node.js</a>
- <a href="https://www.coderhouse.com/certificados/64301df960028a0002d41d39" target="_blank">Desarrollo Web</a>
- <a href="https://www.coderhouse.com/certificados/62eaae1984782b0019d74760" target="_blank">Photoshop & Illustrator</a>
- <a href="https://www.coderhouse.com/certificados/651e78d8c20c5509f2bf6f7a" target="_blank">React</a>
- <a href="https://www.coderhouse.com/certificados/63f035f70b4bef000f4a4d96" target="_blank">UX/UI Avanzado</a>
- <a href="https://www.coderhouse.com/certificados/638222cc202068000e6b29b5" target="_blank">UX/UI</a>
════════════════════════
<br>`,
  contact: `<br>
════════════════════════
Email
════════════════════════
<a href="mailto:contacto@jjpm.cl">contacto@jjpm.cl</a>
════════════════════════
<br>`,
  date: () => {
    const today = new Date();
    return `<br>
════════════════════════
Date
════════════════════════
${today.toLocaleDateString()}
════════════════════════
<br>`;
  },
  time: () => {
    const now = new Date();
    return `<br>
════════════════════════
Time
════════════════════════
${now.toLocaleTimeString()}
════════════════════════
<br>`;
  },
  pong: () => {
    clearTerminal();
    startPongGame();
  },
  motd: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⠶⠶⠶⠶⠶⠶⠶⠶⣶⣶⣦⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣠⠾⠿⠿⢿⣿⣿⣿⣟⣻⠿⠶⠶⠿⠖⠒⢀⣿⣿⣿⣷⣶⣶⣦⣤⣀⡀⠀⠀⠀
⠀⠀⠀⢀⣴⠟⢉⣠⣴⣾⠟⠋⠉⠁⠿⠛⢛⣛⣛⣒⣒⣒⣛⡋⠉⠉⢉⣽⣿⣿⣿⣿⢿⣦⠀⠀
⠀⠀⣰⡟⢁⣴⣿⡿⠋⣠⡾⠟⠛⠛⠛⠻⢯⡁⠀⠈⠉⠀⠀⠀⣠⡾⠋⠁⠀⣠⣾⣿⢻⡆⠀⠀
⠀⣰⡟⠐⠉⠉⠁⠀⣰⠏⠀⠀⠀⠀⠀⠀⠈⣿⡀⠀⠀⠀⠀⢸⡟⠀⠀⠀⠀⠈⠛⠋⢸⣇⠀⠀
⢀⣿⠀⠀⠀⠀⢀⣀⣿⠀⣴⣶⣶⡄⠀⠀⠀⣿⡇⠀⠀⠀⠀⢸⣇⠀⠀⠀⠀⠀⠀⢀⣿⣿⡀⠀
⢸⡇⠀⠀⠀⡠⠾⠿⣿⣆⠻⠿⠛⠀⠀⠀⢠⡿⠁⠀⠀⠀⠀⠈⠻⢶⣤⣤⣴⡶⠶⢿⣧⣿⡇⠀
⣾⠃⠀⠀⠀⠀⠀⠜⠉⠈⠛⠶⢶⣦⣶⠾⠋⠁⠀⠀⠀⠀⠀⠀⢀⣠⣾⠋⢀⣠⣤⣀⠈⠛⣧⡀
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠲⠶⠶⠶⠒⠚⢻⣿⠁⣴⣿⣁⣉⠙⢷⡄⠘⣷
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣟⣛⣋⣁⢰⣿⠃⢸⡟⢹⠋⣿⢻⡿⣷⠀⣿
⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣈⣉⣉⣉⣉⣁⢸⡟⠀⣼⡟⠛⠛⠛⠛⠛⣿⢀⡿
⢻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠈⣿⠀⣿⡇⠀⠀⠀⠀⢠⡟⣸⠇
⠘⣧⠀⠀⠀⠀⠀⢲⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡄⣿⡇⠀⠀⠀⢀⣿⠁⣿⠀
⠀⢻⡆⠀⠀⠀⠀⠀⠙⣄⠀⠀⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⣿⠇⣿⠁⠀⠀⠀⢸⡇⠘⣿⠀
⠀⠈⣷⡀⠀⠀⠀⠀⠀⠈⣧⠀⠀⠀⠈⠭⠿⣿⣦⣄⠀⠀⠀⢀⣿⢀⣿⠀⠀⠀⠀⢸⡇⠀⢿⡄
⠀⠀⠸⣧⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠒⠶⣬⣛⠷⡀⠀⣸⡇⢸⡏⠉⠙⠲⣄⠀⣿⡀⢸⡇
⠀⠀⠀⠹⣧⠀⠀⢰⡀⠀⠘⢧⡀⠀⠀⠠⠤⣤⣀⠙⢷⣄⠀⣿⠀⣸⣃⣀⣀⣀⣈⣷⣿⠇⢸⡇
⠀⠀⠀⠀⠻⣆⠀⠀⠃⠀⠀⠀⠙⢦⡀⠀⠀⠀⠉⠓⢦⡈⢸⡇⠀⢻⡏⣽⣉⡏⣿⢩⡿⠀⢸⡇
⠀⠀⠀⠀⠀⠹⣧⡀⠀⠘⠷⣦⣄⠀⠙⠦⡀⠀⠀⠀⠀⠙⢾⣧⠀⠸⣿⣉⠉⠛⣛⣿⠃⠀⣿⠁
⠀⠀⠀⠀⠀⠀⠈⠻⣦⡀⠀⠀⠉⠓⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣄⠀⠈⠙⠛⠛⠛⠁⢀⣾⠃⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣦⣤⣤⣤⣤⡾⠛⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣶⣦⣄⡀⠀⠀⠀⠀⠀⣠⣠⣤⣽⠟⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠷⢶⣤⣶⠶⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
 `,
};

function clearTerminal() {
  terminalContent.innerHTML = "";
}

function printToTerminal(text, allowHTML = false) {
  const lines = (text || "").split("\n");
  lines.forEach((line) => {
    const newLine = document.createElement("div");
    if (allowHTML) {
      newLine.innerHTML = line;
    } else {
      newLine.textContent = line;
    }
    terminalContent.appendChild(newLine);
  });
  terminal.scrollTop = terminal.scrollHeight;
}

printToTerminal('Welcome to my website. Type "help" for more information.');

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const command = input.value.trim().toLowerCase();
    printToTerminal(prompt.innerText + " " + command);

    if (commands.hasOwnProperty(command)) {
      const output =
        typeof commands[command] === "function"
          ? commands[command]()
          : commands[command];
      printToTerminal(
        output,
        command === "certs" ||
          command === "work" ||
          command === "whoami" ||
          command === "contact" ||
          command === "date" ||
          command === "time" ||
          command === "pong"
      );
    } else if (command === "clear") {
      terminalContent.innerHTML = "";
    } else if (command === "") {
      // comando vacío
    } else {
      printToTerminal('Unknown command. Type "help" for more information.');
    }

    input.value = "";
  }
});

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
