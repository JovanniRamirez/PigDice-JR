class Player {
    name: string;
    score: number;
    
    constructor(name: string) {
        this.name = name;
        this.score = 0;
    }
}

class Game {
    players: Player[];
    activePlayerIndex: number;
    roundScore: number;
    gamePlaying: boolean;

    /**
     * 
     * @param player1Name 
     * @param player2Name 
     */
    constructor(player1Name: string, player2Name: string){
        this.players = [new Player(player1Name), new Player(player2Name)];
        this.activePlayerIndex = 0;
        this.roundScore = 0;
        this.gamePlaying = true;
    }

    generateRandomValue(minValue: number, maxValue: number): number{
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }

    changePlayers(): void{
        //If the active player is Player 1 (index 0)
        if (this.activePlayerIndex === 0) {
            //change the active player to Player 2
            this.activePlayerIndex = 1;
        }
        else {
            //If the active player is Player 2 (index 1)
            this.activePlayerIndex = 0;
        }
        //Reset the round score to 0
        this.roundScore = 0;

        
    }

    rollDie(): void {
        if (this.gamePlaying) {
            let dice = this.generateRandomValue(1, 6);
            if (dice != 1) {
                this.roundScore += dice;
                this.updateRoundScoreUI();
            }
            else {
                this.changePlayers();
            }
        }
    }

    holdDie(): void {
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


    updateRoundScoreUI(): void{
        
    }
}

let game: Game;

window.onload = function(){
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    newGameBtn.onclick = createNewGame;

    (<HTMLButtonElement>document.getElementById("roll")).onclick = rollDie;

    (<HTMLButtonElement>document.getElementById("hold")).onclick = holdDie;
}

function createNewGame(){
    //set player 1 and player 2 scores to 0

    //verify each player has a name
    //if both players don't have a name display error

    //if both players do have a name start the game!
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    if (player1Name && player2Name) {
        game = new Game(player1Name, player2Name);
        (<HTMLElement>document.getElementById("turn")).classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
        (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
        
        //Update the current player's name in the span
        let currentPlayerSpan = document.getElementById("current") as HTMLElement;
        currentPlayerSpan.innerText = game.players[game.activePlayerIndex].name;
    }
    else {
        //Display Error
    }
}

function rollDie():void{
    
    game.rollDie();

    let currTotal = game.roundScore;

    (<HTMLInputElement>document.getElementById("total")).value = currTotal.toString();
}

function holdDie():void{
    game.holdDie();
    //get the current turn total
    //determine who the current player is
    //add the current turn total to the player's total score

    //reset the turn total to 0

    //change players
    //changePlayers();
}