// ---------------------------------------------------
// GLOBAL CONSTANTS & VARIABLES
// ---------------------------------------------------
const wordBank = [
    "aladdin", "alice", "ariel", "aurora", "baloo", "bambi", "belle", "bert", "cinderella", "cruella", "dumbo", "esmeralda", "gaston", "genie", "jafar", "lumiere", "mulan", "pocahontas", "pinocchio", "scar", "sebastian", "tarzan", "timon", "quasimodo", "woody", "ursula"
]

const validGuesses = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

const waitLength = 2000;
// ---------------------------------------------------
// FUNCTIONS
// ---------------------------------------------------

// Start a new round
function newRound() {
    scoreboard.answerWord = pickNewWord();
    scoreboard.currentWord = writeBlanks(scoreboard.answerWord);
    scoreboard.wrongGuesses = "";
    scoreboard.guessesLeft = 9;
    updatePage();
}

//      Pick a random word from word bank with each new round
function pickNewWord() {
    var randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

//      Make appropriate number of blanks with each new round
function writeBlanks(word) {
    var blanks = ""
    for (var i = 0; i < word.length; i++) {
        blanks += "__ ";
    }
    return blanks;
}

// Take guess and modify scoreboard
function processGuess(guess) {
    var answer = scoreboard.answerWord;
    if (answer.includes(guess)) {
        var count = getCount(guess, answer);
        scoreboard.currentWord = updateWord(guess, count, answer);
    } else {
        scoreboard.wrongGuesses += guess.toUpperCase() + "   ";
        scoreboard.guessesLeft--;
    }
}

//      Count how many times guessed letter is in answer
function getCount(guess, answer) {
    var count = 0;
    var pos = answer.indexOf(guess);
    while (pos !== -1) {
        count++;
        pos = answer.indexOf(guess, pos + 1);
    }
    return count;
}

//      Replace blanks with correct guess, looping if there's more than one occurrence
function updateWord(guess, count, answer) {
    var fromIndex = 0;
    var newWord = scoreboard.currentWord;
    for (var i = 0; i < count; i++) {
        var pos = answer.indexOf(guess, fromIndex);
        newWord = newWord.slice(0, pos * 3) + guess.toUpperCase() + "  " + newWord.slice(pos * 3 + 3, newWord.length);
        fromIndex += pos + 1;
    }
    return newWord;
}

// Update page with new stats
function updatePage() {
    console.log("update page was called");
    document.querySelector("#word-text").innerHTML = scoreboard.currentWord;
    document.querySelector("#wrong-guesses-text").innerHTML = scoreboard.wrongGuesses;
    document.querySelector("#guesses-left-text").innerHTML = scoreboard.guessesLeft;
    document.querySelector("#win-counter-text").innerHTML = scoreboard.wins;
    document.querySelector("#loss-counter-text").innerHTML = scoreboard.losses;
    removeAlert()
    logScoreboard(); // test
    console.log("update page finished");
}

//      Console log the current game stats
function logScoreboard() {
    console.log("----- CURRENT GAME ------")
    for (var i in scoreboard) {
        if (typeof scoreboard[i] != "function") {
            console.log(i + ": " + scoreboard[i])
        }
    }
    console.log("-------------------------")
}

// Check whether game has entered win or loss condition
function checkWinLoss() {
    console.log("checkWinLoss was called");
    if (scoreboard.guessesLeft <= 0) {
        scoreboard.lose();
        displayResult(false);
        setTimeout(newRound, waitLength);
    } else if (!scoreboard.currentWord.includes("_")) {
        scoreboard.win();
        displayResult(true);
        setTimeout(newRound, waitLength);
    }

}

function removeAlert() {
    var alert = document.getElementsByClassName("alert")[0]
    if (alert) alert.remove()
}

function displayResult(won) {
    var newDiv = document.createElement("div");
    if (won) {
        newDiv.innerHTML = "Yay, you won!";
        newDiv.setAttribute("class", "alert alert-success");
    } else {
        newDiv.innerHTML = "Sorry, you lose. Try again!";
        newDiv.setAttribute("class", "alert alert-danger");
    }
    document.getElementsByClassName("container")[0].appendChild(newDiv);
}

// ---------------------------------------------------
// OBJECTS
// ---------------------------------------------------

var scoreboard = {
    currentWord: "",
    wrongGuesses: "",
    guessesLeft: 9,
    wins: 0,
    losses: 0,
    answerWord: "",
    win: function() { this.wins++ },
    lose: function() { this.losses++ },
}


// ---------------------------------------------------
// CALLS
// ---------------------------------------------------

newRound();
document.addEventListener("keyup", function(event) {
    var userGuess = event.key.toLowerCase();
    console.log("Key Pressed: " + userGuess);
    if (validGuesses.includes(userGuess)) {
        processGuess(userGuess);
        updatePage();
        checkWinLoss();
    }
})



// ---------------------------------------------------
// ADD THESE LATER
// ---------------------------------------------------
// Songs
// Names with spaces