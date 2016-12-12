$("document").ready(function() {
  console.log("ready!");
  // Starting conditions
  var deck = [];
  deck = ALLCARDS; // use a temporary deck made up of all Total Cards
  var dealerCards = [];
  var playerCards = [];
  var totalCards;

  // Under starting conditions, playing buttons should be hidden
  $("#hit").hide();
  $("#stay").hide();
  $("#double").hide();
  console.log("deck card0:", deck[0]);
  console.log("deck length:", deck.length);


  // event listener on the button to deal cards and initiate the game
  $("#dealCards").click(function(e){
    e.preventDefault();
    console.log("DEAL click");
    totalCards = 1;  // starting total number of player cards at value of 1 (two cards: zero, one)
    startingCards();
    $("#dealCards").toggle();  // hide the deal button just clicked.
    $("#hit").show();   // unhide the buttons necessary for gameplay.
    $("#stay").show();
    $("#double").show();
  });

  $("#hit").click(function(e){
    e.preventDefault();
    console.log("HIT click");
    playerHit();
  });

  // event listener on the button that
  $("#stay").click(function(e){
    e.preventDefault();
  });

  // event listener on double-down button
  $("#double").click(function(e){
    e.preventDefault();
  });


  function generateRandomCard() {
    var rand = Math.round(Math.random() * (deck.length-1));
    var aCard = deck[rand];
    console.log(rand);
    console.log(aCard);
    deck.splice(rand,1);  // pull the generated card from the deck; no re-use.
    return aCard;
  }


  function startingCards() {
    // var dealerCards = [];
    // var playerCards = []
    dealerCards.push(generateRandomCard());
    playerCards.push(generateRandomCard());
    dealerCards.push(generateRandomCard());
    playerCards.push(generateRandomCard());
    console.log("dealer:",dealerCards);
    console.log("player:",playerCards);
    console.log("dealers value",dealerCards[0].value+dealerCards[1].value);
    console.log("players value",playerCards[0].value+playerCards[1].value);
    console.log("new deck length:", deck.length);
    displayCards(dealerCards,playerCards);
  }


  function displayCards(topCards,bottomCards) {
    console.log("dealerCards ", dealerCards);
    $("#dealercard0").attr("src", topCards[0].img);
    $("#dealercard1").attr("src", topCards[1].img);
    $(".playercard").eq(0).attr("src", bottomCards[0].img);
    $(".playercard").eq(1).attr("src", bottomCards[1].img);
    showPlayerScore(playerCards);
  }

  // calculate the value of a hand, taking into account handling aces
  function calculateScore(cards) {
    var minScore = 0;
    cards.forEach(function(card){
      minScore += card.value;
    });

    var maxScore = minScore;
    cards.forEach(function(card){
      // checks if making an ace value 11 busts.  if not, add 10 to value of ace.
      if (card.value === 1 && maxScore + 10 <= 21) {
        maxScore += 10;
      }
    });
    console.log("maxscore", maxScore);
    return maxScore;
  }

  function showPlayerScore(cards) {
    playerScore = calculateScore(cards);
    $("#playerScore").html(playerScore);
    if (playerScore === 21) {

    } else if (playerScore > 21) {
      console.log("player is bust", playerScore);
    } else if (playerScore < 21) {
      // gameplay continues
    } else {
      // wtf moment
      console.log("I'm not sure what, but something broke with playerScore!");
    }
  }

  function playerHit() {
    playerCards.push(generateRandomCard());
    $(".playerCard").eq(totalCards).attr("src", playerCards[totalCards].img);
    totalCards++
    console.log("totalCards:",totalCards);
    showPlayerScore(playerCards);
  }


});
