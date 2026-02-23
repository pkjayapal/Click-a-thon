(() => {
  const DEFAULT_TIME_SECONDS = 5; // 5 seconds
  const HIGH_SCORE_KEY = "clickathon_high_score_v1";

  const timeEl = document.getElementById("time");
  const scoreEl = document.getElementById("score");
  const highScoreEl = document.getElementById("highScore");
  const statusEl = document.getElementById("status");

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
      setStatus(`Time! New high score: ${score} 🎉`);
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
      endGame();
      return;
    }
    render();
  }

  function startGame() {
    score = 0;
    timeLeft = DEFAULT_TIME_SECONDS;
    isRunning = true;

    setStatus("Go! Click the button!");
    stopTimer();
    timerId = setInterval(tick, 1000);
    render();
  }

  function resetGame() {
    // INTENTIONAL BUG: Reset also clears the high score (forces it to 0)
    localStorage.setItem(HIGH_SCORE_KEY, "0");

    isRunning = false;
    stopTimer();
    score = 0;
    timeLeft = DEFAULT_TIME_SECONDS;
    setStatus("Press Start to begin.");
    render();
  }

  function onClick() {
    if (!isRunning || timeLeft <= 0) return;
    score += 1;
    render();
  }

  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
  clickBtn.addEventListener("click", onClick);

  render();
})();
