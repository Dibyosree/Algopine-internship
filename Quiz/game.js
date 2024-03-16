const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-btn');
const endContainer = document.getElementById('end');
const finalScoreText = document.getElementById('final-score');
const replayButton = document.getElementById('replay-btn');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Sample questions data
questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choices: ['<script>', '<javascript>', '<js>', '<scripting>'],
        correctAnswerIndex: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
        correctAnswerIndex: 2
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
        correctAnswerIndex: 3
    }
];

// Function to load question
function loadQuestion(question) {
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';

    question.choices.forEach((choice, index) => {
        const choiceElement = document.createElement('button');
        choiceElement.textContent = choice;
        choiceElement.classList.add('choice');
        choiceElement.dataset.index = index;
        choiceElement.addEventListener('click', handleChoiceClick);
        choicesElement.appendChild(choiceElement);
    });
}

// Function to handle choice click
function handleChoiceClick(event) {
    const selectedChoiceIndex = event.target.dataset.index;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedChoiceIndex == currentQuestion.correctAnswerIndex) {
        score += 10;
        event.target.classList.add('correct');
    } else {
        event.target.classList.add('incorrect');
    }

    disableChoices();
    nextButton.classList.remove('hidden');
}

// Function to disable choices after selecting one
function disableChoices() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
        choice.disabled = true;
    });
}

// Function to enable choices for the next question
function enableChoices() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => {
        choice.disabled = false;
        choice.classList.remove('correct', 'incorrect');
    });
}

// Function to load next question
function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hidden');
        enableChoices();
    } else {
        endGame();
    }
}

// Function to end the game
function endGame() {
    document.getElementById('game').classList.add('hidden');
    endContainer.classList.remove('hidden');
    finalScoreText.textContent = score;
}

// Function to restart the game
function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion(questions[currentQuestionIndex]);
    document.getElementById('game').classList.remove('hidden');
    endContainer.classList.add('hidden');
}

// Event listener for the next button
nextButton.addEventListener('click', loadNextQuestion);

// Event listener for the replay button
replayButton.addEventListener('click', restartGame);

// Start the game
loadQuestion(questions[currentQuestionIndex]);
startGame();
