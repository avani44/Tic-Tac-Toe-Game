let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newGameBtn = document.querySelector("#newGameBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true; // player X and Y

const winPatterns = [[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8]
];

const resetGameBtn = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
};


let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked.");
        if (turnO === true) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a Draw!!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#ffffc7";
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    for(let index of pattern) {
        boxes[index].style.backgroundColor = "#90EE90";
    }
    disabledBoxes();
};

const checkWinner = () => {
    let winnerFound = false;
    for (let patterns of winPatterns) {
        //console.log(patterns[0], patterns[1], patterns[2]);

        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                winnerFound = true;
                showWinner(pos1Val, patterns);
            }
        }
    }
    if(count === 9 && !winnerFound){
        gameDraw();
    }
};

newGameBtn.addEventListener("click", resetGameBtn);
resetbtn.addEventListener("click", resetGameBtn);