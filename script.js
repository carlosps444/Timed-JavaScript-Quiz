const questions = [
    {
        question: "Commonly used data types do not include:",
        choices: ["Booleans", "Alerts", "Strings", "Numbers"],
        correctAnswer: 0
    },
    {
        question: "The condition of an if/else statement is enclosed within ______.",
        choices: ["Quotes", "Curley Brackets", "Parentheses", "Square Brackets"],
        correctAnswer: 1
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        choices: ["Numbers and strings", "Other Arrays", "Booleans", "All of the above."],
        correctAnswer: 2
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["Quotes", "Curley Brackets", "Commas", "Parentheses"],
        correctAnswer: 0
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "console.log", "Terminal/bash", "For loops"],
        correctAnswer: 0
    },
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timerElement = document.getElementById("time");
const nextButton = document.getElementById("next-button");
const resultSection = document.getElementById("result");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-button");
const highscoresSection = document.getElementById("highscores");
const scoreList = document.getElementById("score-list");



let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let highscores = [];

function displayQuestion() {
    const currentQuizQuestion = questions[currentQuestion];
    questionElement.textContent = currentQuizQuestion.question;
    choicesElement.innerHTML = "";

    for (let i = 0; i < currentQuizQuestion.choices.length; i++) {
        const choice = currentQuizQuestion.choices[i];
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", () => checkAnswer(i));
        choicesElement.appendChild(li);
    }
}

function checkAnswer(selectedIndex) {
    const currentQuizQuestion = questions[currentQuestion];
    if (selectedIndex === currentQuizQuestion.correctAnswer) {
        score++;
    } else {

        timeLeft -= 10;
    }


    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionContainer.style.display = "none";
    resultSection.style.display = "block";
    scoreElement.textContent = score;
}

function updateTimer() {
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
    } else {
        timeLeft--;
    }
}



nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
});

saveButton.addEventListener("click", () => {
    const initials = initialsInput.value.toUpperCase();
    if (initials && score > 0) {
        const entry = { initials, score };
        highScores.push(entry);
        highScores.sort((a, b) => b.score - a.score);
        updateHighScores();
        initialsInput.value = "";
        resultSection.style.display = "none";
        highscoresSection.style.display = "block";

    }
});

function updateHighScores() {
    scoreList.innerHTML = "";
    highScores.slice(0, 10).forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = '${index + 1}. ${entry.initials} - ${entry.score}';
        scoreList.appendChild(li);
    });
}

const storedScores = localStorage.getItem("highScores");
if (storedScores) {
    highScores = JSON.parse(storedScores);
    updateHighScores();
}

timerInterval = setInterval(updateTimer, 1000);
updateTimer();