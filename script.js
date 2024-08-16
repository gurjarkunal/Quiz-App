const users = JSON.parse(localStorage.getItem("users")) || [];
const questions = JSON.parse(localStorage.getItem("questions")) || [];
let currUser = null;
const answersMarked = [];
let score = 0;

function showSignup() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("register").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("register").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function signup() {
  const username = document.getElementById("signup_username").value;
  const password = document.getElementById("signup_password").value;

  if (username && password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = false;

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        userExists = true;
        break; // Stop the loop once a match is found
      }
    }

    if (userExists) {
      alert("Username already exists!");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign up successful!");
    showLogin();
  } else {
    alert("Please enter both username and password.");
  }
}
function login() {
  const username = document.getElementById("login_username").value;
  const password = document.getElementById("login_password").value;
  console.log(username, password);

  if (username && password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        user = users[i];
        break; // Stop the loop once a match is found
      }
    }
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      showCreateQuiz();
    } else {
      alert("Invalid username or password.");
    }
  } else {
    alert("Please enter both username and password.");
  }
}
function showCreateQuiz() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("createQuiz").classList.remove("hidden");
}

document
  .getElementById("quizForm1")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const question = document.getElementById("question").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const answer = document.getElementById("answer").value;
    console.log(question, option1, option2, option3, answer);

    if (question && option1 && option2 && option3 && answer) {
      questions.push({ question, option1, option2, option3, answer });
      localStorage.setItem("questions", JSON.stringify(questions));
    } else {
      alert("Please enter all the fields.");
    }
    document.getElementById("quizForm1").reset();
  });

function showQuestions() {
  document.getElementById("createQuiz").classList.add("hidden");
  document.getElementById("viewQuestions").classList.remove("hidden");
  viewQuestions();
}


function viewQuestions() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    document.getElementById("questions").innerHTML += `<h2>Question${i + 1}:- ${
      question.question
    } </h2><li>${question.option1}</li><li>${question.option2}</li><li>${
      question.option3
    }</li>`;
  }
}

function startQuiz() {
  document.getElementById("viewQuestions").classList.add("hidden");
  document.getElementById("startQuiz").classList.remove("hidden");
  takeQuiz();
}

function takeQuiz() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    document.getElementById(
      "quiz_questions"
    ).innerHTML += `<h1>${question.question}</h1>
    <div>
    <input value=${question.option1} type="radio" name="answer${i}">${question.option1}</input>
    <input value=${question.option2} type="radio" name="answer${i}">${question.option2}</input>
    <input value=${question.option3} type="radio" name="answer${i}">${question.option3}</input>
    </div>`;
  }
  document.getElementById("quiz_questions").innerHTML += `<button onclick="getAnswers()">Submit</button>`
}

function getAnswers(){
  for (let i = 0; i < questions.length; i++) {
  answersMarked.push(document.querySelector(`input[name="answer${i}"]:checked`).value)
  console.log(answersMarked)
  }
  for (let i = 0; i < questions.length; i++) {
    if(answersMarked[i] === questions[i].answer){
      score++
    }
  }
  console.log(score);
  showScore();
}

function showScore(){
  document.getElementById("startQuiz").classList.add("hidden");
  document.getElementById("score").classList.remove("hidden");
  document.getElementById("score").innerHTML = `Your score is ${score} out of ${questions.length}`
}


// takeQuiz();
