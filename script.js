const gameInfo = document.querySelector(".game-info");
const board = document.querySelector(".tic-tac-toe");
const boxes = document.querySelectorAll(".box");
const newGame = document.querySelector(".btn");
const optionchoosingCard = document.querySelector(".choose-card")
const firstoption = document.getElementById("first");
const secondoption = document.getElementById("second");
const gameBGM = new Audio('./assets/music.mp3');

let currentPlayer;
let gameGrid;
let userSelection;

const winningPositions = [

    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6]
]

// Let's create a function that handles user selection for the desired player
function userSelectionHandler(){
    
    optionchoosingCard.classList.add('active');
    newGame.classList.remove("active");
    board.classList.remove("active");
    gameInfo.classList.remove("active");

    firstoption.addEventListener("click" , () => {

        userSelection = firstoption.innerText;
        optionchoosingCard.classList.remove('active');
        gameBGM.play();
        init();
    });
    
    secondoption.addEventListener("click" , () => {
    
        userSelection = secondoption.innerText;
        optionchoosingCard.classList.remove('active');
        gameBGM.play();
        init();
    })

}

// Call the function
userSelectionHandler();

// Let's create a function to initialize the game
function init(){

    currentPlayer = userSelection;

    // Make the Game Grid Empty
    gameGrid = ["" , "" , "" , "" , "" , "" , "" , "" , ""];

    // UI Update
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
    gameInfo.classList.add('active');
    board.classList.add('active');

}


function swapTurn(){

    if(currentPlayer === "X"){

        currentPlayer = "O";

    }

    else{

        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){

    let answer = "";
    winningPositions.forEach((position) => {

        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            // Check if winner is X
            if(gameGrid[position[0]] === "X"){

                answer = "X";
            }

            else{

                answer = "O";
            }

            // Now make all the boxes unclickable
            boxes.forEach((box) => {

                box.style.pointerEvents = "none";
            })
            // Now we know the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    })

    if(answer!=""){

        gameInfo.innerText = `Winning Player - ${answer}`;
        newGame.classList.add("active");
        return;
    }

    // Let's check for a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){

            fillCount++;
        }
    });

    if(fillCount === 9){

        gameInfo.innerText = "Game Tied";
        newGame.classList.add("active");

    }

}


function handleClick(index){

    if(gameGrid[index] === ""){

        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // Now Swap the turns
        swapTurn();

        // Check whether the game is over or not
        checkGameOver();
    }

}

boxes.forEach((box , index) => {

    box.addEventListener("click" , () => {

        handleClick(index);

    })
});

newGame.addEventListener("click" , userSelectionHandler);