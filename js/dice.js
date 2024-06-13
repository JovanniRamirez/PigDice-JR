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
            else {
                this.changePlayers();
            }
        }
    }
}
function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    return random;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
}
function holdDie() {
    changePlayers();
}
