import { is_trips } from "./is_trips.js";
import { is_pair } from "./is_pair.js";

function is_full(hand, board) {
	let trips_rank = is_trips(hand, board);
	let pair_rank = is_pair(hand, board, "no");
	let master_trips = [];
	if (!trips_rank || !pair_rank)
		return (0);
	if (trips_rank.length === 6)
	{
		for(let i = 0; i < 3; i++)
			master_trips.push(trips_rank[i]);
		if (trips_rank.shift().rank > trips_rank.pop().rank)
		{
			for(let i = 0; i < pair_rank.length; i++)
				if (pair_rank[i].rank != master_trips[0].rank)
					return (master_trips.concat(pair_rank[i], pair_rank[i + 1]));
		}
	}
	master_trips = [];
	for (let i = 0; i < 3; i++)
		master_trips.push(trips_rank.pop());
	for(let i = 0; i < pair_rank.length; i++)
		if (pair_rank[i].rank != master_trips[0].rank)
			return (master_trips.concat(pair_rank[i], pair_rank[i + 1]));
		return (0);	
}

export { is_full};