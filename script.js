document.addEventListener("DOMContentLoaded", function() {
    const gridContainer = document.getElementById("grid");
    const startButton = document.getElementById("start-button");
    const scoreDisplay = document.getElementById("score");
    const gameOverPopup = document.getElementById("game-over-popup");
    const continueYesButton = document.getElementById("continue-yes");
    const continueNoButton = document.getElementById("continue-no");
  
    let gridSize = 6; // Default grid size
    let score = 0;
    let gameOver = false;
  
    // Create the grid
    function createGrid() {
      gridContainer.innerHTML = "";
      for (let i = 0; i < gridSize * gridSize; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.dataset.index = i;
        block.addEventListener("click", revealBlock);
        gridContainer.appendChild(block);
      }
    }
  
    // Randomly distribute fielders and bonus blocks on the grid
    function distributeBlocks() {
      const blocks = gridContainer.querySelectorAll(".block");
      const fielderCount = 11;
      const bonusCount = 10;
  
      const blockIndexes = generateUniqueRandomIndexes(gridSize * gridSize, fielderCount + bonusCount);
  
      for (let i = 0; i < fielderCount; i++) {
        blocks[blockIndexes[i]].dataset.fielder = true;
      }
  
      for (let i = fielderCount; i < fielderCount + bonusCount; i++) {
        blocks[blockIndexes[i]].dataset.bonus = true;
      }
    }
  
    // Generate unique random indexes
    function generateUniqueRandomIndexes(range, count) {
      const indexes = [];
      for (let i = 0; i < range; i++) {
        indexes.push(i);
      }
      indexes.sort(() => Math.random() - 0.5);
      return indexes.slice(0, count);
    }
  
    // Reveal the clicked block
    function revealBlock(event) {
      if (gameOver) return;
  
      const block = event.target;
      const isFielder = block.dataset.fielder === "true";
      const isBonus = block.dataset.bonus === "true";
  
      block.removeEventListener("click", revealBlock);
  
      if (isFielder) {
        block.style.backgroundColor = "red";
        endGame();
      } else if (isBonus) {
        block.style.backgroundColor = "purple";
        score += 6;
        scoreDisplay.textContent = "Score: " + score;
      } else {
        block.style.backgroundColor = "green";
        score += 1;
        scoreDisplay.textContent = "Score: " + score;
      }
  
      checkGameWon();
    }
  
    // End the game
    function endGame() {
      gameOver = true;
      gridContainer.classList.add("game-over");
      gameOverPopup.style.display = "block";
  
      continueNoButton.addEventListener("click", function() {
        window.location.href = "home.html";
      });
    }
  
    // Check if the game is won
    function checkGameWon() {
      const remainingBlocks = gridContainer.querySelectorAll(".block:not([style*='background-color'])");
      if (remainingBlocks.length === 0) {
        endGame();
      }
    }
  
    // Start the game
    function startGame() {
      score = 0;
      scoreDisplay.textContent = "Score: " + score;
      gameOver = false;
      gridContainer.classList.remove("game-over");
      gameOverPopup.style.display = "none";
  
      createGrid();
      distributeBlocks();
    }

  
    startButton.addEventListener("click", startGame);
    continueYesButton.addEventListener("click", startGame);
  });
  
