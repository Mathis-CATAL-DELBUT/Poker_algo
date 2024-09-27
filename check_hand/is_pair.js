import * as utils from '../utils.js';

function sort_pair(pair_rank, max) {
	let pair_rank_sort = [];
	for (let i = utils.ranks.length - 1; i >= 0; i--)
		for (let j = 0; j < pair_rank.length; j++)
			if (utils.ranks[i] == pair_rank[j].rank)
				if (max == "no" || pair_rank_sort.length < 4)	
					pair_rank_sort.push(pair_rank[j]);
	return (pair_rank_sort);
}

function is_pair(hand, board, max) {
	let pair_rank = [];
	let all_cards = hand.concat(board);
	for (let i = 0; i < all_cards.length; i++)
	{
		for (let j = i + 1; j < all_cards.length; j++)
		{
			if (all_cards[i].rank == all_cards[j].rank && i != j && pair_rank.find(element => element == all_cards[i]) == undefined)
			{
				if (pair_rank.find(element => element == all_cards[i]) == undefined)
					pair_rank.push(all_cards[i]);
				pair_rank.push(all_cards[j]);
			}
		}
	}
	if (pair_rank.length >= 1)
		return (sort_pair(pair_rank, max));
	return (0);
}

export {is_pair};