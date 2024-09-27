import * as utils from '../utils.js';
import { index } from '../utils.js';

function delete_doublon(all_cards) {
	let all_cards_whithout_doublon = [];
	for (let i = 0; i < all_cards.length; i++)
	{
		let j = i + 1;
		while (j < all_cards.length)
		{
			if (all_cards[i].rank == all_cards[j].rank)
			{
				all_cards.splice(j, 1);
				j--;
			}
			j++;
		}
	}
	return (all_cards);
}

function is_quinte(hand, board) {
	let quinte_rank = [];
	const all_cards = delete_doublon(utils.sort_whith_ranks(hand.concat(board)));
	for (let i = all_cards.length - 1; i >= 0; i--)
	{
		let j = i - 1;
		let compteur = 1;
		quinte_rank = [];
		quinte_rank.push(all_cards[i]);
		while (j >= 0)
		{
			if (index(all_cards[i]) - compteur == index(all_cards[j]))
			{
				quinte_rank.push(all_cards[j]);
				if (quinte_rank.length == 5)
					return (quinte_rank);
			}
			else
				break;
			compteur++;
			j--;
		}
	}
	return (0);
}

export {is_quinte};