const questions = [
  {
    question: "which is the largest animal in the world?",
    answers: [
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
    ],
  },
  {
    question: "which is the largest bird in the world?",
    answers: [
      { text: "Ostrich", correct: false },
      { text: "Eagle", correct: false },
      { text: "Emu", correct: false },
      { text: "Albatross", correct: true },
    ],
  },
  {
    question: "which is the largest mammal in the world?",
    answers: [
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
    ],
  },
  {
    question: "which is the largest reptile in the world?",
    answers: [
      { text: "Saltwater Crocodile", correct: true },
      { text: "Green Anaconda", correct: false },
      { text: "King Cobra", correct: false },
      { text: "Komodo Dragon", correct: false },
    ],
  },
  {
    question: "which is the largest fish in the world?",
    answers: [
      { text: "Whale Shark", correct: true },
      { text: "Great White Shark", correct: false },
      { text: "Tiger Shark", correct: false },
      { text: "Hammerhead Shark", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionno = currentQuestionIndex + 1;
  questionElement.innerHTML = questionno + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const iscorrect = selectedButton.dataset.correct === "true";
  if (iscorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = "Your Score is " + score + " out of " + questions.length;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
