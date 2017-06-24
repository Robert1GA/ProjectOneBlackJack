console.log("Cheers!");
$('#blackjack-pays').circleType({radius: 450, dir:-1});
$('#soft-17').circleType({radius: 450, dir:-1});

/* DECK OF CARDS INITIALIZE AND SHUFFLING */
var deck = [];
/* "shuffle-like" function when less than 1/4 deck remaining*/
function reloadActiveCards() {
  console.log("RELOAD");
  if (deck.length <= (ALLCARDS.length * 0.25)) {
    deck = [];
    for(var i = 0; i < ALLCARDS.length; i++) {
      deck.push(ALLCARDS[i]);
    }
  }
}
/* pull a random card from deck and removes it from that array */
var randomCard = function() {
  var rand = Math.round(Math.random() * (deck.length-1));
  var randomCard = deck[rand];
  // console.log("randomCard:",randomCard);
  deck.splice(rand,1);
  return randomCard;
};

/* Calculate the value of each hand */
var calculateScore = function(cards) {
  var minScore = 0;
  cards.forEach(function(card) {
    minScore += card.value;
  });
  console.log("min: " + minScore);
  var maxScore = minScore;
  cards.forEach(function(card) {
    /* Give Aces value of 11 if it will not BUST hand, else keep at value 1*/
    if (card.value === 1 && maxScore + 10 <= 21) {
      maxScore += 10;
    }
  });
  console.log("max: " + maxScore);
  return maxScore;
};

/* HAND OF CARDS OBJECT PROTOTYPE */
function Hand() {
  this.size = 0;
  this.split = false;
  this.cards = [];
  // can/should I add a this.value ?
  // how would it work for dealer ?
}
Hand.prototype.newCard = function() {
  this.cards.push(randomCard());
  this.size++;
};
Hand.prototype.calculateValue = function() {
  var minScore = 0, maxScore, type = "HARD";
  this.cards.forEach(function(card) {
    minScore += card.value;
  });
  maxScore = minScore;
  this.cards.forEach(function(card) {
    if (card.value === 1 && maxScore + 10 <= 21) {
      maxScore += 10;
      type = "SOFT";
    }
  });
  return [maxScore, type];
};
Hand.prototype.dealerPlay = function() {
  var dealerScore = this.calculateValue();
  while(anotherDealerCard(dealerScore)) {
    console.log("dealer receiving new card");
    this.newCard();
    dealerScore = this.calculateValue();
  }
  return dealerScore[0];  // is this what I want to return?
};

function anotherDealerCard(score) {
  /* Hit anything less than 17 or Soft-17s*/
  if(score[0] < 17 || (score[0] === 17 && score[1] === "SOFT")) {
    return true;
  } else if(score[0] > 17 || (score[0] === 17 && score[1] === "HARD")) {
    return false;
  }
}

reloadActiveCards();
var playerHand = new Hand();
playerHand.newCard();
playerHand.newCard();
console.table(playerHand.cards);
console.log(playerHand.calculateValue());
console.log(playerHand.calculateValue()[1]);
console.log(playerHand.calculateValue()[0]);

var dealerHand = new Hand();
dealerHand.newCard();
dealerHand.newCard();
dealerHand.dealerPlay();
console.table(dealerHand.cards);
console.log(dealerHand.calculateValue());
console.log(dealerHand.calculateValue()[1]);
console.log(dealerHand.calculateValue()[0]);
