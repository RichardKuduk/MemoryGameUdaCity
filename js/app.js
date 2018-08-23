/*
 * Create a list that holds all of your cards
 */

let previousCard = -1;
let deck;
let winner = 0;
let moves = 0;
let run = false;
const shapes = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
                "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

// To this when DOM is ready
$(document).ready(function() {
  restart();
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function restart()
{
  run = false;
  // reset moves
  moves = 0;
  // FIX -> A restart button allows the player to reset the game board, the timer, and the star rating.
  stop();
  document.getElementById("demo").innerHTML = "0";
  // assign to html
  $('#moves').html(moves);
  // add stars
  var stars = document.getElementById("stars");
  // FIX -> A restart button allows the player to reset the game board, the timer, and the star rating.
  stars.innerHTML = "";
  for (var i=0; i <3; i++){
    let temp = document.createElement("LI");
    temp.innerHTML = '<i class="fa fa-star"></i>';
    stars.appendChild(temp);
  }
  // Hide modal
  el = document.getElementById("overlay");
  el.style.visibility = "hidden";
  // Shuffe the cards array
  shuffle(shapes);
  // reset the openCard value
  previousCard = -1;
  // reset winner
  winner = 0;
  // Get deck from html
  deck = document.getElementsByClassName("deck")[0];
  // empty deck
  deck.innerHTML = "";
  // Loop through array
shapes.forEach(function(element,index) {
    // Create temp li object
    let temp = document.createElement("LI");
    // add card class to it
    temp.classList.add("card");
    // add random icon to the temp obj
    temp.innerHTML = '<i class="'+shapes[index]+'"></i>';
    // add event listener
    temp.addEventListener("click", flip);
    // append to deck
    deck.appendChild(temp);
  });
}
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

function overlay() {
	el = document.getElementById("overlay");
  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


function changeValue() {
  document.getElementById("demo").innerHTML = ++value;
}

var timerInterval = null;
function start() {
  stop(); // stoping the previous counting (if any)
  value = 0;
  timerInterval = setInterval(changeValue, 1000);
}
var stop = function() {
  clearInterval(timerInterval);
}



function flip(e){
  console.log($('#demo').text());
  var card = e.target;
  //ES6 destructuring
  let currentCard = Array.prototype.slice.call(card.parentElement.children).indexOf(card);
  if ( $(card).hasClass("match") || $(card).is("i") ) {
    // card was clicked before dont do anything
    console.log(card);
  } else if(previousCard == -1){
    // check if this card was open before
    if (!run){
      start();
      run = true;
    }
    previousCard = currentCard;
    card.classList.add("match");
  } else {
    moves++;
    // console.log(moves);
    $('#moves').html(moves);

    if(moves == 15 || moves == 25 || moves == 40)
    {
      // get  the stars and remove if 10 inncoret moves
      var stars = document.getElementsByClassName("stars")[0];
      stars.removeChild(stars.childNodes[0]);
    }
    var preCard = $(".card")[previousCard];
    // get class name of prev obj
    var previousShapeClass = preCard.children[0].classList[1];
    // get the class name of this obj
    var currentShapeClass =  card.children[0].classList[1];

    // console.log(previousShapeClass + " pre");
    // console.log(currentShapeClass + " curr");
    card.classList.add("match");
    if(currentShapeClass == previousShapeClass){
      winner++;
      console.log(winner);
      if(winner == 1){
        overlay();

        $('#timeR').html($('#demo').text());
        $('#pts').html($('#moves').text());
        let s = $("#stars").clone();
        $("#s").append(s);

        stop();
      }
    }else{
        setTimeout(function() {
        $(preCard).removeClass("match");
      }, 500);
      setTimeout(function() {
        $(card).removeClass("match");
      }, 500);
    }

    previousCard = -1;
  }



};
