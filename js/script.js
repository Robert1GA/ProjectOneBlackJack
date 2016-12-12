$("document").ready(function() {
  console.log("ready!");

  var deck = [];
  deck = ALLCARDS;
  var dealerCards = [];
  var playerCards = [];

  $("#hit").toggle();
  $("#stay").toggle();
  $("#double").toggle();

  console.log("deck card0:", deck[0]);
  console.log("deck length:", deck.length);

  // event listener on the button that
  $("#dealCards").click(function(e){
    e.preventDefault();
    console.log("DEAL click");
    startingCards();
    $("#dealCards").toggle();
    $("#hit").toggle();
    $("#stay").toggle();
    $("#double").toggle();
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
    deck.splice(rand,1);
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
    $("#playercard0").attr ("src", bottomCards[0].img);
    $("#playercard1").attr ("src", bottomCards[1].img);
    showPlayerScore(playerCards);
  }

  function calculateScore(cards) {
    var minScore = 0;
    cards.forEach(function(card){
      minScore += card.value;
    });

    var maxScore = minScore;
    cards.forEach(function(card){
      if (card.value === 1 && maxScore + 10 <= 21) {
        maxScore += 10;
      }
    });
    return maxScore;
  }

  function showPlayerScore(cards) {
    playerScore = calculateScore(cards);
    $("#playerScore").html(playerScore);
  }

  function playerHit() {
    playerCards.push(generateRandomCard());
    displayCards();
  }


});
