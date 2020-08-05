import { questions } from "./questions.js";
import { innerText, answerResult } from "./helpers.js";

const buttons = document.getElementsByTagName("button");
const answerButtons = document.getElementById("question-content");
const start = document.getElementById("start");
const div = document.querySelector("#test");
const questionNumber = document.getElementById("questionNumber");

let plus = 0;
let curAnswer = 0;

if (localStorage.value) {
  console.log(curAnswer);
  curAnswer = localStorage.value;
  console.log(curAnswer + "after");
}

let countAnswer = questions.length;

const check = (num) => {
  localStorage.setItem("start", "true");

  document.getElementById("carefully").style.display = "none";

  if (num == 0) {
    answerButtons.style.display = "block";
    start.style.display = "none";

    innerText("question", questions[curAnswer][0]);
    innerText("option1", questions[curAnswer][1]);
    innerText("option2", questions[curAnswer][2]);
    innerText("option3", questions[curAnswer][3]);
    innerText("option4", questions[curAnswer][4]);
  } else {
    answerResult(questions[curAnswer], num);

    if (num == questions[curAnswer][5]) {
      plus++;
    }

    curAnswer++;

    if (curAnswer < countAnswer) {
      innerText("question", questions[curAnswer][0]);
      innerText("option1", questions[curAnswer][1]);
      innerText("option2", questions[curAnswer][2]);
      innerText("option3", questions[curAnswer][3]);
      innerText("option4", questions[curAnswer][4]);
    } else {
      answerButtons.style.display = "none";
      innerText("question", "");
      div.style.display = "block";
      const percent = Math.round((plus / countAnswer) * 100);

      innerText(
        "result",
        `
                <span>Correct Answer ${plus} / ${countAnswer}</span>
                <hr>
                <b>${percent} %</b>
            `
      );
      localStorage.clear();
    }
  }
};

if (localStorage.start === "true") {
  answerButtons.style.display = "block";
  start.style.display = "none";
  check(localStorage.getItem("value"));
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", (e) => {
    localStorage.setItem("value", curAnswer);

    const value = e.target.value;
    check(value);
  });
}
