import { is_quinte_flush } from "./is_quinte_flush.js";

function is_quinte_flush_royale(hand, board) {
	let master_card;
	const quinteFlushResult = is_quinte_flush(hand, board);
	if (quinteFlushResult.length > 0)
		master_card = quinteFlushResult.shift();
	if (master_card && master_card.rank == "Ace")
		return (is_quinte_flush(hand, board));
	return (0);
}

export { is_quinte_flush_royale};