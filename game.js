(function() {
  const DEFAULT_TIME_SECONDS = 5; //
  const HIGH_SCORE_KEY = "clickathon_high_score_v1";

  const timeEl = document.getElementById("time");
  const scoreEl = document.getElementById("score");
  const highScoreEl = document.getElementById("highScore");
  const statusEl = document.getElementById("highs");

  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const clickBtn = document.getElementById("clickBtn");


  let timeLeft = DEFAULT_TIME_SECONDS;
  let timerIntervalId = null;
  let score = 0;
  let highScore = localStorage.getItem(HIGH_SCORE_KEY) || 0;


  function updateTime() {
    timeEl.textContent = timeLeft;
  }

  function updateScore() {
    scoreEl.textContent = score;
  }

  function updateHighScore() {
    highScoreEl.textContent = highScore;
  }

  function updateStatus(message) {
    statusEl.textContent = message;
  }

  function startGame() {
    score = 0;
    timeLeft = DEFAULT_TIME_SECONDS;
    updateTime();
    updateScore();
    updateStatus("");
    startBtn.disabled = true;
    resetBtn.disabled = false;
    clickBtn.disabled = false;

    timerIntervalId = setInterval(() => {
      timeLeft--;
      updateTime();
      if (timeLeft <= 0) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    clickBtn.disabled = true;
    startBtn.disabled = false;
    resetBtn.disabled = true;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem(HIGH_SCORE_KEY, highScore);
      updateHighScore();
      updateStatus("New High Score!");
    } else {
      updateStatus("Game Over!");
    }
  }

  function resetGame() {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    score = 0;
    timeLeft = DEFAULT_TIME_SECONDS;
    updateTime();
    updateScore();
    updateStatus("");
    startBtn.disabled = false;
    resetBtn.disabled = true;
    clickBtn.disabled = true;
  }

  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
  clickBtn.addEventListener("click", () => {
    score++;
    updateScore();
  });

  // Initialize game state
  resetGame();

  // Fix: Set background color to white
  document.body.style.backgroundColor = 'white';
})();