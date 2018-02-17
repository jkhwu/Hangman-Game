// ---------------------------------------------------
// GLOBAL CONSTANTS & VARIABLES
// ---------------------------------------------------
const wordBank = [
    { name: "aladdin", song: "assets/sounds/Aladdin-05-OneJumpAhead-Reprise.wav", duration: 6000, image: "assets/images/aladdin.png" },
    // { name: "alice", song: "assets/sounds/ClassicDisneyVol5-19-InAWorldOfMyOwn.wav", duration: 8000, image: "assets/images/alice.png" },
    // { name: "ariel", song: "assets/sounds/ClassicDisneyVol2-03-PartOfYourWorld.wav", duration: 5000, image: "assets/images/ariel.png" },
    // { name: "aurora", song: "assets/sounds/ClassicDisneyVol3-17-OnceUponADream.wav", duration: 8000, image: "assets/images/aurora.png" },
    // { name: "baloo", song: "assets/sounds/ClassicDisneyVol2-11-TheBareNecessities.wav", duration: 5000, image: "assets/images/baloo.png" },
    // { name: "bambi", song: "assets/sounds/ClassicDisneyVol3-24-LittleAprilShower.wav", duration: 5000, image: "assets/images/bambi.png" },
    // { name: "belle", song: "assets/sounds/ClassicDisneyVol2-06-SomethingThere.wav", duration: 8000, image: "assets/images/belle.png" },
    // { name: "bert", song: "assets/sounds/ClassicDisneyVol1-09-ChimChimCheree.wav", duration: 7000, image: "assets/images/bert.png" },
    // { name: "cinderella", song: "assets/sounds/ClassicDisneyVol1-20-ADreamIsAWishYourHeartMake.wav", duration: 8000, image: "assets/images/cinderella.png" },
    // { name: "cruella", song: "assets/sounds/ClassicDisneyVol5-08-CruellaDeVil.wav", duration: 9000, image: "assets/images/cruella.png" },
    // { name: "dumbo", song: "assets/sounds/ClassicDisneyVol5-24-WhenISeeAnElephantFly.wav", duration: 7000, image: "assets/images/dumbo.png" },
    // { name: "esmeralda", song: "assets/sounds/ClassicDisneyVol5-03-GodHelpTheOutcasts.wav", duration: 7000, image: "assets/images/esmeralda.png" },
    // { name: "gaston", song: "assets/sounds/ClassicDisneyVol2-05-Gaston.wav", duration: 5000, image: "assets/images/gaston.png" },
    // { name: "jafar", song: "assets/sounds/Aladdin-11-PrinceAli-Reprise.wav", duration: 5000, image: "assets/images/jafar.png" },
    // { name: "jasmine", song: "assets/sounds/Aladdin-09-AWholeNewWorld.wav", duration: 7000, image: "assets/images/jasmine.png" },
    // { name: "lumiere", song: "assets/sounds/ClassicDisneyVol2-01-BeOurGuest.wav", duration: 7000, image: "assets/images/lumiere.png" },
    // { name: "mulan", song: "assets/sounds/Mulan-02-Reflection.wav", duration: 10000, image: "assets/images/mulan.png" },
    // { name: "pocahontas", song: "assets/sounds/ClassicDisneyVol3-01-ColorsOfTheWind.wav", duration: 8000, image: "assets/images/pocahontas.png" },
    // { name: "pinocchio", song: "assets/sounds/ClassicDisneyVol5-25-IveGotNoStrings.wav", duration: 5000, image: "assets/images/pinocchio.png" },
    // { name: "scar", song: "assets/sounds/ClassicDisneyVol3-03-BePrepared.wav", duration: 3000, image: "assets/images/scar.png" },
    // { name: "sebastian", song: "assets/sounds/ClassicDisneyVol1-04-UnderTheSea.wav", duration: 9000, image: "assets/images/sebastian.png" },
    // { name: "tarzan", song: "assets/sounds/Tarzan-03-SonofMan.wav", duration: 7000, image: "assets/images/tarzan.png" },
    // { name: "timon", song: "assets/sounds/ClassicDisneyVol1-05-HakunaMatata.wav", duration: 6000, image: "assets/images/timon.png" },
    // { name: "quasimodo", song: "assets/sounds/ClassicDisneyVol3-04-OutThere.wav", duration: 6000, image: "assets/images/quasi.png" },
    // { name: "woody", song: "assets/sounds/ClassicDisneyVol3-02-YouveGotAFriendInMe.wav", duration: 4000, image: "assets/images/woody.png" },
    // { name: "ursula", song: "assets/sounds/ClassicDisneyVol1-08-PoorUnfortunateSouls.wav", duration: 7000, image: "assets/images/ursula.png" }
    // {name: "", song: "assets/sounds/"},
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
    scoreboard.answerIndex = Math.floor(Math.random() * wordBank.length);
    scoreboard.songLength = wordBank[scoreboard.answerIndex].duration;
    return wordBank[scoreboard.answerIndex].name;
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
    document.querySelector("#word-text").innerHTML = scoreboard.currentWord;
    document.querySelector("#wrong-guesses-text").innerHTML = scoreboard.wrongGuesses;
    document.querySelector("#guesses-left-text").innerHTML = scoreboard.guessesLeft;
    document.querySelector("#win-counter-text").innerHTML = scoreboard.wins;
    document.querySelector("#loss-counter-text").innerHTML = scoreboard.losses;
    removeAlert()
    logScoreboard(); // test
}

//      Log the current game stats to console
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
    if (scoreboard.guessesLeft <= 0) {
        scoreboard.lose();
        displayResult(false);
        setTimeout(newRound, waitLength);
    } else if (!scoreboard.currentWord.includes("_")) {
        scoreboard.win();
        displayResult(true);
        playSong();
        setTimeout(newRound, scoreboard.songLength);
    }
}

//      Bootstrap alert with win or loss notification
function displayResult(won) {
    var newDiv = document.createElement("div");
    if (won) {
        newDiv.innerHTML = "<p>Yay, you won!</p> <img class='img-thumbnail' src=" + wordBank[scoreboard.answerIndex].image +
            " alt='character-image'>";
        newDiv.setAttribute("class", "alert alert-success fade show");
    } else {
        newDiv.innerHTML = "Sorry, you lose. Try again!";
        newDiv.setAttribute("class", "alert alert-danger");
    }
    document.getElementsByClassName("jumbotron")[0].prepend(newDiv);
}

//      Remove existing alert
function removeAlert() {
    var alert = document.getElementsByClassName("alert")[0];
    if (alert) alert.remove();
}

//      Play song
function playSong() {
    var song = new Audio(wordBank[scoreboard.answerIndex].song);
    song.play();
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
    songLength: 0,
    answerIndex: -1,
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