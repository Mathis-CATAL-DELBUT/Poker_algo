function is_quads(hand, board) {
	let all_cards = hand.concat(board);
	let quads = [];
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
						for(let l = k + 1; l < all_cards.length; l++)
						{
							if (all_cards[k].rank == all_cards[l].rank && k != l && j != l && i != l)
							{
								quads.push(all_cards[i]);
								quads.push(all_cards[j]);
								quads.push(all_cards[k]);
								quads.push(all_cards[l]);
								return (quads);
							}
						}
					}
				}
			}
		}
	}
	return (0);
}

export { is_quads};