import * as utils from './utils.js';


class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}

class PackOfCards {
    constructor() {
        this.cards = [];
        const suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
        const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }
    shuffle() {
        let currentIndex = this.cards.length, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [
                this.cards[randomIndex], this.cards[currentIndex]];
        }
    }
    give() {
        return (this.cards.pop())
    }
}

export {PackOfCards, Card};