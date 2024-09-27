import Game from './Game.js';

async function main() {
    const poker = new Game(1500, 20, 5);
    poker.addPlayer("Latac");
    poker.addPlayer("Davidi Kitai");
    poker.addPlayer("Skowy");
    // poker.addPlayer("Elky");
    await poker.start();
}

main();
