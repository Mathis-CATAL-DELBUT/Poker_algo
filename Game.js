import { Player } from "./Player.js";
import { PackOfCards } from "./Cards.js"
import { player_ranking } from "./player_ranking.js";
import { rl } from "./Action.js"

class Game {
	constructor(startStack, initBlind, timeInterval) {
		this.startStack = startStack;
		this.timeInterval = timeInterval;
		this.numbersOfPlayers = 0;
		this.currentNbPlayers = 0;
		this.currentBB = initBlind;
		this.currentPot = 0;
		this.currentBet = 0;
		this.currentBoard = [];
		this.currentCards;
		this.players = [];
		this.order;
		this.playerRemaining = [];
		this.position = ["SB", "BB", "DEALER", "UTG", "CUT-OFF", "HI-JACK"];
		this.curInitPos = 0;
	}
	addPlayer(name) {
		if (this.numbersOfPlayers < 6) {
			this.players.push(new Player(this.position[this.curInitPos++], this.startStack, name, this));
			this.numbersOfPlayers++;
		} else {
			console.log("Table full cannot add " + name);
		}
	}
	reassignPosition() {
		let i, rotaLength, nextBBPlayer, nextPos, curBB;
		this.currentNbPlayers = this.players.length;
		curBB = this.players.find(player => player.position === "BB");
		if (curBB) {
			curBB.position = "SB";
		}
		const rotaOrder = ["UTG", "HI-JACK", "CUT-OFF", "DEALER", "SB"];
		rotaLength = rotaOrder.length;
		nextPos = 0;
		i = -1;
		while (++i < rotaLength) {
			nextBBPlayer = this.players.find(player => player.position === rotaOrder[i]);
			if (nextBBPlayer) {
				nextBBPlayer.position = "BB";
				break;
			}
		}
		if (this.numbersOfPlayers == 2)
			return;
		switch (this.numbersOfPlayers) {
			case 2:
				this.postion = ["SB"];
				break;
			case 3:
				this.position = ["DEALER", "SB"];
				break;
			case 4:
				this.position = ["UTG", "DEALER", "SB"];
				break;
			case 5:
				this.position = ["UTG", "CUT-OFF", "DEALER", "SB"];
				break;
			case 6:
				this.position = ["UTG", "HI-JACK", "CUT-OFF", "DEALER", "SB"];
				break;
		}
		for (let j = i; j < rotaLength; j++) {
			if (this.players.find(player => player.position === rotaOrder[j])) {
				this.players.find(player => player.position === rotaOrder[j]).position = this.position[nextPos++];
			}
		}
	}
	turn_river() {
		if (this.currentNbPlayers >= 2) {
			this.currentCards.give();
			this.currentBoard.push(this.currentCards.give());
			console.log(this.currentBoard);
			this.resetBet();
			console.log(this.currentPot);
		}
	}
	flop() {
		// this.currentBoard.push(new Card("Clubs", "6"));
		// this.currentBoard.push(new Card("Spades", "8"));
		// this.currentBoard.push(new Card("Clubs", "King"));
		// this.currentBoard.push(new Card("Spades", "10"));
		// this.currentBoard.push(new Card("Clubs", "3"));
		if (this.currentNbPlayers >= 2) {
			this.currentCards.give();
			this.currentBoard.push(this.currentCards.give());
			this.currentBoard.push(this.currentCards.give());
			this.currentBoard.push(this.currentCards.give());
			console.log(this.currentBoard);
			this.resetBet();
			console.log(this.currentPot);
		}
	}
	giveHand() {
		// this.players.forEach((player) => {
		//     if(player.name === "Latac")
		//     {
		//         player.hand.push(new Card("Diamond", "9"));
		//         player.hand.push(new Card("Clubs", "9"));
		//     }
		//     else if(player.name === "Skowy")
		//     {
		//         player.hand.push(new Card("Spades", "8"));
		//         player.hand.push(new Card("Diamond", "King"));
		//     }
		//     else
		//     {
		//         player.hand.push(new Card("Spades", "King"));
		//         player.hand.push(new Card("Diamond", "8"));
		//     }
		// })
		for (let i = 0; i < 2; i++) {
			this.players.forEach((player) => {
				if (player.position !== "DEALER") {
					player.hand.push(this.currentCards.give());
				}
			});
			let dealer = this.players.find(player => player.position === "DEALER");
			if (dealer) {
				dealer.hand.push(this.currentCards.give());
			}
		}
	}
	checkPlayersStack() {
		let notNullStack = 0;
		this.players.forEach((player) => {
			if (player.stack > 0) {
				notNullStack++;
			}
		});
		if (notNullStack >= 2)
			return true;
		return false;
	}
	checkPlayersBet() {
		let check = true;
		this.players.forEach((player) => {
			if (player.isFold === false && player.putInPot < this.currentBet && player.stack > 0) {
				check = false;
			}
		});
		return check;
	}
	resetBet() {
		this.players.forEach((player) => { player.resetAfterTour() })
		this.currentBet = 0;
	}
	async playTour() {
		let firstTour = true;
		if (this.checkPlayersStack() === false)
			return;
		while ((this.checkPlayersBet() === false || firstTour === true) && this.currentNbPlayers >= 2) {
			for (let i = 0; i < this.order.length && this.currentNbPlayers >= 2; i++) {
				let currentPlayer = this.players.find(player => player.position === this.order[i]);
				if (currentPlayer && currentPlayer.isFold === false && currentPlayer.stack > 0) {
					if (firstTour === true || (firstTour === false && currentPlayer.putInPot !== this.currentBet)) {
						await currentPlayer.action();
					}
				}
			}
			firstTour = false;
		}
	}
	async firstTour() {
		switch (this.numbersOfPlayers) {
			case 2:
				this.order = ["SB", "BB"];
				break;
			case 3:
				this.order = ["DEALER", "SB", "BB"];
				break;
			default:
				this.order = ["UTG", "HI-JACK", "CUT-OFF", "DEALER", "SB", "BB"];
				break;
		}
		await this.playTour();
	}
	async tour() {
		switch (this.numbersOfPlayers) {
			case 2:
				this.order = ["BB", "SB"];
			case 3:
				this.order = ["SB", "BB", "DEALER"];
			default:
				this.order = ["SB", "BB", "UTG", "HI-JACK", "CUT-OFF", "DEALER"];
		}
		await this.playTour();
	}
	newTurnInit() {
		let BBPlayer, SBPlayer;
		this.currentCards = new PackOfCards();
		this.currentCards.shuffle();
		this.giveHand();
		BBPlayer = this.players.find(player => player.position === "BB");
		SBPlayer = this.players.find(player => player.position === "SB");
		this.currentPot += BBPlayer.bet(this.currentBB);
		if (SBPlayer)
			this.currentPot += SBPlayer.bet(this.currentBB / 2);
		this.currentBet = this.currentBB;
		this.currentNbPlayers = this.numbersOfPlayers;
	}
	async start() {
		while (this.numbersOfPlayers >= 2) {
			console.log("---------New Hand-----------");
			this.newTurnInit();
			await this.firstTour();
			this.flop();
			for (let i = 0; i < 2; i++) {
				await this.tour();
				this.turn_river();
			}
			await this.tour();
			this.remainingPlayers();
			player_ranking(this.playerRemaining, this.currentBoard);
			this.split_pot();
			this.playerRemaining.forEach((player) => {
				console.log(player.player_ranking);
				console.log(player.name + " -> " + player.stack);
			})
			this.prepareForNextHand();
		}
		rl.close();
	}
	remainingPlayers() {
		this.playerRemaining = [];
		this.players.forEach((player) => {
			if (player.isFold === false) {
				this.playerRemaining.push(player);
			}
		});
	}
	prepareForNextHand() {
		this.currentPot = 0;
		this.currentBoard = [];
		this.currentBet = 0;
		this.players = this.players.filter((player) => player.stack > 0);
		this.players.forEach((player) => {
			player.resetHand();
		});
		this.numbersOfPlayers = this.players.length;
		this.position = this.position.slice(0, this.numbersOfPlayers);
		if (this.numbersOfPlayers >= 2)
			this.reassignPosition();
	}
	split_pot() {
		this.players.forEach((player) => { player.putInPotLeft = player.totalPutInPot });
		let classement = 1;
		let same_player = [];
		for (let i = 0; i < this.playerRemaining.length; i++) {
			let same_nbr = 0;
			same_player = [];
			for (let j = 0; j < this.playerRemaining.length; j++) {
				if (this.playerRemaining[j].player_ranking == classement) {
					same_nbr++;
					same_player.push(this.playerRemaining[j]);
				}
			}
			if (same_nbr == 1) {
				this.players.forEach((player) => {
					if (this.playerRemaining[i].totalPutInPot < player.putInPotLeft) {
						player.putInPotLeft = player.putInPotLeft - this.playerRemaining[i].totalPutInPot;
						this.playerRemaining[i].stack += this.playerRemaining[i].totalPutInPot;
					}
					else {
						let total = player.putInPotLeft;
						player.putInPotLeft = 0;
						this.playerRemaining[i].stack += total;
					}
				})
			}
			else {
				let total;
				same_player.forEach((player) => {
					total += player.totalPutInPot;
				})
				this.players.forEach((player) => {
					if (total < player.putInPotLeft) {
						same_player.forEach((remaining) => {
							remaining.stack += remaining.totalPutInPot;
							player.putInPotLeft = player.putInPotLeft - remaining.totalPutInPot;
						})
					}
					else {
						same_player.forEach((remaining) => {
							remaining.stack += player.putInPotLeft / same_nbr;
						})
						player.putInPotLeft = 0;
					}
				})
				i += same_nbr - 1;
			}
			classement++;
		}
	}
}

export default Game;