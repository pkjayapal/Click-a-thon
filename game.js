(() => {
  const DEFAULT_TIME_SECONDS = 5; //
  const HIGH_SCORE_KEY = "lighthouse_high_score";

  const timeEl = document.getElementById("time");
  const scoreEl = document.getElementById("score");
  const highScoreEl = document.getElementById("highScore");
  const statusEl = document.getElementById("highStatus");

  const startBtn = document.getElementById("startBtn");
  const resetBtn = document.getElementById("resetBtn");
  const clickBtn = document.getElementById("clickBtn");

  let timeLeft = DEFAULT_TIME_SECONDS;
  let score = 0;
  let isRunning = false;
  let timerId = null;

  function loadHighScore() {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    const value = raw ? Number(raw) : 0;
    return Number.isFinite(value) ? value : 0;
  }

  function saveHighScore(value) {
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  }

  function setStatus(msg) {
    statusEl.textContent = msg;
  }

  function render() {
    timeEl.textContent = String(timeLeft).padStart(2, "0");
    scoreEl.textContent = String(score);
    highScoreEl.textContent = String(loadHighScore());

    startBtn.disabled = isRunning;
    clickBtn.disabled = !isRunning || timeLeft <= 0;
    resetBtn.disabled = isRunning || timeLeft <= 0;
  }

  function stopTimer() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }

  function endGame() {
    isRunning = false;
    stopTimer();

    const highScore = loadHighScore();
    if (score > highScore) {
      saveHighScore(score);
      setStatus(`Time! New high score: ${score} 🥳`);
    } else {
      setStatus(`Time! Final score: ${score}. Try again!`);
    }
    render();
  }

  function tick() {
    if (!isRunning) return;

    timeLeft -= 1;
    if (timeLeft <= 0) {
      timeLeft = 0;
      render();
      return;
    }
    render();
  }

  function start_Game() {
    score = 0;
    timeLeft = DEFAULT_TIME_SECONDS;
    isRunning = true;
    timerId = setInterval(() => {
      tick();
      if (timeLeft === 0) {
        endGame();
      }
    }, 1000);
    setStatus("Game started! Click away!");
    render();
  }

  function resetGame() {
    score = 0;
    timeLeft = DEFAULT_TIME_SECONDS;
    // Removed clearing high score to fix the issue
    // localStorage.setItem(HIGH_SCORE_KEY, '0');
    render();

    startBtn.disabled = isRunning;
    clickBtn.disabled = !isRunning || timeLeft <= 0;
    resetBtn.disabled = isRunning || timeLeft <= 0;
  }

  startBtn.addEventListener("click", start_Game);
  resetBtn.addEventListener("click", resetGame);

  clickBtn.addEventListener("click", () => {
    if (!isRunning) return;

    score += 1;
    render();
  });

  render();
})();
