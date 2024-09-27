import * as utils from '../utils.js';

function is_quinte_flush(hand, board) {
	let quinte_flush_rank = [];
	const all_cards = utils.sort_whith_ranks(hand.concat(board));
	for (let i = all_cards.length - 1; i >= 0; i--)
	{
		let j = i - 1;
		let compteur = 1;
		quinte_flush_rank = [];
		quinte_flush_rank.push(all_cards[i]);
		while (j >= 0)
		{
			if (utils.index(all_cards[i]) - compteur == utils.index(all_cards[j]) && all_cards[i].suit == all_cards[j].suit)
			{
				quinte_flush_rank.push(all_cards[j]);
				if (quinte_flush_rank.length == 5)
					return (quinte_flush_rank);
			}
			else if (utils.index(all_cards[i]) - compteur + 1 != utils.index(all_cards[j]) && utils.index(all_cards[i]) - compteur != utils.index(all_cards[j]))
				break;
			if (utils.index(all_cards[i]) - compteur == utils.index(all_cards[j]) && all_cards[i].suit == all_cards[j].suit)
				compteur++;
			j--;
		}
	}
	return (0);
}

export { is_quinte_flush};