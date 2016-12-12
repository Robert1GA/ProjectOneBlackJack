$("document").ready(function() {
  console.log("all systems go!");
  // Starting conditions
  var deck = [];
  deck = ALLCARDS; // use a temporary deck made up of all Total Cards
  var dealerCards = [];
  var playerCards = [];
  var totalCards;

  // Under starting conditions, playing buttons should be hidden
  $("#hit").hide();
  $("#stand").hide();
  $("#double").hide();
  $("#split").hide();
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
    $("#stand").show();
    $("#double").show();
  });

  $("#hit").click(function(e){
    e.preventDefault();
    console.log("HIT click");
    playerHit();
  });

  // event listener on the button that
  $("#stand").click(function(e){
    e.preventDefault();
    stand();
  });

  // event listener on double-down button
  $("#double").click(function(e){
    e.preventDefault();
    doubleDown();
  });

  // event listener on split button
  $("#double").click(function(e){
    e.preventDefault();
  });


  function generateRandomCard() {
    var rand = Math.round(Math.random() * (deck.length-1));
    var aCard = deck[rand];
    console.log("aCard:",aCard);
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
    if (splitAvailable(playerCards)) {
      $("#split").show();
    }
  }

  function splitAvailable(card) {
    return (card[0].value === card[1].value);
  }

  function displayCards(topCards,bottomCards) {
    console.log("dealerCards ", dealerCards);
    $(".dealerCard").eq(0).attr("src", "img/red.jpg");
    $(".dealerCard").eq(1).attr("src", topCards[1].img);
    $(".playerCard").eq(0).attr("src", bottomCards[0].img);
    $(".playerCard").eq(1).attr("src", bottomCards[1].img);
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
    if (playerScore === 21 && totalCards === 1) {
      console.log("BLACKJACK", playerScore);
      alert("Blackjack!");
      stand();
    } else if (playerScore === 21) {
      console.log("auto-stand", playerScore);
      stand();
    } else if (playerScore > 21) {
      console.log("player is bust", playerScore);
      stand();
    } else if (playerScore < 21) {
      // gameplay continues
    } else {
      // wtf moment
      console.log("I'm not sure what broke with playerScore!");
    }
  }

  function playerHit() {
    disableFirstCardOptions()
    playerCards.push(generateRandomCard());
    totalCards++
    $(".playerCard").eq(totalCards).attr("src", playerCards[totalCards].img);
    console.log("totalCards:",totalCards);
    console.log($(".playerCard").eq(totalCards));
    showPlayerScore(playerCards);
  }

  function doubleDown() {
    playerHit();
    stand();
  }


  function stand() {
    disableHitStand();
    dealtoDealer();
  }

  function disableFirstCardOptions() {
    $("#double").attr("disabled","disabled");
    $("#split").attr("disabled","disabled");
  }

  function disableHitStand() {
    $("#hit").attr("disabled","disabled");
    $("#stand").attr("disabled","disabled");
  }

  function dealtoDealer() {
    $(".dealerCard").eq(0).attr("src", dealerCards[0].img);
    var counter = 2;
    var dealerScore = calculateScore(dealerCards);
    while (dealerScore < 17) {
      console.log("dealer",dealerCards);
      dealerCards.push(generateRandomCard());
      $(".dealerCard").eq(counter).attr("src", dealerCards[counter].img);
      dealerScore = calculateScore(dealerCards);
      counter++;
    }
    $("#dealerScore").html(dealerScore);
    detectWin();
  }

  function detectWin() {
    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);
    if (playerScore > 21) {
      console.log("you bust",playerScore);
      playerBust();
    } else if (dealerScore > 21) {
      console.log("dealer bust",dealerScore);
    } else if (playerScore > dealerScore) {
      console.log("player wins", playerScore, dealerScore);
    } else if (playerScore < dealerScore) {
      console.log("player loses", playerScore, dealerScore);
    } else if (playerScore === dealerScore) {
      console.log("PUSH", playerScore, dealerScore);
    } else {
      // wtf moment
      console.log("I'm not sure what broke with detectWin!");
    }
  }

  function playerBust(){
    console.log("playerBust() function");
  }

});
