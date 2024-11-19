const questions = require('./questions.json').questions;
let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    console.clear();
    console.log('\n=== Quiz Game ===');
    console.log(`Question ${currentQuestion + 1} of ${questions.length}`);
    console.log(`Current Score: ${score}\n`);
    
    console.log(questions[currentQuestion].question);
    questions[currentQuestion].options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
    });
    
    console.log('\nEnter your answer (1-4): ');
}

function handleAnswer(answer) {
    const answerIndex = parseInt(answer) - 1;
    //console.log(questions[currentQuestion].correctAnswer);
    if (questions[currentQuestion].options[answerIndex] === questions[currentQuestion].correctAnswer) {
        console.log('\nCorrect!');
        score++;
    } else {
        console.log('\nIncorrect!');
        console.log(`The correct answer was: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`);
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        console.log('\nPress Enter for next question...');
        displayQuestion();
    } else {
        endGame();
        process.exit();
    }
}

function endGame() {
    console.clear();
    console.log('\n=== Game Over ===');
    console.log(`Final Score: ${score}/${questions.length}`);
    console.log(`Percentage: ${((score / questions.length) * 100).toFixed(2)}%`);
}

console.log('Welcome to the Quiz Game!');
console.log('Press Enter to start...');


process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
    const input = data.trim();
    
    if (currentQuestion < questions.length) {
        if (input >= 1 && input <= 4) {
            handleAnswer(input);
        } else {
            console.log('Please enter a number between 1 and 4');
            displayQuestion();
        }
    }
});

displayQuestion();