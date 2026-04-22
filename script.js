const boxes = document.querySelectorAll(".box");
const resetButton = document.getElementById("reset-btn");
const winnerBanner = document.getElementById("winner-banner");
const winnerText = document.getElementById("winner-text");
const turnIndicator = document.querySelector(".turn-indicator");
const turnText = document.getElementById("turn-text");
const xScoreEl = document.getElementById("x-score");
const oScoreEl = document.getElementById("o-score");

let turnX = true;
let scores = { X: 0, O: 0 };

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function updateTurnIndicator() {
  const player = turnX ? "X" : "O";
  turnText.innerHTML = `Player <strong>${player}</strong>'s Turn`;
  turnIndicator.className = `turn-indicator ${turnX ? "" : "o-turn"}`;
}

function checkWin() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[b].textContent === boxes[c].textContent
    ) {
      // highlight winning boxes
      [boxes[a], boxes[b], boxes[c]].forEach(box => box.classList.add("win"));
      showWinner(boxes[a].textContent, condition);
      return;
    }
  }

  const isDraw = [...boxes].every(box => box.textContent !== "");
  if (isDraw) {
    showDraw();
  }
}

function showWinner(winner, condition) {
  boxes.forEach(box => (box.disabled = true));

  scores[winner]++;
  const scoreEl = winner === "X" ? xScoreEl : oScoreEl;
  scoreEl.textContent = scores[winner];
  scoreEl.classList.add("score-bump");
  setTimeout(() => scoreEl.classList.remove("score-bump"), 400);

  winnerText.textContent = `Player ${winner} Wins!`;
  winnerBanner.className = `winner-banner show ${winner === "X" ? "x-wins" : "o-wins"}`;
  turnIndicator.style.opacity = "0";
}

function showDraw() {
  boxes.forEach(box => (box.disabled = true));
  winnerText.textContent = "It's a Draw!";
  winnerBanner.className = "winner-banner show draw";
  turnIndicator.style.opacity = "0";
}

function resetGame() {
  boxes.forEach(box => {
    box.textContent = "";
    box.disabled = false;
    box.className = "box";
  });
  turnX = true;
  winnerBanner.className = "winner-banner";
  turnIndicator.style.opacity = "1";
  updateTurnIndicator();
}

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.textContent !== "") return;
    const player = turnX ? "X" : "O";
    box.textContent = player;
    box.classList.add(player.toLowerCase());
    turnX = !turnX;
    updateTurnIndicator();
    checkWin();
  });
});

resetButton.addEventListener("click", resetGame);

// init
updateTurnIndicator();
