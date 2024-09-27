import { is_height} from './check_hand/is_height.js';
import { Card, PackOfCards } from './Cards.js';
import { is_pair } from './check_hand/is_pair.js';
import { is_trips } from './check_hand/is_trips.js';
import { is_quinte } from './check_hand/is_quinte.js';
import { is_flush } from './check_hand/is_flush.js';
import * as utils from './utils.js';
import { is_full } from './check_hand/is_full.js';
import { is_quads } from './check_hand/is_quads.js';
import { is_quinte_flush } from './check_hand/is_quinte_flush.js';
import { is_quinte_flush_royale } from './check_hand/is_quinte_flush_royale.js';
import { Player } from './Player.js';

const ValueHand = ["height", "pair", "two_pairs", "trips", "quinte", "flush", "full", "quads", "quinte_flush", "quinte_flush_royale"];

function best_hand(player, board) {
	
	if (is_quinte_flush_royale(player.hand, board) != 0)
		return(player.bestHand = is_quinte_flush_royale(player.hand, board) , player.bestHandValue = "quinte_flush_royale");
	if(is_quinte_flush(player.hand, board) != 0)
		return(player.bestHand = is_quinte_flush(player.hand, board) , player.bestHandValue = "quinte_flush");
	if(is_quads(player.hand, board) != 0)
		return(player.bestHand = is_quads(player.hand, board) , player.bestHandValue = "quads");
	if (is_full(player.hand, board) != 0)
		return(player.bestHand = is_full(player.hand, board) , player.bestHandValue = "full");
	if (is_flush(player.hand, board) != 0)
		return(player.bestHand = is_flush(player.hand, board) , player.bestHandValue = "flush");
	if (is_quinte(player.hand, board) != 0)
		return(player.bestHand = is_quinte(player.hand, board) , player.bestHandValue = "quinte");
	if (is_trips(player.hand, board) != 0)
		return(player.bestHand = is_trips(player.hand, board) , player.bestHandValue = "trips");
	if (is_pair(player.hand, board, "yes") != 0)
	{
		if (is_pair(player.hand, board, "yes").length == 4)
			return(player.bestHand = is_pair(player.hand, board, "yes") , player.bestHandValue = "two_pairs");
		return(player.bestHand = is_pair(player.hand, board, "yes") , player.bestHandValue = "pair");
	}
	if (is_height(player.hand, board) != 0)
		return(player.bestHand = [is_height(player.hand, board)] , player.bestHandValue = "height");
	return null;
}

function best_5_cards(player, board) {
	let all_cards = player.hand.concat(board);
	let best_5_cards = [];
	if (player.bestHand.length == 1)
		all_cards.splice(all_cards.indexOf(player.bestHand), 1);
	else 
	{
		player.bestHand.forEach((card) => {
			best_5_cards.push(card);
			all_cards.splice(all_cards.indexOf(card), 1);
		})
	}
	while (best_5_cards.length < 5)
	{
		best_5_cards.push(is_height(all_cards, []));
		all_cards.splice(all_cards.indexOf(is_height(all_cards, [])), 1);
	}
	return (best_5_cards);
}

function sameBestHand(player1, player2, board) {
	let firstHand, secondHand, i;
	i = 0;
	firstHand = best_5_cards(player1, board);
	secondHand = best_5_cards(player2, board);
	while (i < 5 && firstHand[i].rank == secondHand[i].rank) {
		i++;
	}
	if (i == 5)
		return (null);
	if (utils.index(firstHand[i]) > utils.index(secondHand[i])) {
		return (player1);
	}
	return (player2);
}

function orderHand(players) {
	for (let i = 0; i < players.length - 1; i++) {
		if (ValueHand.indexOf(players[i].bestHandValue) < ValueHand.indexOf(players[i + 1].bestHandValue)) {
			let tmp = players[i];
			players[i] = players[i + 1];
			players[i + 1] = tmp;
			orderHand(players);
		}
	}
}

function checkSameHand(final_table, board) {
	let i = 0;
	while (i < final_table.length - 1) {
		if (final_table[i][0].bestHandValue == final_table[i + 1][0].bestHandValue &&
			sameBestHand(final_table[i][0], final_table[i + 1][0], board) != final_table[i][0])
			return (false);
		i++;
	}
	return (true);
}

function orderSameHand(players, board) {
	for (let i = 0; i < players.length - 1; i++) {
		if (players[i].bestHandValue == players[i + 1].bestHandValue &&
			sameBestHand(players[i], players[i + 1], board) == players[i + 1]) {
			let tmp = players[i];
			players[i] = players[i + 1];
			players[i + 1] = tmp;
			orderSameHand(players, board);
		}
		else if (players[i].bestHandValue == players[i + 1].bestHandValue &&
			sameBestHand(players[i], players[i + 1], board) == null )
				players[i + 1].player_ranking = "same";
	}
}

function orderplayer_ranking(players) {
	let player_ranking = 1;
	for (let i = 0; i < players.length; i++) {
		if (players[i].player_ranking == "same")
			players[i].player_ranking = player_ranking - 1;
		else
			players[i].player_ranking = player_ranking++;
	}
}

// POUR METTRE DES CARTES PRECISES
// function player_ranking()
// {
// 	const players = [];
// 	const board = [new Card("Clubs", "Ace"), new Card("Diamond", "Ace"), new Card("Clubs", "5"), new Card("Spades", "2"), new Card("Spades", "9")];
	
// 	const player1 = new Player("player1", 1000, "Latac");
// 	player1.hand = [new Card("Diamond", "King"), new Card("Clubs", "4")];
	
// 	const player2 = new Player("player2", 1000, "Skowy");
// 	player2.hand = [new Card("Spades", "6"), new Card("Diamond", "7")];

// 	const player3 = new Player("player3", 1000, "Dav");
// 	player3.hand = [new Card("Spades", "2"), new Card("Spades", "10")];

// 	const player4 = new Player("player4", 1000, "Elsky");
// 	player4.hand = [new Card("Spades", "Ace"), new Card("Diamond", "Jack")];
	
// 	players.push(player1);
// 	players.push(player2);
// 	players.push(player3);
// 	players.push(player4);

// 	players.forEach((player) => {
// 		console.log(player.name);
// 		console.log(player.hand);
// 	})

// 	players.forEach((player) => {
// 		best_hand(player, board);
// 	})
// 	orderHand(players);
// 	orderSameHand(players, board);
// 	orderplayer_ranking(players);
// 	console.log(players);
// }
// player_ranking();



function player_ranking(remainingPlayers, board)
{
	remainingPlayers.forEach((player) => {
		console.log(player.name);
		console.log(player.hand);
	})

	remainingPlayers.forEach((player) => {
		best_hand(player, board);
	})
	orderHand(remainingPlayers);
	orderSameHand(remainingPlayers, board);
	orderplayer_ranking(remainingPlayers);
}

export {player_ranking};
