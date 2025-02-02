
const username = localStorage.getItem("quizUsername") || "Player";
document.getElementById("displayUsername").textContent = username;

// Global variables
let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let progress = 0;

// DOM Elements
const elements = {
    question: document.getElementById('question'),
    options: document.getElementById('options'),
    nextBtn: document.getElementById('next-btn'),
    progress: document.getElementById('progress'),
    questionContainer: document.getElementById('question-container'),
    quizContainer: document.querySelector('.quiz-container'),
    time: document.getElementById('time'),
    loading: document.getElementById('loading'),
    scoreResult: document.getElementById('score-result'),
    totalScore: document.getElementById('total-score'),
    restartBtn: document.getElementById('restart-btn'),
    currentQuestionElement: document.getElementById('current-question'),
    totalQuestionsElement: document.getElementById('total-questions')
};

// Timer functions
function startTimer() {
    if (!elements.time) return;
    
    timer = setInterval(() => {
        timeLeft--;
        elements.time.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (elements.nextBtn) {
                elements.nextBtn.style.display = 'block';
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    if (elements.time) {
        elements.time.textContent = timeLeft;
    }
    startTimer();
}

// Load Question
function loadQuestion() {
    resetTimer();

    if (currentQuestion < questions.length && elements.question && elements.options) {
        const question = questions[currentQuestion];
        elements.question.textContent = question.question;
        elements.options.innerHTML = '';

        // Safely update question counter
        if (elements.currentQuestionElement && elements.totalQuestionsElement) {
            elements.currentQuestionElement.textContent = currentQuestion + 1;
            elements.totalQuestionsElement.textContent = questions.length;
        }

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option');
            button.dataset.index = index;
            button.onclick = (e) => checkAnswer(e);
            elements.options.appendChild(button);
        });

        if (elements.questionContainer) {
            elements.questionContainer.style.display = 'block';
        }

        updateProgress();
    } else {
        displayResults();
    }
}

// Fetch Questions from API
async function fetchQuestions() {
    try {
        if (elements.loading) {
            elements.loading.style.display = 'block';
        }

        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const apiUrl = 'https://api.jsonserve.com/Uw5CrX';

        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.questions || !Array.isArray(data.questions)) {
            throw new Error('Invalid API response format');
        }

        questions = data.questions
            .map(q => {
                if (!q.description || !q.options) {
                    console.warn('Invalid question format:', q);
                    return null;
                }

                return {
                    question: q.description,
                    options: q.options.map(option => option.description),
                    correct: q.options.findIndex(option => option.is_correct)
                };
            })
            .filter(q => q !== null);

        if (questions.length === 0) {
            throw new Error('No valid questions found');
        }

        if (elements.loading) {
            elements.loading.style.display = 'none';
        }
        if (elements.quizContainer) {
            elements.quizContainer.style.display = 'block';
        }

        // Safely update total questions before loading first question
        if (elements.totalQuestionsElement) {
            elements.totalQuestionsElement.textContent = questions.length;
        }

        loadQuestion();

    } catch (error) {
        console.error('Error fetching questions:', error);
        if (elements.loading) {
            elements.loading.textContent = 'Failed to load quiz. Please try again.';
        }
    }
}

function updateProgress() {
    if (!elements.progress) return;
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    elements.progress.style.width = `${progressPercentage}%`;
}

function checkAnswer(event) {
    const selectedOption = event.target;
    const question = questions[currentQuestion];
    const selectedAnswer = parseInt(selectedOption.dataset.index);
    const isCorrect = selectedAnswer === question.correct;

    selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');
    
    if (!isCorrect && elements.options) {
        const correctOption = elements.options.children[question.correct];
        if (correctOption) {
            correctOption.classList.add('correct');
        }
    }

    disableOptions();

    if (isCorrect) {
        score++;
    }

    if (elements.nextBtn) {
        elements.nextBtn.style.display = 'block';
    }
    updateProgress();
}

function disableOptions() {
    if (!elements.options) return;
    const options = elements.options.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.add('disabled');
    });
}

function displayResults() {
    // Store the score and total questions in localStorage
    localStorage.setItem('score', score);  // Add the score value
    localStorage.setItem('totalQuestions', questions.length);  // Add the total questions value
    
    // Navigate to the results page
    window.location.href = 'result.html';
}
// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements after DOM is loaded
    Object.keys(elements).forEach(key => {
        if (!elements[key]) {
            console.warn(`Element "${key}" not found in the DOM`);
        }
    });

    // Initialize next button event listener
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', () => {
            elements.nextBtn.style.display = 'none';
            currentQuestion++;
            loadQuestion();
        });
    }

    // Initialize restart button event listener
    if (elements.restartBtn) {
        elements.restartBtn.addEventListener('click', () => {
            score = 0;
            currentQuestion = 0;
            resetTimer();
            if (elements.quizContainer) {
                elements.quizContainer.style.display = 'block';
            }
            loadQuestion();
        });
    }

    // Start the quiz
    fetchQuestions();
});