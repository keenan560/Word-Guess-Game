


// Array with the Game Words

var gameWords = "clinton washington obama jefferson lincoln bush adams truman roosevelt madison jackson monroe wilson reagan kennedy eisenhower mckinley polk trump johnson".split(" ");

// Code to grab Random Game Word

var randomWord = function(array) {
    return array[Math.floor(Math.random()*array.length)]
};

//Code to check if guess letter is correct

function isCorrectGuess(word, letter) {
    if (word.indexOf(letter) > -1) {
        return true;
    }
    return false;
}

// Code to generate "-" for Game Word
 
function getBlanks(word) {
    var array = [];
    for (var i = 0; i < word.length; i++) {
        array.push("_");
    }
    return array; 
}
// Code to fill in blanks with guesss

function fillBlanks(word, blanks,letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            blanks[i] = letter;
        }
    }
    return blanks;
}


// Game Management functions    

function setupRound(word) {
    var obj = {
        word:word,
        guessesLeft: 9,
        wrongGuesses:[],
        puzzleState: getBlanks(word),
    }
    return obj;
}

// Code to uodate round obj based on letter from User
function updateRound(setupRound,letter) {
    if (isCorrectGuess(setupRound.word, letter) === true) {
        setupRound.puzzleState = fillBlanks(setupRound.word, setupRound.puzzleState, letter);

    } else {
        setupRound.wrongGuesses.push(letter);
        setupRound.guessesLeft-=1;
    }
}


// Code to check to see if game is won

function hasWon(puzzleState) {
        for (var i = 0; i < puzzleState.length; i++) {
            if (puzzleState[i] === "_") {
                return false;
            }
        }
        return true;
}

// Code to check to see if game is lost
 function hasLost(guessesLeft) {
     if (guessesLeft === 0) {
         return true;
     }
     return false;
 }

 // Code to check if round is over

 function isEndOfRound(setupRound){
     if (hasWon(setupRound.puzzleState) || hasLost(setupRound.guessesLeft)){
         return true;
     }
     return false;
 } 

 // Code to set up an inital game, traks wins and losses;
 
 function setupGame(wordsInGame, wins, losses) {
     var game = {
         words: wordsInGame,
         wins: wins,
         losses: losses, 
         round: setupRound(randomWord(wordsInGame)),
     }
    return game;
 }

 // Code to start a new round 

 function startNewRound(game) {
     var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState)) {
        game.wins++;
        alert("You did it! It's President " + game.round.word);
    } else {
        game.losses++;
        alert("You are a disgrace to this country. It's President " + game.round.word);
    }
    return game;
 }

var myGame = setupGame(gameWords,0,0);

// ********* Code for the HTML Setup page ***********
var x = document.getElementById("theme-music");
function playAudio() {
    x.play();
}

document.getElementById("puzzle-state").innerHTML = (myGame.round.puzzleState.join(' '))

document.getElementById("wrong-guesses").innerHTML = "Wrong Guesses: " + myGame.round.wrongGuesses;

document.getElementById("guesses-left").innerHTML =  "Guesses Left: " + myGame.round.guessesLeft; 

document.getElementById("win-counter").innerHTML =  "Wins: " + myGame.wins;

document.getElementById("loss-counter").innerHTML = "Losses: " + myGame.losses;

    //******Code to Make Page Work *********


  
document.onkeyup = function(event) {
    playAudio();
    var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
    if (isEndOfRound(myGame.round) === false) {
        updateRound(myGame.round, keyPressed);
        document.getElementById("puzzle-state").innerHTML = myGame.round.puzzleState.join(' ');
        document.getElementById("wrong-guesses").innerHTML = "Wrong Guesses: " + myGame.round.wrongGuesses;
        document.getElementById("guesses-left").innerHTML = "Guesses Left: " + myGame.round.guessesLeft;
    } else {
         startNewRound(myGame); 
         document.getElementById("win-counter").innerHTML = "Wins: " + myGame.wins;
         document.getElementById("loss-counter").innerHTML = "Losses: " + myGame.losses;
         reset();
    }
}

//****** Code to Reset the Game ********
function reset() {
    myGame.round.guessesLeft = 0;
    hasLost(myGame.round.guessesLeft);
        if (isEndOfRound(myGame.round)) {
            myGame = startNewRound(myGame);
            myGame.round = setupRound(randomWord(gameWords));
        }
    updateHTML();
}; 


