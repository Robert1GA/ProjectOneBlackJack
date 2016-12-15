function checkForHints(){
  playerScore = calculateScore(playerCards);
  if ((playerCards[0].value == playerCards[1].value) && totalCards == 1) {
    if (playerCards[0].value == 1 || playerCards[0].value == 8) {
      hintSplit();
    } else if (playerCards[0].value == 10) {
      hintStand();
    } else if (playerCards[0].value == 2) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          hintSplit();
          break;
        case 8:
        case 9:
        case 10:
        case 1:
          hintHit();
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
          hintSplit();
          break;
        case 9:
        case 10:
        case 1:
          hintHit();
          break;
      }
    } else if (playerCards[0].value == 4) {
      switch (dealerCards[1].value) {
        case 4:
        case 5:
        case 6:
          hintSplit();
          break;
        case 2:
        case 3:
        case 7:
        case 8:
        case 9:
        case 10:
        case 1:
          hintHit();
          break;
      }
    } else if (playerCards[0].value ==  5) {
      hintDouble();
    } else if (playerCards[0].value == 6) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          hintSplit();
          break;
        case 8:
        case 9:
        case 10:
        case 1:
          hintHit();
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
          hintSplit();
          break;
        case 9:
        case 1:
          hintHit();
          break;
        case 10:
          hintStand();
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
          hintSplit();
          break;
        case 7:
        case 10:
        case 1:
          hintStand();
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
            hintHit();
            break;
          case 4:
          case 5:
          case 6:
            hintDouble();
            break;
        }
      } else if (playerScore==17) {
        switch (dealerCards[1].value) {
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            hintDouble();
            break;
          case 7:
          case 8:
          case 9:
          case 10:
          case 1:
            hintHit();
            break;
        }
      } else if (playerScore==18) {
        switch (dealerCards[1].value) {
          case 2:
          case 7:
          case 8:
          case 1:
            hintStand();
            break;
          case 3:
          case 4:
          case 5:
          case 6:
            hintDouble();
            break;
          case 9:
          case 10:
              hintHit();
              break;
        }
      } else if (playerScore == 19) {
        switch (dealerCards[1].value) {
          case 6:
            hintDouble();
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
            hintStand();
            break;
        }
      } else if (playerScore >= 20) {
        hintStand();
      }
    } else if (playerScore < 8) {
      hintHit();
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
          hintHit();
          break;
        case 5:
        case 6:
          hintDouble();
          break;
      }
    } else if (playerScore == 9) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          hintDouble();
          break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 1:
          hintHit();
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
          hintDouble();
          break;
        case 10:
        case 1:
          hintHit();
          break;
      }
    } else if (playerScore == 11) {
      hintDouble();
    } else if (playerScore == 12) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 7:
        case 8:
        case 9:
        case 10:
        case 1:
          hintHit();
          break;
        case 4:
        case 5:
        case 6:
          hintStand();
          break;
      }
    } else if (playerScore >= 13 && playerScore <= 16) {
      switch (dealerCards[1].value) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
          hintStand();
          break;
        case 7:
        case 8:
        case 9:
        case 10:
        case 1:
          hintHit();
          break;
      }
    } else if (playerScore >= 17) {
      hintStand();
    }
}

function hintStand() {
  $("#modal").html("You should stand.");
}

function hintHit() {
  $("#modal").html("You should hit.");
}

function hintDouble() {
  $("#modal").html("You should double down. Hit if double not available.");
}

function hintSplit() {
  $("#modal").html("You should split.");
}


var modal = document.getElementById('hintModal');
var span = document.getElementsByClassName("close")[0];

// closes the modal
span.onclick = function() {
    // modal.style.display = "none";
    $("#hintModal").css("display","none");
}

// closes the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        // $("#hintModal").css("display","none");
    }
}
