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
 /* Function to load questions  */
function loadQuestion(category) {
    const available = questions[category].filter((_,i) => !usedQuestions[category].includes(i));
    if (available.length === 0) return;
    const randIndex = Math.floor(Math.random() * available.length);
    currentQuestion = available[randIndex];
    const realIndex = questions[category].push(realIndex);
}

loadCategories();