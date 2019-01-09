// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.rows = [50,125,210];
    this.y = this.rows[Math.floor(Math.random() * this.rows.length)];
    this.speed = Math.floor(Math.random() * 100) + 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, playerX, playerY) {
    if (this.x >= playerX - 50.5 && this.x <= playerX + 50.5
       && this.y == playerY) {
        alert("MUERTO");
    }
    this.x += this.speed*dt; 
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.leftMostX = 0;
        this.rightMostX = 404;
        this.initY = 380;
        this.x = 202;
        this.y = 380;
        this.ySpeed = 85;
        this.xSpeed = 101;
        this.sprite = 'images/char-boy.png';
    }
    
    update() {
        if (this.y <= 0) {
            this.y = this.initY;
        }
        
        if (this.y > this.initY) {
            this.y = this.initY;
        }
        
        if (this.x >= ctx.canvas.width) {
            this.x = this.rightMostX;
        }
        
        if (this.x < 0) {
            this.x = this.leftMostX;
        }
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
    handleInput(keyCode) {
        switch(keyCode) {
            case 'left': 
                this.x -= this.xSpeed;
                break;
            case 'right':
                this.x += this.xSpeed;
                break;
            case 'up':
                this.y -= this.ySpeed;
                break;
            case 'down':
                this.y += this.ySpeed;
                break;
            default:
                break;
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];
allEnemies.concat(allEnemies);

let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
