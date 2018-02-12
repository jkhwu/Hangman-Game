// GLOBAL CONSTANTS & VARIABLES
const wordBank = [
    "aladdin", "alice", "ariel", "aurora", "baloo", "bambi", "belle", "bert", "cinderella", "cruella", "dumbo", "esmeralda", "gaston", "genie", "jafar", "lumiere", "mulan", "pocahontas", "pinocchio", "scar", "sebastian", "tarzan", "timon", "quasimodo", "woody", "ursula"
]

const validGuesses = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

// FUNCTIONS
function newRound() {
    scoreboard.answerWord = pickNewWord();
    scoreboard.currentWord = writeBlanks(scoreboard.answerWord);
    scoreboard.wrongGuesses = "";
    scoreboard.guessesLeft = 9;
    updatePage();
}

function pickNewWord() {
    var randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

function writeBlanks(word) {
    var blanks = ""
    for (var i = 0; i < word.length; i++) {
        blanks += "__ ";
    }
    return blanks;
}

function processGuess(guess) {
    if (answerWord.includes(guess)) {

    }

}

function updatePage() {
    document.querySelector("#word-text").innerHTML = scoreboard.currentWord;
    document.querySelector("#wrong-guesses-text").innerHTML = scoreboard.wrongGuesses;
    document.querySelector("#guesses-left-text").innerHTML = scoreboard.guessesLeft;
    document.querySelector("#win-counter-text").innerHTML = scoreboard.wins;
    document.querySelector("#loss-counter-text").innerHTML = scoreboard.losses;
    logScoreboard(); // test
}


function logScoreboard() {
    console.log("----- CURRENT GAME ------")
    for (var i in scoreboard) {
        if (typeof scoreboard[i] != "function") {
            console.log(i + ": " + scoreboard[i])
        }
    }
    console.log("-------------------------")
}

// OBJECTS
var scoreboard = {
    currentWord: "",
    wrongGuesses: "",
    guessesLeft: 9,
    wins: 0,
    losses: 0,
    answerWord: ""
}


// CALLS
alert("i'm working"); //test
newRound();

document.addEventListener("keyup", function(event) {
    var userGuess = event.key.toLowerCase();
    console.log("Key Pressed: " + userGuess);
    if (validGuesses.includes(userGuess)) {
        processGuess(userGuess);
        updatePage(scoreboard);
    }
})

// FEATURES TO ADD LATER
// Songs
// Names with spaces