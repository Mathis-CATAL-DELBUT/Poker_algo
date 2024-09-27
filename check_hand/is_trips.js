import * as utils from '../utils.js';

function is_trips(hand, board) {
	let all_cards = hand.concat(board);
	let trips_rank = [];
	for (let i = 0; i < all_cards.length; i++)
	{
		for (let j = i + 1; j < all_cards.length; j++)
		{
			if (all_cards[i].rank == all_cards[j].rank && i != j)
			{
				for(let k = j + 1; k < all_cards.length; k++)
				{
					if (all_cards[j].rank == all_cards[k].rank && j != k && i != k)
					{
						trips_rank.push(all_cards[i]);	
						trips_rank.push(all_cards[j]);
						trips_rank.push(all_cards[k]);
					}
				}
			}
		}
	}
	if (trips_rank.length >= 1)
		return (utils.sort_whith_ranks(trips_rank).reverse());
	return (0);
}

export {is_trips};