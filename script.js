// Select difficulty buttons
let easyQuizEl = document.getElementById("easyQuiz");
let mediumQuizEl = document.getElementById("mediumQuiz");
let hardQuizEl = document.getElementById("hardQuiz");

// UI sections
let startBtn = document.getElementById("startBtn");
let questionBox = document.getElementById("questionCont");
let firstScreen = document.getElementById("firstPage");
let resultBox = document.getElementById("resultCont");

// Question elements
let questionText = document.getElementById("questionText");
let questionNumber = document.getElementById("questionNumber");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");

// Result and Timer
let scoreText = document.getElementById("score");
let percentText = document.getElementById("percent");
let difficultyResult = document.getElementById("difficultyResult");
let timerText = document.getElementById("timer");
let progressBar = document.getElementById("progressBar");

// Inputs & Buttons
let nameInput = document.getElementById("nameInput");
let saveBtn = document.getElementById("saveBtn");
let playAgainBtn = document.getElementById("playAgainBtn");
let viewScoresBtn = document.getElementById("viewScoresBtn");
let difficultyLabel = document.getElementById("difficultyLabel");

// Variables to store quiz state
let selectedDifficulty = "easy";
let score = 0;
let questionIndex = 0;
let timer;
let timeLeft = 90;

// Questions for each level
let questions = {
  easy: [
    { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Markdown Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], answer: 'Hyper Text Markup Language' },
    { question: 'Which tag is used to display a heading in HTML?', options: ['<p>', '<head>', '<h1>', '<div>'], answer: '<h1>' },
    { question: 'Which tag is used to create a hyperlink?', options: ['<a>', '<link>', '<href>', '<url>'], answer: '<a>' },
    { question: 'What tag is used for an unordered list?', options: ['<ul>', '<ol>', '<li>', '<list>'], answer: '<ul>' },
    { question: 'Which attribute sets the image source in HTML?', options: ['src', 'href', 'alt', 'link'], answer: 'src' },
  ],
  medium: [
    { question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], answer: 'Cascading Style Sheets' },
    { question: 'Which CSS property changes text color?', options: ['font-color', 'text-color', 'color', 'text-style'], answer: 'color' },
    { question: 'How do you select an element with class "btn"?', options: ['.btn', '#btn', '*btn', 'btn'], answer: '.btn' },
    { question: 'Which property is used to change background color?', options: ['bgcolor', 'color', 'background-color', 'background'], answer: 'background-color' },
    { question: 'Which unit is relative to the root element?', options: ['em', 'rem', '%', 'px'], answer: 'rem' },
  ],
  hard: [
    { question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 'push()' },
    { question: 'Which symbol is used for comments in JavaScript?', options: ['//', '<!-- -->', '#', '**'], answer: '//' },
    { question: 'How do you write a function in JavaScript?', options: ['function myFunc()', 'def myFunc()', 'fun: myFunc()', 'create function myFunc()'], answer: 'function myFunc()' },
    { question: 'How do you access an element by ID?', options: ['getElementById()', 'querySelectorAll()', 'getElement()', 'getElementByClass()'], answer: 'getElementById()' },
    { question: 'Which keyword is used to declare a constant?', options: ['let', 'var', 'const', 'define'], answer: 'const' },
  ]
};

// Difficulty selection with styling
easyQuizEl.addEventListener('click', function () {
  easyQuizEl.classList.add("scale-option", "shadow");
  mediumQuizEl.classList.remove('scale-option', "shadow");
  hardQuizEl.classList.remove('scale-option', "shadow");
  selectedDifficulty = "easy";
});

mediumQuizEl.addEventListener('click', function () {
  mediumQuizEl.classList.add("scale-option", "shadow");
  easyQuizEl.classList.remove('scale-option', "shadow");
  hardQuizEl.classList.remove('scale-option', "shadow");
  selectedDifficulty = "medium";
});

hardQuizEl.addEventListener('click', function () {
  hardQuizEl.classList.add("scale-option", "shadow");
  easyQuizEl.classList.remove('scale-option', "shadow");
  mediumQuizEl.classList.remove('scale-option', "shadow");
  selectedDifficulty = "hard";
});

// Start quiz
startBtn.addEventListener("click", function () {
  firstScreen.style.display = "none";
  questionBox.style.display = "block";
  difficultyLabel.textContent = selectedDifficulty.toUpperCase();
  score = 0;
  questionIndex = 0;
  timeLeft = 90;
  startTimer();
  showQuestion();
});

// Show question
function showQuestion() {
  let currentQ = questions[selectedDifficulty][questionIndex];
  questionNumber.textContent = "Question " + (questionIndex + 1) + " of 5";
  questionText.textContent = currentQ.question;

  let options = [option1, option2, option3, option4];

  for (let i = 0; i < options.length; i++) {
    options[i].textContent = currentQ.options[i];
    options[i].style.backgroundColor = "";
    options[i].disabled = false;

    options[i].onclick = function () {
      let selected = this.textContent;
      let correctAnswer = currentQ.answer;

      // Disable all buttons
      for (let j = 0; j < options.length; j++) {
        options[j].disabled = true;
        if (options[j].textContent === correctAnswer) {
          options[j].style.backgroundColor = "green";
        }
      }

      if (selected === correctAnswer) {
        this.style.backgroundColor = "green";
        score++;
      } else {
        this.style.backgroundColor = "red";
      }

      setTimeout(function () {
        questionIndex++;
        if (questionIndex < 5) {
          showQuestion();
        } else {
          clearInterval(timer);
          showResult();
        }
      }, 1000);
    };
  }

  progressBar.style.width = ((questionIndex + 1) / 5) * 100 + "%";
}

// Start timer
function startTimer() {
  updateTimer();
  timer = setInterval(function () {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

// Update timer display
function updateTimer() {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  if (sec < 10) {
    sec = "0" + sec;
  }
  timerText.textContent = "⏱ " + min + ":" + sec;
}

// Show result screen
function showResult() {
  questionBox.style.display = "none";
  resultBox.style.display = "block";
  scoreText.textContent = score;
  percentText.textContent = Math.round((score / 5) * 100) + "%";
  difficultyResult.textContent = "Difficulty: " + selectedDifficulty.toUpperCase();
}

// Save score to localStorage
saveBtn.addEventListener("click", function () {
  let name = nameInput.value;
  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  let savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
  savedScores.push({ name: name, score: score, difficulty: selectedDifficulty });
  localStorage.setItem("quizScores", JSON.stringify(savedScores));
  alert("Score saved successfully!");
});

// Reload the page to play again
playAgainBtn.addEventListener("click", function () {
  location.reload();
});

// View high scores
viewScoresBtn.addEventListener("click", function () {
  alert(score);
});
