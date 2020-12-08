const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field){
        this.field = field;
        this.rows = field.length;
        this.cols = field[0].length;
        this.posX = 0;
        this.posY = 0;
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

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

// Start the game
let run = true;
while(run){
    myField.print();
    const direction = prompt('What direction you would like to move (u, d, l, r)? \n');
    run = myField.move(direction);

}
