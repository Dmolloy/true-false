const questions = {
for (let cat in questions) {
if (usedQuestions[cat].length < questions[cat].length) {
let btn = document.createElement("button");
btn.innerText = cat;
btn.className = "category-btn";
btn.onclick = () => loadQuestion(cat);
catDiv.appendChild(btn);
}
}
}


function loadQuestion(category) {
const available = questions[category].filter((_, i) => !usedQuestions[category].includes(i));
if (available.length === 0) return;
const randIndex = Math.floor(Math.random() * available.length);
currentQuestion = available[randIndex];
const realIndex = questions[category].indexOf(currentQuestion);
usedQuestions[category].push(realIndex);


document.getElementById("question").innerText = currentQuestion.q;
document.getElementById("answers").style.display = "block";
document.getElementById("categorySelection").innerHTML = "";
document.getElementById("feedback").innerText = "";
document.getElementById("feedback").className = "";
}


function submitAnswer(answer) {
if (currentQuestion) {
if (answer === currentQuestion.a) {
score++;
document.getElementById("feedback").innerText = "Correct!";
document.getElementById("feedback").className = "correct";
} else {
document.getElementById("feedback").innerText = `Incorrect! The correct answer was ${currentQuestion.a ? 'True' : 'False'}.`;
document.getElementById("feedback").className = "incorrect";
}
}
answeredCount++;
document.getElementById("score").innerText = "Score: " + score;


if (answeredCount === totalQuestions) {
setTimeout(endGame, 1500);
} else {
setTimeout(() => {
document.getElementById("answers").style.display = "none";
document.getElementById("question").innerText = "";
document.getElementById("feedback").innerText = "";
document.getElementById("feedback").className = "";
loadCategories();
}, 1500);
}
}


function endGame() {
document.getElementById("question").innerText = "";
document.getElementById("answers").style.display = "none";
document.getElementById("categorySelection").innerHTML = "";
document.getElementById("feedback").innerText = "";
document.getElementById("feedback").className = "";
document.getElementById("finalMessage").innerText = `All questions answered! Final Score: ${score}/${totalQuestions}`;
document.getElementById("resetBtn").style.display = "inline-block";
}


function resetGame() {
score = 0;
answeredCount = 0;
usedQuestions = { History: [], Science: [], Music: [], Geography: [] };
currentQuestion = null;
document.getElementById("score").innerText = "Score: 0";
document.getElementById("finalMessage").innerText = "";
document.getElementById("resetBtn").style.display = "none";
document.getElementById("feedback").innerText = "";
document.getElementById("feedback").className = "";
loadCategories();
}


// Start game
loadCategories();