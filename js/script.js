// $("document").ready(function() {

  console.log("all systems go!");
  // Starting conditions
  var deck = []; // use a temporary deck that can be re-shuffled
  var dealerCards = [];
  var playerCards = [];
  var totalCards;
  var amountLeft = 500;
  var bet;

  // Under starting conditions, player option
  // buttons should be hidden, except Deal
  $("#hit").hide();
  $("#stand").hide();
  $("#double").hide();
  $("#split").hide();
  $("#hint").hide();
  console.log("deck length:", deck.length);
  displayAmtLeft();
  $("#modal").html("Place your bet below. Then press 'Deal'.")
  $("#hintModal").css("display", "block");


// These are event listeners for all buttons
// =========================================
  $("#dealCards").click(function(e) {
    e.preventDefault();
    console.log("DEAL click");
    totalCards = 1;  // starting total number of player cards at value of 1 (two cards: zero, one)
    placeBet();
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


  $("#hit").click(function(e) {
    e.preventDefault();
    console.log("HIT click");
    playerHit();
  });

  $("#stand").click(function(e) {
    e.preventDefault();
    stand();
  });

  $("#double").click(function(e) {
    e.preventDefault();
    doubleDown();
  });

  $("#split").click(function(e) {
    e.preventDefault();
    $("#modal").html("This feature coming soon!")
    $("#hintModal").css("display", "block");
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
    bet *= 2;
    playerHit();  // player should only get one card on a double down.
    stand();
  }

  function split() {
    console.log("user would like to split");
  }


  function stand() {
    disableHitStand();
    setTimeout(dealtoDealer, 100);
    clearTimeout();
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
    var counter = 2;
    var dealerScore = calculateScore(dealerCards);
    showHoleCard();
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
      console.log("player lose under detect win");
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


// Game results and payouts ====================
  function playerBust() {
    disableHitStand();
    $("#playerResults").html("Player BUST!");
    nextGame();
  }

  function dealerBust() {
    var win = bet*2;
    $("#dealerResults").html("Dealer Bust.");
    $("#playerResults").html("Player win $ " + win + "!")
    winBet(win);
    nextGame();
  }

  function playerWin() {
    var win = bet*2;
    $("#playerResults").html("Player win $ " + win +"!");
    winBet(win);
    nextGame();
  }

  function playerLose() {
    $("#playerResults").html("Player lose.");
    console.log("player lose");
    nextGame();
  }

  function playerPush() {
    $("#playerResults").html("Push.");
    winBet(bet);
    nextGame();
  }

  function blackjackWin() {
    var win = (bet*3/2)+bet
    $("#playerResults").html("BLACKJACK! Player win $ " + win + "!");
    setTimeout(nextGame, 100);  //need a quick timout to delay DOM
    clearTimeout();
    amountLeft += win;
    displayAmtLeft();
  }

  function displayAmtLeft() {
    $("#available").html(amountLeft);
  }

  function placeBet() {
    bet = parseInt($("#bet").val());
    $("#bet").prop("disabled",true);
    amountLeft -= bet;
    displayAmtLeft();
  }

  function winBet(amt) {
    amountLeft += amt;
    displayAmtLeft();
  }

// reset settings to prepare for next game & bet =====

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
    $("#hit").hide();
    $("#stand").hide();
    $("#double").hide();
    $("#split").hide();
    $("#hint").hide();
    $("#bet").prop("disabled",false);
    console.log("next game function run");
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
