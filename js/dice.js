const WINNING_SCORE = 100;
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}
class Game {
    constructor(player1Name, player2Name) {
        this.players = [new Player(player1Name), new Player(player2Name)];
        this.activePlayerIndex = 0;
        this.roundScore = 0;
        this.gamePlaying = true;
    }
    generateRandomValue(minValue, maxValue) {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }
    changePlayers() {
        if (this.activePlayerIndex === 0) {
            this.activePlayerIndex = 1;
        }
        else {
            this.activePlayerIndex = 0;
        }
        this.roundScore = 0;
    }
    rollDie() {
        if (this.gamePlaying) {
            let dice = this.generateRandomValue(1, 6);
            this.currDice = dice;
            if (dice != 1) {
                this.roundScore += dice;
            }
            else {
                this.changePlayers();
            }
        }
    }
    holdDie() {
        if (this.gamePlaying) {
            this.players[this.activePlayerIndex].score += this.roundScore;
            if (this.players[this.activePlayerIndex].score >= WINNING_SCORE) {
                this.gamePlaying = false;
                this.gameWinner();
            }
        }
    }
    gameWinner() {
        if (this.players[this.activePlayerIndex].score >= WINNING_SCORE && this.gamePlaying == false) {
            return `${this.players[this.activePlayerIndex].name} is the winner. Game Over.`;
        }
        return "";
    }
}
let game;
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
    document.getElementById("reset").onclick = resetGame;
};
function createNewGame() {
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (player1Name && player2Name) {
        game = new Game(player1Name, player2Name);
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("die").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        updateCurrentPlayerName();
        if (!game.gamePlaying) {
            document.getElementById("player1").removeAttribute("disabled");
            document.getElementById("player2").removeAttribute("disabled");
        }
    }
    else {
        alert("Must enter both player names!");
    }
}
function rollDie() {
    game.rollDie();
    let currDice = game.currDice;
    let total = game.roundScore;
    document.getElementById("die").value = currDice.toString();
    document.getElementById("total").value = total.toString();
    updateCurrentPlayerName();
    let dots = getDotsPositions(currDice);
    drawDieFace(dots);
}
function drawDieFace(dots) {
    let dieAnimation = document.getElementById("die-animation");
    dieAnimation.innerHTML = '';
    dots.forEach(position => {
        let dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.top = position.top + '%';
        dot.style.left = position.left + '%';
        dieAnimation.appendChild(dot);
    });
}
function getDotsPositions(roll) {
    const positions = {
        1: [{ top: 40, left: 40 }],
        2: [{ top: 15, left: 15 }, { top: 65, left: 65 }],
        3: [{ top: 15, left: 15 }, { top: 40, left: 40 }, { top: 65, left: 65 }],
        4: [{ top: 15, left: 15 }, { top: 15, left: 65 }, { top: 65, left: 15 }, { top: 65, left: 65 }],
        5: [{ top: 15, left: 15 }, { top: 15, left: 65 }, { top: 40, left: 40 }, { top: 65, left: 15 }, { top: 65, left: 65 }],
        6: [{ top: 15, left: 15 }, { top: 15, left: 40 }, { top: 15, left: 65 }, { top: 65, left: 15 }, { top: 65, left: 40 }, { top: 65, left: 65 }]
    };
    return positions[roll];
}
function holdDie() {
    game.holdDie();
    let currTotal = game.roundScore;
    let currPlayer = game.activePlayerIndex;
    document.getElementById("score" + (currPlayer + 1)).value =
        game.players[game.activePlayerIndex].score.toString();
    document.getElementById("total").value = "0";
    document.getElementById("die").value = "0";
    let winnerMessage = game.gameWinner();
    if (winnerMessage != "") {
        document.getElementById("winner").textContent = winnerMessage;
    }
    else {
        game.changePlayers();
        updateCurrentPlayerName();
    }
}
function updateCurrentPlayerName() {
    let currentPlayerName = game.players[game.activePlayerIndex].name;
    let currentPlayerSpan = document.getElementById("current");
    currentPlayerSpan.innerText = currentPlayerName;
}
function resetGame() {
    document.getElementById("player1").removeAttribute("disabled");
    document.getElementById("player2").removeAttribute("disabled");
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    document.getElementById("score1").value = "";
    document.getElementById("score2").value = "";
    document.getElementById("turn").classList.remove("open");
    game.gamePlaying = true;
    drawDieFace(1);
}
