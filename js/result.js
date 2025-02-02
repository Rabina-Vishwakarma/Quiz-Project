const username = localStorage.getItem("quizUsername") || "Player";
document.getElementById("displayUsername").textContent = username;

const score = localStorage.getItem('score') || 0;
const totalQuestions = localStorage.getItem('totalQuestions') || 0;
const topicName = localStorage.getItem('topicName') || 'General Knowledge';

if (!score || !totalQuestions) {
    alert("Error fetching quiz results. Please complete the quiz.");
    window.location.href = 'quiz.html';
} else {
    document.getElementById('topic-name').textContent = `Topic: ${topicName}`;
    document.getElementById('score').textContent = `${score}/${totalQuestions}`;

    const percentage = (parseInt(score) / parseInt(totalQuestions)) * 100;
    const scoreText = document.getElementById('score-text');
    const levelEl = document.getElementById('level');

    if (percentage === 100) {
        scoreText.textContent = "🎉 Perfect Score! You're a genius!";
        levelEl.textContent = "Level: Mastermind";
        confetti(); // Trigger confetti animation
    } else if (percentage >= 80) {
        scoreText.textContent = "Excellent Job!";
        levelEl.textContent = "Level: Advanced";
    } else if (percentage >= 60) {
        scoreText.textContent = "Good Effort!";
        levelEl.textContent = "Level: Intermediate";
    } else {
        scoreText.textContent = "Keep Practicing!";
        levelEl.textContent = "Level: Beginner";
    }

    // Save High Score
    const highScore = localStorage.getItem('highScore') || 0;
    if (parseInt(score) > parseInt(highScore)) {
        localStorage.setItem('highScore', score);
        alert(`🏆 New High Score: ${score}!`);
    }
}

document.getElementById('restart-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'quiz.html';
});

document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.getElementById('share-btn').addEventListener('click', () => {
    const shareText = `I scored ${score}/${totalQuestions} in ${topicName} on QuizWeb! Try it now: https://quizweb.com`;
    navigator.clipboard.writeText(shareText).then(() => {
        alert("📤 Score copied! Share with friends!");
    });
});

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function confetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
