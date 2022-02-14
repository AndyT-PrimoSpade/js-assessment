// Version 2 is about the same just that trying to shorten the code (npm run main1)
// and to ensure the character will reach the hat without hole blocking (still working on this)

const prompt = require("prompt-sync")({sigint: true});
const clear = require("clear-screen");

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;
    }
    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }
        const hatLocation = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * width);
            hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }
    runGame() {
        clear();
        // Hard mode not working yet
        let hardMode = prompt("\nWould you dare to try in hard mode? ('Y' for Yes, 'N' for No)");
  	    if (hardMode.toUpperCase() == 'Y') {
  		    hardMode = true;
  		    console.log('Playing in hard mode!\n');
  	    }
  	    else {
  		    hardMode = false;
  	    }
        
        let inGame = true;
        while (inGame) {
            this.print();
            this.askQuestion();
            if (!this.inBox()) {
                console.log("Out of box! ~~ GAME OVER!!");
                inGame = false;
            } else if (this.isHole()) {
                console.log("Sad, you fell into a hole! ~~ GAME OVER!!");
                inGame = false;
            } else if (this.isHat()) {
                console.log("Congratulation, you have found your hat! ~~ You WIN!");
                inGame = false;
            }
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }
    askQuestion() {
        const answer = prompt("Which way do you want to go?").toUpperCase();
        switch (answer) {
            case "W":
                this.locationY -= 1;
                break; 
            case "S":
                this.locationY += 1;
                break;
            case "A":
                this.locationX -= 1;
                break;
            case "D":
                this.locationX += 1;
                break;
            // Reset not working yet
            case "RESET":
                inGame = false;
                myField.runGame();
                break;

            default:
                console.log("Enter W = UP, S = DOWN, A = LEFT, D = RIGHT & RESET to Restart");
                this.askQuestion();
                break;
        }
    }
    inBox() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }
    isHat() {
        return this.field[this.locationY][this.locationX] == hat;
    }
    isHole() {
        return this.field[this.locationY][this.locationX] == hole;
    }
    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }
}
const myField = new Field(Field.generateField(10, 10, 0.2));
myField.runGame();
