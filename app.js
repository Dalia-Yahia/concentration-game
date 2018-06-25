// create the cards Array
const cards = ["far fa-gem", "far fa-gem",
"far fa-paper-plane", "far fa-paper-plane",
"fas fa-anchor", "fas fa-anchor",
"fas fa-bolt", "fas fa-bolt",
"fas fa-cube", "fas fa-cube",
"fas fa-leaf", "fas fa-leaf",
"fas fa-bicycle", "fas fa-bicycle",
"fas fa-bomb", "fas fa-bomb"];

const deckContainer = document.querySelector("#card-deck");// declare the parent of the deck

let openedCards = []; // array to hold 2 cards
let matchedCardsArray = []; //array to hold all matched cards

// declare congratulation Popup Message variables
const congPopup = document.querySelector("#popupContainer");
const finalMoves = document.querySelector("#finalMoves");
const timing = document.querySelector("#timing");
const finalRating = document.querySelector("#finalRating");
const closeIcon = document.querySelector(".close");
const replay = document.querySelector("#replay");

//declare Rating stars variables
const starsCounter = document.querySelector(".stars")

//declare Moves variables
const movesCounter = document.querySelector(".moves");
let moves = 0;
movesCounter.innerHTML = 0;

//declare Timer variables
const timer = document.querySelector(".timer");
let second = 0, minute = 0;
let interval;

//declare Restart button
const restartBtn = document.querySelector(".restart");

/**
 **shuffles cards function
 **/
function shuffle(cards) {
    let currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards;
};

function gameStarter() {
    second = 0;
    minute = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    shuffle(cards);// shuffle the cards

    //create the cards
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cards[i]}"></i>`;
        deckContainer.appendChild(card);

        //add click event for each card
        clickCard(card);
    };
};

/**
**click event function
**/
function clickCard(card) {
    //create a click event to each card
    card.addEventListener("click", function() {
    // one card is aleardy opened
    if (openedCards.length === 1) {
        const currentCard = this;
        const previousCard = openedCards[0];

        card.classList.add("open", "show","disabled");
        openedCards.push(this);

        //compare 2 cards for matching
        cardsCompare(currentCard, previousCard);

    } else {  // no opened cards yet
        card.classList.add("open", "show","disabled");
        openedCards.push(this);
    }
    });
};

/**
**comare Cards for matching
**/
function cardsCompare(currentCard, previousCard) {
    if ( currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCardsArray.push(currentCard, previousCard);

        openedCards = [];

        //check if the game is over
        gameOver();
    } else {
        currentCard.classList.add("unmatched");
        previousCard.classList.add("unmatched");

        setTimeout(function(){
        currentCard.classList.remove("show", "open", "unmatched", "disabled");
        previousCard.classList.remove("show", "open", "unmatched", "disabled");
        openedCards = [];
        },600);
    };

    //start moves counting
    clearInterval(interval);// stop timer working untill clickiing the first card
    addAmove();
};

/**
**Rating stars function
**/
function ratingStars() {
    if (moves <= 13) {
        starsCounter.innerHTML = `<li><i class="fas fa-star"></i></li>
         <li><i class="fas fa-star"></i></li>
          <li><i class="fas fa-star"></i></li>`;

    } else if ( (moves >= 14) && (moves <= 19)) {
        starsCounter.innerHTML = `<li><i class="fas fa-star"></i></li>
         <li><i class="fas fa-star"></i></li>`;

    } else if (moves > 20) {
        starsCounter.innerHTML = `<li><i class="fas fa-star"></i></li>`;
    }
};

/**
**moves counter
**/
function  addAmove() {
    moves++;
    movesCounter.innerHTML = moves;
    startTimer();
    ratingStars(); // calling the rating function
};

/**
** timer function
**/
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        },1000);
};

/**
** reset function
**/
function resetDeck() {
    deckContainer.innerHTML = ""; //Delete all card
    gameStarter() // initializing the game
    matchedCardsArray = []; //reset the number of matched cards to nothing
    movesCounter.innerHTML = 0;//reset the movescounter
    moves = 0;
    starsCounter.innerHTML = `<li><i class="fas fa-star"></i></li>
    <li><i class="fas fa-star"></i></li>
     <li><i class="fas fa-star"></i></li>`;//reset rating stars
};

/**
**restart Event
**/
restartBtn.addEventListener("click", function() {
    resetDeck();
});

/**
**create GAME OVER function
**/
function gameOver() {
    if ( matchedCardsArray.length === cards.length) {
        clearInterval(interval);
        timing.innerHTML = timer.innerHTML;
        finalMoves.innerHTML = moves;
        finalRating.innerHTML= document.querySelector(".stars").innerHTML;

        // show congratulations popup
        congPopup.classList.add("showUp");
        closePopUp();
        playAgain();
    };
};

/**
**popup closing function
**/
function closePopUp() {
    closeIcon.addEventListener("click", function() {
        congPopup.classList.remove("showUp");
        resetDeck();
    });
};

/**
**popup play again function
**/
function playAgain() {
    replay.addEventListener("click", function() {
        congPopup.classList.remove("showUp");
        resetDeck();
    });
};

/**
**Load the Game for first time
**/
gameStarter();
