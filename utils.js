const suits = ["Spades", "Hearts", "Diamonds", "Clubs"]
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"]

function sort_whith_ranks(all_cards) {
	let all_cards_sort = [];
	for (let i = 0; i <= ranks.length; i++)
		for (let j = 0; j < all_cards.length; j++)
			if (ranks[i] == all_cards[j].rank)
				all_cards_sort.push(all_cards[j]);
	return (all_cards_sort);
}

function index(card) {
	for (let i = 0; i < ranks.length; i++)
		if (card.rank == ranks[i]) 
				return (i);
	return (0);
}

export {suits, ranks, sort_whith_ranks, index};