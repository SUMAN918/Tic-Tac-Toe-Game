const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to initialise the game...

const initGame = () => {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI pr empty bhi karna parega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise box with css properties again...
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

initGame();

const swapTurn = () => {
    if(currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

const checkGameOver = () => {
    // all 3 boxes should be non empty and exactly same in value
    let answer ="";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            // check if winner is x
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";
            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

        // now we know X/O is winner 
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
        }
    });
    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // let's check ther is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
    });

    // board is filled, game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
};

const handleClick = index => {
    if(gameGrid[index] ===  "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap to turn
        swapTurn();
        // check to win
        checkGameOver();
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);