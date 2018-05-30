/*
 * Set variables for functions & create array to hold card symbols
 */
let cardSymbols = ['robot','lemon','birthday-cake','heart','skull','street-view','flask','burn','robot','lemon','birthday-cake','heart','skull','street-view','flask','burn'],
    cardTotal = 8,
    matches = 0,
    moves = 0,
    sixDie = 8,
    fiveDie = 10,
    fourDie = 15,
    threeDie = 20,
    twoDie = 25,
    sec = 0;

function makeCard(card){
  return `<li class="card" data-card="${card}"><i class="fa fa-${card}"></i></li>`;
}

function initGame(){
  let deckHTML = shuffle(cardSymbols).map(function(card){
    return makeCard(card);
  });
  document.querySelector('.deck').innerHTML = deckHTML.join('');
  sec = 0;
  matches = 0;
  moves = 0;
  cardsReveal = [];
  cardDeck = document.querySelectorAll('.card');
}
initGame();

var reset = document.querySelector('.restart');
var cardsReveal = [];
var cardDeck = document.querySelectorAll('.card');
var moveCounter = document.querySelector('.moves');

// main deck functions below
cardDeck.forEach(function(card){
    if(!card.classList.contains('open') || !card.classList.contains('show') || !card.classList.contains('match')){
      card.addEventListener('click',function(x){
      cardsReveal.push(card);
      card.classList.add('open','show');
        if(cardsReveal.length > 1){
          //if match
          if(cardsReveal[0].dataset.card == cardsReveal[1].dataset.card){
            cardsReveal[0].classList.remove('open','show');
            cardsReveal[0].classList.add('match');
            cardsReveal[1].classList.remove('open','show');
            cardsReveal[1].classList.add('match');
            cardsReveal = [];
            matches +=1;
            if(matches == cardTotal){
            }
          }else{
          //if no match
          setTimeout(function(){
            cardsReveal.forEach(function(card){
              card.classList.remove('open','show');
            });
            cardsReveal = [];
          },1000);
        }
        moves +=1;
        moveCounter.innerText = moves;
        setRating(moves);
      }
    });
  }
});
//rating function (dice counter)
function setRating(moves){
  if(moves<=sixDie){
    document.getElementById('rating').classList.replace(document.getElementById('rating').className,'fa-dice-six');
  }else if(moves >sixDie && moves<=fiveDie){
    document.getElementById('rating').classList.replace('fa-dice-six','fa-dice-five');
  }else if(moves >fiveDie && moves<=fourDie){
    document.getElementById('rating').classList.replace('fa-dice-five','fa-dice-four');
  }else if(moves >fourDie && moves<=threeDie){
    document.getElementById('rating').classList.replace('fa-dice-four','fa-dice-three');
  }else if(moves >threeDie && moves<=twoDie){
    document.getElementById('rating').classList.replace('fa-dice-three','fa-dice-two');
  }else if(moves >twoDie){
    document.getElementById('rating').classList.replace('fa-dice-two','fa-dice-one');
  }
}
// function endGame(){
//   stopTime();
//   swal({
//     title:'Great Job You Win!',
//     text:'With'+moves+' moves and'++' rating in'+sec+' seconds',
//     type:'success',
//     confirmButtonText: 'Play again?'
//    }).then(function(confirmed){
//      if(confirmed){
//        setRating(moves);
//        initGame();
//      }
//    })
// }


//reset button function
// reset.addEventListener('click',function(){
//   swal({
//     title: 'Are you sure?',
//     text: "Your progress will be lost!",
//     type: 'warning',
//     showCancelButton: true,
//     confirmButtonText:'<i class="fa fa-thumbs-up"></i> Yup!',
//     cancelButtonText:'<i class="fa fa-thumbs-down"></i> NO!',
//     reverseButtons: true
//   }).then(function(confirmed){
//     if(confirmed){
//       setRating(moves);
//       initGame();
//     }
//   })
// });

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
//timer functions below
function time(val) { return val > 9 ? val : "0" + val;}
setInterval( function(){
    document.getElementById("seconds").innerHTML=time(++sec);
}, 1000);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
