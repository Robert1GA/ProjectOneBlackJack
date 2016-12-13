function checkForTips(){
  playerScore = calculateScore(playerCards);
  if (playerCards[0].value == playerCards[1].value) {
    if (playerCards[0].value == 1 || playerCards[0].value == 8) {
      console.log("split");
    } else if (playerCards[0].value == 10) {
      console.log("stand");
    } else if (playerCards[0].value == 2) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          console.log("split");
          break;
        case 8:
        case 9:
        case 10:
        case 1:
          console.log("hit");
          break;
      }
    } else if (playerCards[0].value == 3) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          console.log("split");
          break;
        case 9:
        case 10:
        case 1:
          console.log("hit");
          break;
      }
    } else if (playerCards[0].value == 4) {
      switch (dealerCards[1].value) {
        case 4:
        case 5:
        case 6:
          console.log("split");
          break;
        case 2:
        case 3:
        case 7:
        case 8:
        case 9:
        case 10:
        case 1:
          console.log("hit");
          break;
      }
    } else if (playerCards[0].value ==  5) {
      console.log("double");
    } else if (playerCards[0].value == 6) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          console.log("split");
          break;
        case 8:
        case 9:
        case 10:
        case 1:
          console.log("hit");
          break;
      }
    } else if (playerCards[1].value == 7) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          console.log("split");
          break;
        case 9:
        case 1:
          console.log("hit");
          break;
        case 10:
          console.log("stand");
          break;
      }
    } else if (playerCards[1].value == 9) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 8:
        case 9:
          console.log("split");
          break;
        case 7:
        case 10:
        case 1:
          console.log("stand");
          break;
      }
    }
  } else if (playerCards[0].value == 1 || playerCards[1].value == 1) {
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
    } else if (playerScore < 8) {
      console.log("hit");
    } else if (playerScore == 8) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 7:
        case 8:
        case 9:
        case 10:
        case 1:
          console.log("hit");
          break;
        case 5:
        case 6:
          console.log("double");
          break;
      }
    } else if (playerScore == 9) {
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
    } else if (playerScore == 10) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          console.log("double");
          break;
        case 10:
        case 1:
          console.log("hit");
          break;
      }
    } else if (playerScore == 11) {
      console.log("double");
    } else if (playerScore == 12) {
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
          console.log("stand");
          break;
      }
    } else if (playerScore >= 13 || playerScore <= 16) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          console.log("stand");
          break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 1:
          console.log("hit");
          break;
      }
    } else if (playerScore >= 17) {
      console.log("stand");
    }
}
