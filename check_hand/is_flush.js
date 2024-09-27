import * as utils from '../utils.js';

function is_flush(hand, board) {
	let flush_rank = [];
	const all_cards = utils.sort_whith_ranks(hand.concat(board));
	for (let i = all_cards.length - 1; i > 0; i--)
	{
		let j = i - 1;
		flush_rank.push(all_cards[i]);
		while (j >= 0)
		{
			if (all_cards[i].suit == all_cards[j].suit)
			{
				flush_rank.push(all_cards[j]);
				if (flush_rank.length == 5)
					return (flush_rank);
			}
			j--;
		}
		flush_rank = [];
	}
	return (0);
}

export {is_flush};