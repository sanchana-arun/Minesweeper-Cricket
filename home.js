function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#FDD835', '#FF8F00', '#FF5722', '#F44336'];
  
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.backgroundColor = colors[i % colors.length];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.animationDelay = Math.random() * 5 + 's';
      confettiContainer.appendChild(confetti);
    }
  }
  
  function redirectToGame() {
    // Redirect to the game page
    window.location.href = 'index.html';
  }
  
  createConfetti();
  
  const playButton = document.getElementById('playButton');
  playButton.addEventListener('click', redirectToGame);
