let scores = {
    player1: 0,
    player2: 0
};

function updateScore(player, points) {
    const playerKey = `player${player}`;
    const oldScore = scores[playerKey];
    scores[playerKey] += points;
    
    // Prevent negative scores
    if (scores[playerKey] < 0) {
        scores[playerKey] = 0;
    }
    
    // Update the display
    const scoreElement = document.getElementById(`${playerKey}-score`);
    scoreElement.textContent = scores[playerKey];
    
    // Add change animation
    scoreElement.classList.add('changed');
    setTimeout(() => scoreElement.classList.remove('changed'), 500);

    // Update leading indicators
    updateLeadingState();
}

function updateLeadingState() {
    const player1Section = document.querySelector('.player1');
    const player2Section = document.querySelector('.player2');
    const scoreBoard = document.querySelector('.score-board');
    const tieIndicator = document.querySelector('.tie-indicator');
    
    // Remove all states first
    player1Section.classList.remove('leading');
    player2Section.classList.remove('leading');
    scoreBoard.classList.remove('tie-state');
    
    // Compare scores and update states
    if (scores.player1 > scores.player2) {
        player1Section.classList.add('leading');
        tieIndicator.style.opacity = '0';
    } else if (scores.player2 > scores.player1) {
        player2Section.classList.add('leading');
        tieIndicator.style.opacity = '0';
    } else if (scores.player1 > 0 || scores.player2 > 0) {
        // Show tie state
        scoreBoard.classList.add('tie-state');
        tieIndicator.style.opacity = '1';
    }
}

function resetScores() {
    scores.player1 = 0;
    scores.player2 = 0;
    document.getElementById('player1-score').textContent = '0';
    document.getElementById('player2-score').textContent = '0';
    updateLeadingState();
}

// Add this new function to handle card clicks
function handleCardClick(event, player) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isRightSide = x > rect.width / 2;
    
    updateScore(player, isRightSide ? 1 : -1);
    
    // Add click feedback
    const side = isRightSide ? 'victory' : 'defeat';
    const indicator = card.querySelector(`.${side}`);
    indicator.style.transform = 'scale(1.2)';
    indicator.style.opacity = '1';
    
    setTimeout(() => {
        indicator.style.transform = '';
        indicator.style.opacity = '';
    }, 200);
} 

// Add these functions
function endGame() {
    const player1Score = scores.player1;
    const player2Score = scores.player2;
    
    if (player1Score === player2Score) {
        alert('Game is tied! No winner yet.');
        return;
    }
    
    const winner = player1Score > player2Score ? 'SAFA' : 'FAIZAL';
    showWinner(winner);
}

function showWinner(name) {
    const winnerScreen = document.querySelector('.winner-screen');
    const winnerName = document.querySelector('.winner-name');
    
    winnerName.textContent = name;
    winnerScreen.classList.add('active');
    
    // Create confetti
    createConfetti();
    
    // Add click to dismiss
    winnerScreen.onclick = () => {
        winnerScreen.classList.remove('active');
        resetScores();
    };
}

function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = [
        'var(--neon-pink)',
        'var(--neon-blue)',
        '#fff'
    ];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        container.appendChild(confetti);
        
        // Remove confetti after animation
        confetti.onanimationend = () => confetti.remove();
    }
} 