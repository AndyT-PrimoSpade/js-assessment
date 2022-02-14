const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

class Field {
    field = [];

    constructor() {
        // The current location of your character
        this.locationX = 0;
        this.locationY = 0;
        // Creating a 2D array
        for (let a = 0; a < col; a++) {
            this.field[a] = [];
        }
        this.generateField(row, col, 0.2);
    }
    generateField(height, width, percentage = 0.1) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                this.field[y][x] = fieldCharacter;
            }
        }
        // Set the hole location
        let holeCount = 0;
        while (holeCount < Math.floor(height * width * percentage)) {
            const holeY = Math.floor(Math.random() * height);
            const holeX = Math.floor(Math.random() * width);
            if (this.field[holeY][holeX] == hat || this.field[holeY][holeX] == pathCharacter) {
                null;
            }
            else {
                this.field[holeY][holeX] = hole;
                holeCount++;
            }
        };
        // Set the hat location
        let hatY, hatX;
        do {
            hatY = Math.floor(Math.random() * height);
            hatX = Math.floor(Math.random() * width);
            this.field[hatY][hatX] = hat;
        } while (hatX == 0 && hatY == 0);

        // Set char location
        this.field[0][0] = pathCharacter;
    }
    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }
    // Ask question and movement
    askQuestion() {
        const answer = prompt("Which way do you want to go? ").toUpperCase();
        if (answer == "U"){
            this.locationY -= 1;
        }
        else if (answer == "D"){
            this.locationY += 1;
        }
        else if (answer == "L"){
            this.locationX -= 1;
        }
        else if (answer == "R"){
            this.locationX += 1;
        }
        else {
        console.log("Enter U, D, L, or R. ");
        this.askQuestion();          
        }
    }
    // start the game and the condition of what happen if lose or win
    runGame() {
        clear();
        let inGame = true;
        while (inGame) {
            this.print();
            this.askQuestion();
            if (!this.inBox()) {
                console.log("Out of box! ~~ GAME OVER!!");
                inGame = false;
                break;
            } else if (this.isHole()) {
                console.log("Sad, you fell into a hole! ~~ GAME OVER!!");
                inGame = false;
                break;
            } else if (this.isHat()) {
                console.log("Congratulation, you have found your hat! ~~ You WIN!");
                inGame = false;
                break;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }
    inBox() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field.length
        );
    }
    isHat() {
        return this.field[this.locationY][this.locationX] == hat;
    }
    isHole() {
        return this.field[this.locationY][this.locationX] == hole;
    }
} // End of Class

const myfield = new Field();
myfield.runGame();
