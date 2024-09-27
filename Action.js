import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function newPrompt() {
    return new Promise((resolve) => {
        rl.question('Enter the value: ', (answer) => {
            resolve(answer);
        });
    });
}

async function handleAction(player, game) {
    let isValid = false;
    let choice;
    while (!isValid) {
        choice = await newPrompt();
        switch (choice) {
            case 'View':
                console.log(player.hand);
                break;
            case 'Fold':
                player.isFold = true;
                player.game.currentNbPlayers--;
                console.log(player.position + " fold");
                isValid = true;
                break;
            case 'Call':
                game.currentPot += player.bet(game.currentBet - player.putInPot);
                console.log(player.position + " call");
                isValid = true;
                break;
            case 'Raise':
                let rawValue;
                let value;
                const minBet = game.currentBet + game.currentBB;
                while (!isValid) {
                    rawValue = await newPrompt();
                    value = parseInt(rawValue, 10);
                    if (!isNaN(value) && (value >= minBet && value <= player.stack || value == player.stack)) {
                        break;
                    }
                    console.log("Min raise: " + minBet);
                }
                console.log(player.position + " raised to " + value);
                game.currentBet = value;
                game.currentPot += player.bet(value - player.putInPot);
                isValid = true;
                break;
            case 'Check':
                if (player.putInPot === game.currentBet) {
                    console.log(player.position + " check");
                    isValid = true;
                    break;
                }
            default:
                console.log("Invalid Choice");
                break;
        }
    }
}

export { handleAction, rl };