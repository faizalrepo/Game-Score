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