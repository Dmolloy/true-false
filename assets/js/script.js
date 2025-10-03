let score = 0;
let answeredCount = 0;
const totalQuestions = 20; /*4 categories × 5 questions each*/
let currentQuestion = null;

let usedQuestions = {
  History: [],
  Science: [],
  Music: [],
  Geography: []
};

const questions = {
    History: [
        {q: "The Great Wall of China was built during the Ming Dynasty.", a: true},
        {q: "World War II ended in 1940.", a: false},
        {q: "The Roman Empire fell in 476 AD.", a: true},
        {q: "Napoleon was defeated at the Battle of Waterloo.", a: true},
        {q: "The Cold War was fought with direct battles between USA and USSR.", a: false}
    ],
    Science: [
        {q: "Water boils at 100°C at sea level.", a: true},
        {q: "Humans have three lungs.", a: false},
        {q: "The Earth revolves around the Sun.", a: true},
        {q: "Sound travels faster than light.", a: false},
        {q: "DNA is the molecule that carries genetic information.", a: true}
    ],
    Music: [
        {q: "Beethoven was deaf when he composed some of his music.", a: true},
        {q: "The guitar has six strings by default.", a: true},
        {q: "The Beatles were a band from the United States.", a: false},
        {q: "Freddie Mercury was the lead singer of Queen.", a: true},
        {q: "Mozart composed during the Baroque period.", a: false}
    ],
    Geography: [
        {q: "Mount Everest is the tallest mountain in the world.", a: true},
        {q: "The Amazon River is the longest river in the world.", a: false},
        {q: "Australia is both a country and a continent.", a: true},
        {q: "The Sahara Desert is located in South America.", a: false},
        {q: "Russia is the largest country by land area.", a: true}
    ]
};

/* Function to load category buttons */
function loadCategories() {
    const container = document.getElementById("categorySelection");
    container.innerHTML = "<h2>Select a Category:</h2>";

    Object.keys(questions).forEach(category => {
        if (usedQuestions[category].length < questions[category].length) {
            const btn = document.createElement("button");
            btn.className = `category-btn ${category.toLowerCase()}`;
            btn.innerText = category;
            btn.onclick = () => loadQuestion(category);
            container.appendChild(btn);
        }
    });
}

/* Function to load questions */
function loadQuestion(category) {
    const available = questions[category].filter((_, i) => !usedQuestions[category].includes(i));
    if (available.length === 0) return;

    const randIndex = Math.floor(Math.random() * available.length);
    currentQuestion = available[randIndex];
    const realIndex = questions[category].indexOf(currentQuestion);
    usedQuestions[category].push(realIndex);

    /* Show question and answers*/
    document.getElementById("question").innerText = currentQuestion.q;
    document.getElementById("answers").style.display = "block";
    document.getElementById("categorySelection").innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("feedback").className = "";

    /*Ensure buttons are enabled*/
    document.getElementById("trueBtn").disabled = false;
    document.getElementById("falseBtn").disabled = false;
    document.getElementById("trueBtn").classList.remove("correct", "incorrect");
    document.getElementById("falseBtn").classList.remove("correct", "incorrect");
}

/* Function to check the answer */
function submitAnswer(answer) {
    if (!currentQuestion) return;

    const trueBtn = document.getElementById("trueBtn");
    const falseBtn = document.getElementById("falseBtn");

    /*Disable buttons immediately*/
    trueBtn.disabled = true;
    falseBtn.disabled = true;

    if (answer === currentQuestion.a) {
        score++;
        document.getElementById("feedback").innerText = "Correct!";
        document.getElementById("feedback").className = "correct";
    } else {
        document.getElementById("feedback").innerText =
            `Incorrect! The correct answer was ${currentQuestion.a ? 'True' : 'False'}.`;
        document.getElementById("feedback").className = "incorrect";

        /*Highlight correct button*/
        if (currentQuestion.a) trueBtn.classList.add("correct");
        else falseBtn.classList.add("correct");
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

            trueBtn.disabled = false;
            falseBtn.disabled = false;
            trueBtn.classList.remove("correct", "incorrect");
            falseBtn.classList.remove("correct", "incorrect");

            currentQuestion = null;
            loadCategories();
        }, 1500);
    }
}

/* End game */
function endGame() {
    document.getElementById("question").innerText = "";
    document.getElementById("answers").style.display = "none";
    document.getElementById("categorySelection").innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("feedback").className = "";
    document.getElementById("score").innerText = `Final Score: ${score}/${totalQuestions}`;
    document.getElementById("resetBtn").style.display = "inline-block";
}

/* Reset game */
function resetGame() {
    score = 0;
    answeredCount = 0;
    usedQuestions = { History: [], Science: [], Music: [], Geography: [] };
    currentQuestion = null;

    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("feedback").innerText = "";
    document.getElementById("feedback").className = "";
    document.getElementById("resetBtn").style.display = "none";

    loadCategories();
}

/* Start the game */
loadCategories();
