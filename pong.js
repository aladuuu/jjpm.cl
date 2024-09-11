function startPongGame() {
  const textInput = document.getElementById("input");
  if (textInput) {
    textInput.disabled = true;
  }

  let canvas = document.getElementById("pong-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "pong-canvas";
    canvas.width = terminalContent.clientWidth;
    canvas.height = terminalContent.clientHeight - 50;
    canvas.style.borderTop = "2px solid #0f0";
    canvas.style.borderBottom = "2px solid #0f0";
    terminalContent.appendChild(canvas);

    const statsContainer = document.createElement("div");
    statsContainer.id = "stats-container";
    statsContainer.style.display = "flex";
    statsContainer.style.justifyContent = "space-between";
    statsContainer.style.marginTop = "10px";
    statsContainer.style.color = "#0f0";

    const timerDisplay = document.createElement("span");
    timerDisplay.id = "timer-display";
    timerDisplay.textContent = "Time: 00:00:00";
    statsContainer.appendChild(timerDisplay);

    const scoreDisplay = document.createElement("span");
    scoreDisplay.id = "score-display";
    scoreDisplay.textContent = "Player: 0 | AI: 0";
    statsContainer.appendChild(scoreDisplay);

    terminalContent.appendChild(statsContainer);

    const exitMessage = document.createElement("div");
    exitMessage.id = "exit-message";
    exitMessage.style.textAlign = "center";
    exitMessage.style.marginTop = "5px";
    exitMessage.style.color = "#0f0";
    exitMessage.textContent = "Press Ctrl+Q to exit.";
    terminalContent.appendChild(exitMessage);
  }

  const ctx = canvas.getContext("2d");

  let paddleHeight = 75,
    paddleWidth = 10;
  let playerX = 10,
    aiX = canvas.width - paddleWidth - 10;
  let playerY = (aiY = (canvas.height - paddleHeight) / 2);
  let ballX = canvas.width / 2,
    ballY = canvas.height / 2;
  let ballSpeedX = 3,
    ballSpeedY = 3;
  let playerSpeed = 16;
  let playerScore = 0,
    aiScore = 0;
  let aiSpeed = 3;
  let aiErrorChance = 0.3;
  let gameStartTime = Date.now();
  let gameOver = false;

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      playerY = Math.max(playerY - playerSpeed, 0);
    } else if (event.key === "ArrowDown") {
      playerY = Math.min(playerY + playerSpeed, canvas.height - paddleHeight);
    } else if (event.ctrlKey && event.key === "q") {
      closePongGame();
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function update() {
    if (gameOver) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + 10 > canvas.height || ballY - 10 < 0) {
      ballSpeedY = -ballSpeedY;
    }

    if (
      (ballX - 10 < playerX + paddleWidth &&
        ballY > playerY &&
        ballY < playerY + paddleHeight) ||
      (ballX + 10 > aiX && ballY > aiY && ballY < aiY + paddleHeight)
    ) {
      ballSpeedX = -ballSpeedX;
    }

    if (Math.random() > aiErrorChance) {
      if (ballY > aiY + paddleHeight / 2) {
        aiY = Math.min(aiY + aiSpeed, canvas.height - paddleHeight);
      } else {
        aiY = Math.max(aiY - aiSpeed, 0);
      }
    }

    if (ballX < 0) {
      aiScore++;
      resetBall();
    } else if (ballX > canvas.width) {
      playerScore++;
      resetBall();

      if (playerScore % 3 === 0) {
        increaseBallSpeed();
        improveAI();
      }
    }

    const scoreDisplay = document.getElementById("score-display");
    if (scoreDisplay) {
      scoreDisplay.textContent = `You: ${playerScore} | AI: ${aiScore}`;
    }

    checkGameOver();
  }

  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }

  function increaseBallSpeed() {
    ballSpeedX *= 1.2;
    ballSpeedY *= 1.2;
  }

  function improveAI() {
    aiErrorChance = Math.max(0, aiErrorChance - 0.05);
    aiSpeed += 0.5;
  }

  function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    const timerDisplay = document.getElementById("timer-display");
    if (timerDisplay) {
      timerDisplay.textContent = `Time: ${formattedTime}`;
    }
  }

  function checkGameOver() {
    if (playerScore >= 100) {
      gameOver = true;
      displayGameOverMessage("You Win!");
      closePongGame();
    } else if (aiScore >= 100) {
      gameOver = true;
      displayGameOverMessage("You Lose!");
      closePongGame();
    }
  }

  function displayGameOverMessage(message) {
    const gameOverMessage = document.createElement("div");
    gameOverMessage.style.textAlign = "center";
    gameOverMessage.style.marginTop = "20px";
    gameOverMessage.style.color = "#ff0000";
    gameOverMessage.textContent = message;
    terminalContent.appendChild(gameOverMessage);
  }

  function gameLoop() {
    update();
    draw();
    updateTimer();
    requestAnimationFrame(gameLoop);
  }

  function closePongGame() {
    document.removeEventListener("keydown", handleKeyDown);
    if (canvas) {
      canvas.remove();
    }
    const statsContainer = document.getElementById("stats-container");
    if (statsContainer) {
      statsContainer.remove();
    }
    const exitMessage = document.getElementById("exit-message");
    if (exitMessage) {
      exitMessage.remove();
    }
    printToTerminal('Game ended. Type "help" for more information.');

    if (textInput) {
      textInput.disabled = false;
    }
  }

  gameLoop();
}
