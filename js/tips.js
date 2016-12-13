$("document").ready(function(){
  console.log("tip for all!");

  function checkForTips(){
    playerScore = calculateScore(playerCards);
    if (playerCards[0].value = 1 || playerCards[1].value = 1) {
      if (playerScore <= 16) {
        switch (dealerCards[1].value) {
          case 2:
          case 3:
          case 7:
          case 8:
          case 9:
          case 10:
          case 1:
            console.log("hit");
            break;
          case 4:
          case 5:
          case 6:
            console.log("double");
            break;
        }
      } else if (playerScore==17) {
        switch (dealerCards[1].value) {
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            console.log("double");
            break;
          case 7:
          case 8:
          case 9:
          case 10:
          case 1:
            console.log("hit");
            break;
        }
      } else if (playerScore==18) {
        switch (dealerCards[1].value) {
          case 2:
          case 7:
          case 8:
          case 1:
            console.log("stand");
            break;
          case 3:
          case 4:
          case 5:
          case 6:
            console.log("double");
            break;
          case 9:
          case 10:
              console.log("hit");
              break;
        }
      } else if (playerScore == 19) {
        switch (dealerCards[1].value) {
          case 6:
            console.log("double");
            break;
          case 2:
          case 3:
          case 4:
          case 5:
          case 7:
          case 8:
          case 9:
          case 10:
          case 1:
            console.log("stand");
            break;
        }
      } else if (playerScore >= 20) {
        console.log("stand");
      }
    }
  }

})
