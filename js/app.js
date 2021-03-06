/*
 * Set variables for functions & create array to hold card symbols
 */
let cardSymbols = ['robot','lemon','birthday-cake','heart','skull','street-view','flask','burn','robot','lemon','birthday-cake','heart','skull','street-view','flask','burn'],
    cardTotal = 8,
    matches = 0,
    moves = 0,
    rating = 6,
    sixDie = 8,
    fiveDie = 10,
    fourDie = 15,
    threeDie = 20,
    twoDie = 25,
    sec = 0;

var reset = document.querySelector('.restart');
var cardsReveal = [];
var cardDeck = document.querySelectorAll('.card');
var moveCounter = document.querySelector('.moves');

function makeCard(card){
  return `<li class="card" data-card="${card}"><i class="fa fa-${card}"></i></li>`;
}
//game startup function , resets all scoreboard fuctionality, shuffles cards and adds in click function to new deck
function initGame(){
  let deckHTML = shuffle(cardSymbols).map(function(card){
    return makeCard(card);
  });
  document.querySelector('.deck').innerHTML = deckHTML.join('');
  document.getElementById('starOne').classList.add('fa-star');
  document.getElementById('starTwo').classList.add('fa-star');
  document.getElementById('starThree').classList.add('fa-star');
  document.getElementById('starFour').classList.add('fa-star');
  document.getElementById('starFive').classList.add('fa-star');
  document.getElementById('starSix').classList.add('fa-star');
  sec = 0;
  matches = 0;
  moves = 0;
  moveCounter.innerText = moves;
  cardsReveal = [];
  cardDeck = document.querySelectorAll('.card');
  addEventListenerToCards();
}
initGame();


// main deck functions below (timers required for animations)
function addEventListenerToCards(){
  cardDeck.forEach(function(card){
      if(!card.classList.contains('open') || !card.classList.contains('show') || !card.classList.contains('match')){
        card.addEventListener('click',function(x){
        cardsReveal.push(card);
        //animate cards here when clicked
        card.classList.add('open','show','animated','flipInY');
          if(cardsReveal.length > 1){
            //if match
            if(cardsReveal[0].dataset.card == cardsReveal[1].dataset.card){
              setTimeout(function(){
                cardsReveal.forEach(function(card){
                  card.classList.add('match');
                  card.classList.remove('open','show');
                });
                cardsReveal = [];
              },1000);
              matches +=1;
              if(matches == cardTotal){
                moves +=1;
                setRating(moves);
                //if player meets win conditions, display dialogue box with information & reset game if they confirm
                swal({
                  title:'Great Job You Win!',
                  text:'With '+(moves+1)+' moves and a '+rating+' star rating in '+sec+' seconds.',
                  type:'success',
                  confirmButtonText: 'Play again?'
                 }).then(function(confirmed){
                   if(confirmed){
                     initGame();
                   }
                 });
              }
            }else{
            //if no match
            setTimeout(function(){
              cardsReveal.forEach(function(card){
                //re-animate cards when no match
                card.classList.add('flip');
                card.classList.remove('open','show');
              });
              cardsReveal = [];
            },1500);
          }
          moves +=1;
          moveCounter.innerText = moves;
          setRating(moves);
        }
      });
    }
  });
}
//rating function (dice counter)
function setRating(moves){
  if(moves<=sixDie){
    document.getElementById('starOne').classList.add('fa-star');
    document.getElementById('starTwo').classList.add('fa-star');
    document.getElementById('starThree').classList.add('fa-star');
    document.getElementById('starFour').classList.add('fa-star');
    document.getElementById('starFive').classList.add('fa-star');
    document.getElementById('starSix').classList.add('fa-star');
    rating = 6;
  }else if(moves >sixDie && moves<=fiveDie){
    document.getElementById('starSix').classList.remove('fa-star');
    rating = 5;
  }else if(moves >fiveDie && moves<=fourDie){
    document.getElementById('starFive').classList.remove('fa-star');
    rating = 4;
  }else if(moves >fourDie && moves<=threeDie){
    document.getElementById('starFour').classList.remove('fa-star');
    rating = 3;
  }else if(moves >threeDie && moves<=twoDie){
    document.getElementById('starThree').classList.remove('fa-star');
    rating = 2;
  }else if(moves >twoDie){
    document.getElementById('starTwo').classList.remove('fa-star');
    rating = 1;
  }
}

//reset button function (prompts user with dialogue box)
 reset.addEventListener('click',function(){
   swal({
     title: 'Are you sure?',
     text: "Your progress will be lost!",
     type: 'warning',
     showCancelButton: true,
     confirmButtonText:'<i class="fa fa-thumbs-up"></i> Yup!',
     cancelButtonText:'<i class="fa fa-thumbs-down"></i> NO!',
     reverseButtons: true
   }).then(function(confirmed){
     if(confirmed){
       moves =0;
       moveCounter.innerText = moves;
       initGame();
     }
   });
 });

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
