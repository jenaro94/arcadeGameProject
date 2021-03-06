let charSelectionModal = document.getElementById('charSelectionModal');

let restartButton = document.getElementById('restartButton');

const loadListeners = arr => Array.prototype.forEach.call(arr, function (el) {
  addEventListener('click', function () {
    subel = el.src.split('/');
    player.sprite = subel[subel.length - 2] + '/' + subel[subel.length - 1];
    charSelectionModal.style.display = 'none';
    allEnemies.forEach(enemy => enemy.speed = Math.floor(Math.random() * 150) + 1)
    allowedKeys = allowedKeysHolder;
  });
})

// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = -100;
  this.rows = [50, 125, 210];
  this.y = this.rows[Math.floor(Math.random() * this.rows.length)];
  this.speed = Math.floor(Math.random() * 150) + 1;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

const showModalAndStopEverything = modal => {
  showModal(modal);
  allEnemies.forEach(enemy => enemy.speed = 0);
  allowedKeys = {};
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt, playerX, playerY) {
  if (this.x >= playerX - 50.5 && this.x <= playerX + 50.5 &&
    this.y == playerY) {
    showModalAndStopEverything(document.getElementById('lostModal'));
  }
  this.x += this.speed * dt;

  if (this.x > 600) {
    this.x = -100;
  }

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const showModal = modal => modal.style.display = 'flex'

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
      showModalAndStopEverything(document.getElementById('wonModal'));
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
    switch (keyCode) {
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

let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];

let player = new Player();

loadListeners(charSelectionModal.getElementsByTagName('img'));

const allowedKeysHolder = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

let allowedKeys = allowedKeysHolder;

let onKeyUp = e => {
  player.handleInput(allowedKeys[e.keyCode]);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.onKeyUp = document.addEventListener('keyup', function (e) {
  onKeyUp(e);
});

const restart = () => {
  player.y = player.initY;
  allowedKeys = allowedKeysHolder;
  document.getElementById('wonModal').style.display = 'none';
}

restartButton.addEventListener('click', restart());
