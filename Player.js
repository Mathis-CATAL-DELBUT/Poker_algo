import { handleAction } from "./Action.js";

class Player {
    constructor(position, stack, name, game) {
        this.position = position;
        this.stack = stack;
        this.name = name;
        this.game = game;
        this.hand = [];
        this.putInPot = 0;
        this.totalPutInPot = 0;
        this.putInPotLeft = 0;
        this.isFold = false;
        this.bestHand = [];
        this.bestHandValue;
        this.player_ranking;
    }
    resetHand() {
        this.hand = [];
        this.putInPot = 0;
        this.isFold = false;
        this.putInPotLeft = 0;
        this.totalPutInPot = 0;
    }
    resetAfterTour() {
        this.putInPot = 0;
    }
    player_rankingActions() {
        console.log("1. Fold");
        if (this.putInPot < this.game.currentBet) {
            console.log("2. Call");
        } else {
            console.log("2. Check");
        }
        console.log("3. Raise");
    }
    async action() {
        this.player_rankingActions();
        console.log(this.position + " " + this.name + ": " + this.stack);
        await handleAction(this, this.game);
        console.log("-----------------");
    }
    bet(value) {
        if (value >= this.stack) {
            const allIn = this.stack;
            this.stack = 0;
            this.putInPot += allIn;
            this.totalPutInPot += allIn;
            return (allIn);
        }
        this.stack = this.stack - value;
        this.putInPot += value;
        this.totalPutInPot += value;
        return (value);
    }
}

export { Player };