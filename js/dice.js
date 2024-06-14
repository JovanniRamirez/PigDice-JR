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
            if (this.players[this.activePlayerIndex].score >= 100) {
                this.gamePlaying = false;
            }
        }
    }
}
let game;
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    if (player1Name && player2Name) {
        game = new Game(player1Name, player2Name);
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        updateCurrentPlayerName();
        if (!game.gamePlaying) {
            document.getElementById("player1").removeAttribute("disabled");
            document.getElementById("player2").removeAttribute("disabled");
        }
    }
    else {
    }
}
function rollDie() {
    game.rollDie();
    let currDice = game.currDice;
    let total = game.roundScore;
    document.getElementById("die").value = currDice.toString();
    document.getElementById("total").value = total.toString();
}
function holdDie() {
    game.holdDie();
    let currTotal = game.roundScore;
    let currPlayer = game.activePlayerIndex;
    document.getElementById("score" + (currPlayer + 1)).value =
        game.players[game.activePlayerIndex].score.toString();
    document.getElementById("total").value = "0";
    document.getElementById("die").value = "0";
    game.changePlayers();
    updateCurrentPlayerName();
}
function updateCurrentPlayerName() {
    let currentPlayerName = game.players[game.activePlayerIndex].name;
    let currentPlayerSpan = document.getElementById("current");
    currentPlayerSpan.innerText = currentPlayerName;
}
