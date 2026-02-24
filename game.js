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
      setStatus(`Time! New high score: ${score}`);
    } else {
      setStatus(`Time! Final score: ${score}. Try again!`);
    }
    render();
  }

  function tick() {
    if (!isRunning) return;

    timeLeft--;
    if (timeLeft <= 0) {
      endGame();
    }
    render();
  }

  function startGame() {
    if (isRunning) return;
    isRunning = true;
    timeLeft = DEFAULT_TIME_SECONDS;
    score = 0;
    setStatus("");
    render();
    timerId = setInterval(tick, 1000);
  }

  function resetGame() {
    isRunning = false;
    stopTimer();
    timeLeft = DEFAULT_TIME_SECONDS;
    score = 0;
    // localStorage.setItem(HIGH_SCORE_KEY, "0"); // <-- Bug: should not clear high score (removed)
    setStatus("");
    render();
  }

  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
  clickBtn.addEventListener("click", () => {
    if (!isRunning) return;
    score++;
    render();
  });

  // Initial render
  render();
})();