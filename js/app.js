// Sintaxis JQUERY: https://stackoverflow.com/questions/4069982/document-getelementbyid-vs-jquery
// document.getElementById('contents'); //returns a HTML DOM Object
// var contents = $('#contents');  //returns a jQuery Object

// number of movements to hide each star
var STARS_LEVEL = [15, 25, 35]; // [2, 4, 6];
/*
 * Create a list that holds all of your cards
 */
// TODO


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
    // TODO 
}

// generates LI items inside UL with stars id.
function createStars() {
    // TODO
}

// creates the LI for one star
function createStar(index) {
    // TODO
}

// init variables for a new game
function initCounters() {
    // TODO
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
function manageMovement(card) {
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
    }
}

// prepares card id using index and symbol
function generateId(index, symbol) {
    // TODO
}

// extracts symbol from card id
function getSymbolFromId(card) {
    // TODO
}

// creates the LI for one card, with card<index>_<symbol> as id, and the symbol as content.
function createCard(index, symbol) {
    // TODO
}

 // makes a card visible
function showCard(card) {
    // TODO
}

// keeps a card visible after matching
function showMatchedCard(card) {
    // TODO
}

// shows matched cards and does necessary business to control the end of the game
function lockCards(card1, card2) {
    // TODO
}

// shows failed color, and half a second later, hides the card
function showFailedCard(card) {
    // TODO
}

// hides the two cards
function hideCards(card1, card2) {
    // TODO
}

// increments movement counter, updates UI: number of movements and stars
function incrementMoves() {
    // TODO
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
    // TODO
}

// updates timer with current seconds, every second
function updateTimer() {
    // TODO
}

// stops timer
function stopTimer() {
    clearTimeout(timerTimeOut);
}

// shows timer, starting its update loop
function showTimer() {
    updateTimer();
}

// inits a new game
function initGame() {
    createBoard();
    createStars();
    initCounters();
    addListeners();
    showTimer();
}

initGame();