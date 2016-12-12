$("document").ready(function() {
  console.log("ready!");


  console.log(ALLCARDS[0]);
  console.log(ALLCARDS.length);

  function generateRandomCard() {
    var rand = Math.round(Math.random() * (ALLCARDS.length-1));
    var aCard = ALLCARDS[rand];
    console.log(rand);
    console.log(aCard);
    ALLCARDS.splice(rand,1);
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
    displayCards(dealerCards,playerCards);
  }

  startingCards();

  function displayCards(dealerCards,playerCards) {
    $("#dealercard0").attr("src", dealerCards[0].img);
    $("#dealercard1").attr("src", dealerCards[1].img);
    $("#playercard0").attr ("src", playerCards[0].img);
    $("#playercard1").attr ("src", playerCards[1].img);
  }

  function calculateCards() {

  }






});
