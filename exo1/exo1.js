const minNumber = 1;
const maxNumber = 100;
const maxTries = 10;

const secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

let num = secretNumber

let nbTry = 0

process.stdin.on('data', (input) => {
    nbTry++
    if (input < num) {
        console.log('le nombre est plus grand');
    }
    if (input > num) {
        console.log('le nombre est plus petit');
    }
    if (input == num) {
        console.log(`Correct, vous avez trouvé en ${nbTry}`);
        process.exit(0);
    }
    if (nbTry == 10) {
        console.log("Perdu");
        process.exit(0);
    }
    
})