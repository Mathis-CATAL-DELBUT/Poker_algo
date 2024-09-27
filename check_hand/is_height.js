import * as utils from '../utils.js';

function is_height(hand, bord) {
	let all_cards = hand.concat(bord);
	let master_card = all_cards[0];
	for (let i = 1; i < all_cards.length; i++)
	{
		if(utils.index(all_cards[i]) > utils.index(master_card))
			master_card = all_cards[i];
	}
	return (master_card);
}

export {is_height};