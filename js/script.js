$("document").ready(function() {
  console.log("ready!");

  var deck = [];
  deck = ALLCARDS;

  $("#hit").toggle();
  $("#stay").toggle();
  $("#double").toggle();

  console.log("deck card0:", deck[0]);
  console.log("deck length:", deck.length);

  // event listener on the button that
  $("#dealCards").click(function(e){
    e.preventDefault();
    startingCards();
    $("#dealCards").toggle();
    $("#hit").toggle();
    $("#stay").toggle();
    $("#double").toggle();
  });

  $("#hit").click(function(e){
    e.preventDefault();
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
    var dealerCards = [];
    var playerCards = []
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



  function displayCards(dealerCards,playerCards) {
    $("#dealercard0").attr("src", dealerCards[0].img);
    $("#dealercard1").attr("src", dealerCards[1].img);
    $("#playercard0").attr ("src", playerCards[0].img);
    $("#playercard1").attr ("src", playerCards[1].img);
  }

  function calculateCards() {

  }






});
