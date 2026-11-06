const questions = [
  {
    question: "What is the capital city of Kerala?",
    options: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
    answer: "Thiruvananthapuram",
  },
  {
    question: "Which Kerala city is known as the 'Queen of the Arabian Sea'?",
    options: ["Kozhikode", "Kollam", "Kannur", "Kochi"],
    answer: "Kochi",
  },
  {
    question: "Which is the longest river in Kerala?",
    options: ["Bharathapuzha", "Pamba", "Periyar", "Chaliyar"],
    answer: "Periyar",
  },
  {
    question: "The famous Nehru Trophy Boat Race is held on which lake?",
    options: [
      "Punnamada Lake",
      "Ashtamudi Lake",
      "Sasthamkotta Lake",
      "Vellayani Lake",
    ],
    answer: "Punnamada Lake",
  },
  {
    question: "Which is the highest peak in Kerala?",
    options: ["Meesapulimala", "Anamudi", "Chembra Peak", "Agasthyamala"],
    answer: "Anamudi",
  },
  {
    question: "Which classical dance form originated in Kerala?",
    options: ["Kathakali", "Kuchipudi", "Bharatanatyam", "Odissi"],
    answer: "Kathakali",
  },
  {
    question: "On which date was the state of Kerala formed?",
    options: [
      "15 August 1947",
      "26 January 1950",
      "1 November 1956",
      "2 October 1960",
    ],
    answer: "1 November 1956",
  },
  {
    question: "Which bird is the state bird of Kerala?",
    options: [
      "Indian Peafowl",
      "Great Hornbill",
      "Common Kingfisher",
      "Indian Roller",
    ],
    answer: "Great Hornbill",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const progressDisplay = document.getElementById("progress");
const liveScoreDisplay = document.getElementById("live-score");
const scoreDisplay = document.getElementById("score-display");
const progressFill = document.getElementById("progress-fill");

function renderQuestion() {
  quizContainer.replaceChildren();
  scoreDisplay.replaceChildren();

  const currentQuestion = questions[currentQuestionIndex];
  progressDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  liveScoreDisplay.textContent = `Score: ${score}`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  const questionHeading = document.createElement("h2");
  questionHeading.classList.add("question-text");
  questionHeading.textContent = currentQuestion.question;
  quizContainer.appendChild(questionHeading);

  const optionsList = document.createElement("div");
  optionsList.classList.add("options-list");
  optionsList.setAttribute("role", "group");
  optionsList.setAttribute("aria-label", "Answer options");

  currentQuestion.options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.classList.add("option-button");
    optionButton.textContent = option;
    optionButton.addEventListener("click", () =>
      handleAnswer(option, optionsList),
    );
    optionsList.appendChild(optionButton);
  });

  quizContainer.appendChild(optionsList);

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.classList.add("action-button");
  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "Show Result"
      : "Next Question";
  nextButton.disabled = true;
  nextButton.addEventListener("click", nextQuestion);
  quizContainer.appendChild(nextButton);
}

function handleAnswer(selectedAnswer, optionsList) {
  const currentQuestion = questions[currentQuestionIndex];
  const optionButtons = optionsList.querySelectorAll(".option-button");

  optionButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === currentQuestion.answer) {
      button.classList.add("correct");
    }
    if (
      button.textContent === selectedAnswer &&
      selectedAnswer !== currentQuestion.answer
    ) {
      button.classList.add("wrong");
    }
  });

  if (selectedAnswer === currentQuestion.answer) {
    score += 1;
    liveScoreDisplay.textContent = `Score: ${score}`;
  }

  const nextButton = quizContainer.querySelector(".action-button");
  nextButton.disabled = false;
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.replaceChildren();
  progressDisplay.textContent = "Quiz complete";
  liveScoreDisplay.textContent = "";
  progressFill.style.width = "100%";

  let feedbackMessage;
  if (score === questions.length) {
    feedbackMessage = "Perfect! You know Kerala very well!";
  } else if (score >= 6) {
    feedbackMessage = "Great job! You know a lot about Kerala.";
  } else if (score >= 4) {
    feedbackMessage = "Good effort, keep exploring Kerala.";
  } else {
    feedbackMessage = "Time to learn more about God's Own Country!";
  }

  const resultText = document.createElement("p");
  resultText.classList.add("result-message");
  resultText.textContent = `You scored ${score} out of ${questions.length} — ${feedbackMessage}`;
  scoreDisplay.replaceChildren(resultText);

  const restartButton = document.createElement("button");
  restartButton.type = "button";
  restartButton.classList.add("action-button", "restart-button");
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener("click", restartQuiz);
  scoreDisplay.appendChild(restartButton);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  renderQuestion();
}

renderQuestion();
