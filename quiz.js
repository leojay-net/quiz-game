let questions;
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        document.getElementById('total-questions').textContent = questions.length;
        displayQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('time').textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === questions[currentQuestion].correctAnswer) {
            option.classList.add('correct');
        }
    });
    
    showFeedback("Time's up! Moving to next question...", false);
    document.getElementById('next-btn').style.display = 'block';
}

function displayQuestion() {
    if (!questions) return; // Wait for questions to load
    
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        optionsContainer.appendChild(button);
    });

    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    startTimer();
}

function showFeedback(message, isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    feedback.style.backgroundColor = isCorrect ? '#d4edda' : '#f8d7da';
    feedback.style.color = isCorrect ? '#155724' : '#721c24';
    feedback.textContent = message;
}

function handleAnswer(selectedAnswer) {
    clearInterval(timer);
    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    if (correct) {
        score++;
        document.getElementById('score').textContent = score;
    }

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === questions[currentQuestion].correctAnswer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedAnswer && !correct) {
            option.classList.add('incorrect');
        }
    });

    showFeedback(correct ? 'Correct!' : 'Incorrect!', correct);
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('question-text').style.display = 'none';
    document.getElementById('options-container').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    
    const results = document.getElementById('results');
    results.style.display = 'block';
    document.getElementById('final-score').textContent = `${score}/${questions.length}`;
    document.getElementById('percentage').textContent = ((score / questions.length) * 100).toFixed(2);
}

document.getElementById('next-btn').addEventListener('click', nextQuestion);