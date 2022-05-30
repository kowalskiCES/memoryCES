// Sintaxis JQUERY: https://stackoverflow.com/questions/4069982/document-getelementbyid-vs-jquery
// document.getElementById('contents'); //returns a HTML DOM Object
// var contents = $('#contents');  //returns a jQuery Object
const ID_SEPARATOR = '_';
const CARDS = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
const INCORRECT_TIMEOUT = 500;
// number of movements to hide each star
var STARS_LEVEL = [15, 25, 35]; //[2, 4, 6];
var moves = 0;
var initTime = new Date();
var guessed = 0;
var startsCounter;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// generates LI items inside UL with board id. Shuffle them and create each card.
function createBoard() {
    let arr = shuffle(CARDS.concat(CARDS));
    arr = shuffle(arr);
    let board = document.getElementById('board');
    for (let i = 0; i < arr.length; i++) {
        board.innerHTML += createCard(i, arr[i]);
    }
}

// generates LI items inside UL with stars id.
var starsLocation = document.getElementById('stars');
function createStars() {
    for (let i = 0; i < STARS_LEVEL.length; i++) {
        starsLocation.innerHTML += createStar(i);
        ++startsCounter;
    }
}

// creates the LI for one star
function createStar(index) {
   return '<li><i class="fa fa-star" id="star' + index + '"></i></li>';
}

// init variables for a new game
function initCounters() {
    initTime = new Date();
    moves = 0;
    timer.innerHTML = formatSeconds(0);
    guessed = 0;
    startsCounter = 0;
}

// adds listeners for cards and reset button
function addListeners() {
    // it depends on where the user clicks we got the event on the span or the li element.
    $('#board').on('click', 'span', function(event) {
        event.stopPropagation();
        manageMovement(event.target.parentElement);
    });
    $('#board').on('click', 'li', function(event) {
        event.stopPropagation();
        manageMovement(event.target);
    });
    $('.restart').on('click', 'span', function(event) {
        restartGame();
    })
}

// manages user movement, for both span or li events.
var openedCard = null;
function manageMovement(card) {
    checkStars();
    showCard(card);
    if (openedCard == null) {
        // first clicked card
        openedCard = card;
    } else {
        incrementMoves();
        // second clicked card
        if (getSymbolFromId(card) === getSymbolFromId(openedCard)) {
            // matching cards
            lockCards(card, openedCard);
        } else {
            // no matching cards
            hideCards(card, openedCard);
        }
        openedCard = null;
        endGame();
    }
}

// prepares card id using index and symbol
function generateId(index, symbol) {
    return 'card' + index+ ID_SEPARATOR +symbol;
}

// extracts symbol from card id
function getSymbolFromId(card) {
    return card.id.substring(card.id.indexOf('_')+1);
}

// creates the LI for one card, with card<index>_<symbol> as id, and the symbol as content.
function createCard(index, symbol) {
    let out = '';
    out += '<li class="card" id="'+generateId(index, symbol)+'">' + '\n';
    out += '   <i class="fa fa-'+symbol+'" id="card"></i>' + '\n';
    out += '</li>';
    return out;
}

 // makes a card visible
function showCard(card) {
    // class shows makes the icon visible. class open changes background color.
	$('#' + card.id).toggleClass("show open");
}

// keeps a card visible after matching
function showMatchedCard(card) {
    $('#' + card.id).toggleClass("match"); 
}

// shows matched cards and does necessary business to control the end of the game
function lockCards(card1, card2) {
    showMatchedCard(card1);
    showMatchedCard(card2);
    guessed++;
}

// shows failed color, and half a second later, hides the card
function showFailedCard(card) {
    $('#' + card.id).toggleClass("failed"); 
}

// hides the two cards
function hideCards(card1, card2) {
    showFailedCard(card1);
    showFailedCard(card2);
    setTimeout (() => {
        $('#' + card1.id).toggleClass("show open failed"); 
        $('#' + card2.id).toggleClass("show open failed"); 
        }, INCORRECT_TIMEOUT);
}

// increments movement counter, updates UI: number of movements and stars
function incrementMoves() {
    moves++
    document.getElementById('counter').innerHTML = moves;
}

// formats seconds to mm:ss
// method taken from https://stackoverflow.com/a/17781037
function formatSeconds(seconds)
{
    var date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
}

// calculates the number of seconds from initTime to now
function getSeconds() {
    let currentTime = new Date().getTime()/1000;
    return currentTime - initTime.getTime()/1000;
}

// updates timer with current seconds, every second
var timer = document.getElementById('timer');
function updateTimer() {
    timer.innerHTML = formatSeconds(getSeconds());
}

// stops timer
function stopTimer() {
    clearTimeout(timerTimeOut);
}

// shows timer, starting its update loop
function showTimer() {
    setInterval(updateTimer, 1000);
}

function restartGame() {
    location.reload();
}

function checkStars() {
    let star = STARS_LEVEL.indexOf(moves)
    console.log(star);
    if (star != -1) {
        $('#star' + (STARS_LEVEL.length - 1 - star)).attr('class' ,'fa fa-star-o');
        --startsCounter;
    }
}

 function endGame() {
    if (guessed >= CARDS.length) {
        if (window.confirm('Congratulations!! You have won with ' + moves + ' movements in' + formatSeconds(getSeconds()) + '. You are a ' + startsCounter
        + ' stars player!! \nDo you want to play again?')) {
            location.reload();
        };
    }
  }
// inits a new game
function initGame() {
    initCounters();
    createStars();
    createBoard();
    addListeners();
    showTimer();
}

initGame();