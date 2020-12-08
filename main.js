const prompt = require('prompt-sync')({sigint: true});
const term = require( 'terminal-kit' ).terminal ;

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.holesPercentage = 0.3;
        this.field = this.generateField(rows, cols);
        this.posX = 0;
        this.posY = 0;
    }

    // generate a random domain based on the user's input
    generateField(rows, cols){

        let field = [];

        if(rows <= 0 || cols <= 0){
            throw Error("Row and column should be larger than zero. Try again.");
        }
        else{
            let totalTiles = rows * cols;
            let holesNumber = Math.floor(totalTiles * this.holesPercentage);
            // init domain (all tiles)
            for(let i = 0; i < this.rows; i++){
                field.push([]);
                for(let j = 0; j < this.cols; j++){
                    field[i].push(fieldCharacter);
                }
            }
            // set the (0, 0) node as starting point
            field[0][0] = pathCharacter;

            // pick hat location (except (0. 0))
            while(true){
                let hatY = Math.floor(Math.random() * this.rows);
                let hatX = Math.floor(Math.random() * this.cols);
                if(!(hatX === 0 && hatY === 0)){
                    field[hatY][hatX] = hat;
                    break;
                }
            }

            // pick holes location
            while(holesNumber > 0){
                let holeY = Math.floor(Math.random() * this.rows);
                let holeX = Math.floor(Math.random() * this.cols);

                if(field[holeY][holeX] === fieldCharacter){
                    field[holeY][holeX] = hole;
                    holesNumber -= 1;
                }
            }
        }
        return field;
    }


    print(){
        for(let i = 0; i < this.field.length; i++){
            let rowStr = this.field[i].join('');
            console.log(rowStr);
        }
    }

    // x: col, y: row
    drawPath(row, col){
        this.field[row][col] = pathCharacter;
    }

    // dir: moving direction: d, u, l, r
    move(dir){

        let outOfBound = false;

        if(dir === 'd'){    // go down
            if(this.posY + 1 >= this.rows){
                outOfBound = true;
            }
            else{
                this.posY += 1;            
            }
        }
        else if(dir === 'u'){
            if(this.posY - 1 < 0){
                outOfBound = true;
            }
            else{
                this.posY -= 1;
            }
        }
        else if(dir === 'l'){
            if(this.posX - 1 < 0){
                outOfBound = true;
            }
            else{
                this.posX -= 1;
            }
        }
        else if(dir === 'r'){
            if(this.posX  + 1 >= this.cols){
                outOfBound = true;
            }
            else{
                this.posX += 1;
            }
        }
        else{
            console.log("Invalid input! Try again!");
        }
        
        if(outOfBound){
            console.log("You are out of bound!");
            return false;
        }

        // check hole
        if(this.isHole(this.posY, this.posX)){
            console.log("You dropped in a hole! You died, haha!");
            return false;
        }

        // check hat
        if(this.isHat(this.posY, this.posX)){
            console.log("You found the hat! You win!");
            return false;
        }

        // draw the new path
        this.drawPath(this.posY, this.posX);

        return true;
    }

    isHole(row, col){
        if(this.field[row][col] === hole){
            return true;
        }
    }

    isHat(row, col){
        if(this.field[row][col] === hat){
            return true;
        }
    }
}

// play the game.
function Play(){

    // let user define the field -----------------------------------------
    //console.log("Please define the domain size.");
    term.blue.bold("Please define the domain size. \n");
    console.log("Suggestion: choose a row number <= 25.");
    const rows = prompt("Enter the row number here: ");
    const cols = prompt("Enter the column number here: ");

    const myField = new Field(rows, cols);
    // -------------------------------------------------------------------

    // Start the game
    let run = true;
    while(run){
        myField.print();
        const direction = prompt('What direction you would like to move (u, d, l, r)? \n');
        run = myField.move(direction);

    }
}

Play();
