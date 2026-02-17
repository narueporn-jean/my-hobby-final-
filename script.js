<script>
document.addEventListener("DOMContentLoaded", function () {

  let score = 0;
  let timeLeft = 15;
  let timer;
  let gameActive = false;
  let highScore = localStorage.getItem("highScore") || 0;

  const star = document.getElementById("star");
  const scoreDisplay = document.getElementById("score");
  const timeDisplay = document.getElementById("time");
  const gameBox = document.querySelector(".game-box");
  const startBtn = document.getElementById("startBtn");

  function moveStar() {
    const boxWidth = gameBox.clientWidth - 50;
    const boxHeight = gameBox.clientHeight - 50;

    star.style.left = Math.random() * boxWidth + "px";
    star.style.top = Math.random() * boxHeight + "px";
  }

  function createParticles(x, y) {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      p.textContent = "✨";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--x", (Math.random()*80-40)+"px");
      p.style.setProperty("--y", (Math.random()*80-40)+"px");
      gameBox.appendChild(p);
      setTimeout(()=>p.remove(),800);
    }
  }

  star.addEventListener("click", function (e) {
    if (!gameActive) return;

    score++;
    scoreDisplay.textContent = score;

    createParticles(e.offsetX, e.offsetY);
    moveStar();
  });

  startBtn.addEventListener("click", function () {

    gameBox.innerHTML = '<div id="star">⭐</div>';
    const newStar = document.getElementById("star");
    newStar.style.display = "block";
    newStar.style.position = "absolute";
    star.replaceWith(newStar);

    score = 0;
    timeLeft = 15;
    gameActive = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    moveStar();

    clearInterval(timer);
    timer = setInterval(function () {
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        gameActive = false;

        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore);
        }

        const popup = document.createElement("div");
        popup.classList.add("result-popup");
        popup.innerHTML = `
          🎉 Final Score: ${score} <br>
          🏆 High Score: ${highScore} <br><br>
          <button onclick="location.reload()" class="start-btn">Play Again</button>
        `;
        gameBox.appendChild(popup);
      }

    }, 1000);
  });

});
</script>
