function computerPlay() {
    let play = ["rock", "paper", "scissor"];
    return play[Math.floor(Math.random()*3)];
}

function playRound(userSelection) {
    let play = ["rock", "paper", "scissor"];
    userSelection = userSelection.toLowerCase();
    if(play.indexOf(userSelection)==-1) {
        console.log("Wrong input");
        return -1;
    }
    let computerSelection = computerPlay();
    let result = play.indexOf(userSelection)-play.indexOf(computerSelection);
    let resultMessage;
    if(result == 1 || result == -2) {
        console.log("You win! " + userSelection + " beats " + computerSelection);
        return 1;
    }
    else if(result == 0) {
        console.log("Draw " + userSelection + " and " + computerSelection);
        return -1;
    }
    else {
        console.log("You lose! " + computerSelection + " beats " + userSelection);
        return 0;
    }

    // console.log(userSelection);
}

function game() {
    let i = 0;
    let totalRound = 0;
    let totalResult = 0;
    let roundResult = 0;
    

    while(i<5) {
        roundResult = playRound();
        if(roundResult != -1) {
            totalResult += roundResult;
            i++;
        }
    }

    if(totalResult > 2) {
            console.log("You win!");
        }
        else {
            console.log("You lose!");
        }
    
}

function startGame() {
    let startArea = document.querySelector(".startButton");
    let playDisplay = document.querySelector(".playSelect");
    startArea.setAttribute('style',"visibility:hidden;")
    playDisplay.setAttribute('style',"visibility:visible;")
}


const startButton = document.querySelector("#btn");
const playButtons = document.querySelectorAll(".playerSelection button");
const playerScore = document.querySelector(".playerScore h2");
const computerScore = document.querySelector(".computerScore h2");
const VS = document.querySelector(".vs");
var roundInput = document.querySelector("#roundNum");
var totalRound = 0;
var playedRound = 0;
var playerWins = 0;
var computerWins = 0;
startButton.addEventListener('click', () => {
    if(roundInput.value>0) {
        totalRound = roundInput.value;
        startGame();
    }
    
}
    );

playButtons.forEach((button) =>
{   
    let playerClick = button.id;
    button.addEventListener('click', () => { 
        let result = playRound(playerClick);
        if(result != -1) {
            playedRound++;
            if(result == 1) {
                playerWins++;
            }
            else {
                computerWins++;
            }
        }
            playerScore.textContent = playerWins;
            computerScore.textContent = computerWins;
            if(playedRound == totalRound) {
                document.querySelector(".reset").setAttribute('style',"visibility: visible");
                if(playerWins == computerWins) {
                    VS.textContent = "Draw!";
                }
                else {
                    VS.textContent = (playerWins>computerWins)? "You Win!" : "You Lose!";
                }
                playButtons.forEach( (buttonsInner) =>{
                    buttonsInner.disabled = 'true';
                }
                
                )
            }
    }
        )
} 
)