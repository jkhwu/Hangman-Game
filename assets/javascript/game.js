// TESTING
alert("i'm working");


// GLOBAL VARIABLES
var scoreboard = {
    wins: 0,
    losses: 0,
    wordToGuess: [],
    answer: [],

}

var validGuesses = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

// FUNCTIONS

function updatePage() {
    document.querySelector("#word-text").innerHTML = "scoreboard.wordToGuess";
    document.querySelector("#wrong-guesses-text").innerHTML = "test2";
    document.querySelector("#guesses-left-text").innerHTML = "test3";
    document.querySelector("#win-counter-text").innerHTML = "test4";
    document.querySelector("#loss-counter-text").innerHTML = "test5";
}

// OBJECTS
document.addEventListener("keyup", function(event) {
    alert(event.key);
})


// CALLS (EVENT LISTENERS)