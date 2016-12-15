// $("document").ready(function() {

  console.log("all systems go!");
  // Starting conditions
  var deck = []; // use a temporary deck made up of all Total Cards
  var dealerCards = [];
  var playerCards = [];
  var totalCards;

  // Under starting conditions, player option buttons should be hidden, except Deal
  $("#hit").hide();
  $("#stand").hide();
  $("#double").hide();
  $("#split").hide();
  $("#hint").hide();
  console.log("deck length:", deck.length);


  //BUTTON FUNCTIONS
  // event listener on the button to deal cards and initiate the game
  $("#dealCards").click(function(e) {
    e.preventDefault();
    console.log("DEAL click");
    totalCards = 1;  // starting total number of player cards at value of 1 (two cards: zero, one)
    shuffleCards();
    clearCards();
    clearScoreMessages();
    startingCards();
    $("#dealCards").hide();  // hide the deal button just clicked.
    $("#hit").show();   // unhide the buttons necessary for gameplay.
    $("#stand").show();
    $("#double").show();
    $("#hint").show();
  });

  // event listener for Hit button
  $("#hit").click(function(e) {
    e.preventDefault();
    console.log("HIT click");
    playerHit();
  });

  // event listener for Stand button
  $("#stand").click(function(e) {
    e.preventDefault();
    stand();
  });

  // event listener on double-down button
  $("#double").click(function(e) {
    e.preventDefault();
    doubleDown();
  });

  // event listener on split button
  $("#split").click(function(e) {
    e.preventDefault();
    split();
  });

  $("#hint").click(function(e) {
    e.preventDefault();
      checkForHints();
      $("#hintModal").css("display", "block");
  });


  // pull a random card and removes it from the deck array
  function generateRandomCard() {
    var rand = Math.round(Math.random() * (deck.length-1));
    var aCard = deck[rand];
    console.log("aCard:",aCard);
    deck.splice(rand,1);  // pulled from deck
    return aCard;
  }

  // starting deal. I believe this needs to be different from
  // other functions in that there's no other time one card (dealer's) needs
  // to be generated, but placed "facedown"
  // ** will re-examine this assumption at a later time **
  function startingCards() {
    dealerCards.push(generateRandomCard());
    dealerCards.push(generateRandomCard());
    playerCards.push(generateRandomCard());
    playerCards.push(generateRandomCard());
    // playerCards.push(deck[0]);
    // playerCards.push(deck[deck.length-1]);
    console.log("dealer:",dealerCards);
    console.log("player:",playerCards);
    console.log("new deck length:", deck.length);
    displayCards(dealerCards,playerCards);
  }

  function displayCards(dcards,pcards) {
    console.log("dealerCards ", dealerCards);
    $(".dealerCard").eq(0).attr("src", "img/red.jpg");
    $(".dealerCard").eq(1).attr("src", dcards[1].img);
    $(".playerCard").eq(0).attr("src", pcards[0].img);
    $(".playerCard").eq(1).attr("src", pcards[1].img);
    showPlayerScore(playerCards);  // ** ???
  }

  // calculate the value of a hand, taking into account handling aces
  function calculateScore(cards) {
    var minScore = 0;
    cards.forEach(function(card) {
      minScore += card.value;
    });

    var maxScore = minScore;
    cards.forEach(function(card) {
      // checks if setting an ace value to 11 busts the hand. if not, add 10 to value of ace.
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
      $("#results").html("BLACKJACK!");
      blackjack();
    } else if (playerScore === 21) {
      console.log("auto-stand", playerScore);
      stand();
    } else if (playerScore > 21) {
      console.log("player is bust", playerScore);
      stand();
    } else if (playerScore < 21) {
      // gameplay continues
      if (splitAvailable(playerCards)) {
        $("#split").show();  // enable to Split button if player has two same value cards
      }
      console.log("continue");
    } else {
      // wtf moment
      console.log("I'm not sure what broke with playerScore!");
    }

  }

  // if player has two cards of equal value, can perform Split function
  function splitAvailable(card) {
    return (card[0].value === card[1].value);  //returns a boolean
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
    playerHit();  // player should only get one card on a double down.
    stand();
  }

  function split() {
    console.log("user would like to split");
  }


  function stand() {
    disableHitStand();
    dealtoDealer();
  }


  // these are options that can only be played on first player decision
  function disableFirstCardOptions() {
    $("#double").attr("disabled","disabled");
    $("#split").attr("disabled","disabled");
  }


  function disableHitStand() {
    $("#hit").attr("disabled","disabled");
    $("#stand").attr("disabled","disabled");
  }

  function showHoleCard() {
    $(".dealerCard").eq(0).attr("src", dealerCards[0].img);
  }

  function dealtoDealer() {
    showHoleCard();
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
    if (playerScore > 21) {  // no way to win if player busts. This is needed here to evaluate double-down options
      playerBust();
    } else if (dealerScore > 21) {
      dealerBust();
    } else if (playerScore == 21 && totalCards == 1) {
      if (dealerScore == 21) {
        setTimeout(playerPush, 100);
        clearTimeout();
      } else {
        blackjackWin();
      }
    } else if (playerScore > dealerScore) {
      playerWin();
    } else if (playerScore < dealerScore) {
      playerLose();
    } else if (playerScore === dealerScore) {
      playerPush();
    } else {
      // wtf moment
      console.log("I'm not sure what broke with detectWin!");
    }
  }

  function blackjack() {
    disableHitStand();
    showHoleCard();
    detectWin();
  }

  function playerBust() {
    disableHitStand();
    $("#playerResults").html("Player BUST!");
    nextGame();
  }

  function dealerBust() {
    $("#dealerResults").html("Dealer Bust.");
    $("#playerResults").html("Player win!")
    nextGame();
  }

  function playerWin() {
    $("#playerResults").html("Player win!");
    nextGame();
  }

  function playerLose() {
    $("#playerResults").html("Player lose.");
    nextGame();
  }

  function playerPush() {
    $("#playerResults").html("Push.");
    nextGame();
  }

  function blackjackWin() {
    $("#playerResults").html("Blackjack! Player win!");
    setTimeout(nextGame, 100);
    clearTimeout();
  }

  function nextGame() {
    console.log("deck",deck.length);
    console.log("Allcards",ALLCARDS.length, ALLCARDS.length/2);
    dealerCards = [];
    playerCards = [];
    $("#hit").removeAttr("disabled");
    $("#stand").removeAttr("disabled");
    $("#double").removeAttr("disabled");
    $("#split").removeAttr("disabled");
    $("#dealCards").show();
    console.log($("#dealCards"));
    $("#hit").hide();
    $("#stand").hide();
    $("#double").hide();
    $("#split").hide();
    $("#hint").hide();
  }

  function shuffleCards() {
    console.log("SHUFFLE");
    if (deck.length < (ALLCARDS.length / 2)) {
      deck = [];
      for(var s=0; s<ALLCARDS.length; s++) {
        deck.push(ALLCARDS[s]);
      }
    }
  }

  function clearCards() {
    for(var i=0; i<6; i++) {
      $(".playerCard").eq(i).removeAttr("src");
      $(".dealerCard").eq(i).removeAttr("src");
      $(".playerCardSplit").eq(i).removeAttr("src");
    }
  }

  function clearScoreMessages() {
    $("#playerScore").html("&nbsp;");
    $("#dealerScore").html("&nbsp;");
    $("#playerResults").html("&nbsp;");
    $("#dealerResults").html("&nbsp;");
  }




// });
