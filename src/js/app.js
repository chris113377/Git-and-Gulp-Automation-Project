const level = document.getElementById("score");
const lives = document.getElementById("lives");

class Sun {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Enemy {
  constructor(x, y, direction, style, speedY = 0) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speedY = speedY;
    this.speed = Math.floor((Math.random() + 1) * 3);
  }

  resetGame() {
    lives.firstElementChild.innerHTML = 3;
    level.firstElementChild.innerHTML = 0;
    player.numLives = 3;
    player.numLevel = 0;

    /*===================== optional =================================*/
    allEnemies[0].y = 100;
    allEnemies[0].speedY = 0;
    allEnemies[1].y = 210;
    allEnemies[1].speedY = 0;

    for (let enemy of allEnemies) {
      enemy.speed = Math.floor((Math.random() + 1) * 3);
    }
  }

  move() {
    this.x += this.speed;
    this.y += this.speedY;

    if (this.x >= 810 || this.x <= 0) {  
      this.speed = -this.speed;
    }

    if (this.y >= 330 || this.y <= 10) {  
      this.speedY = -this.speedY;
    }

    if (this.x >= 800) {
      this.direction = "rtl";
    } else if (this.x <= 5) {
      this.direction = "ltr";
    }
  }

  collisionCheck() {
    let xTouch = Math.abs(this.x - player.x) <= 70;
    let yTouch = Math.abs(this.y - player.y) <= 70;

    if (xTouch && yTouch) {
      this.collision();
    }
  }

  collision() {
    player.x = 450;
    player.y = 430;

    for (let enemy of allEnemies) {
      if (Math.abs(enemy.speed) > 1) {
        if (enemy.speed < 0) {
          enemy.speed += 1;
        } else {
        enemy.speed -= 1;
        }
      }
    }
    
    /*===================== optional =================================*/
    if (player.numLevel <= 1) {
      allEnemies[0].speedY = 0;
      allEnemies[0].y = 100;
      allEnemies[1].speedY = 0;
      allEnemies[1].y = 100;
    }

    if (player.numLives >= 1) {
      player.numLives--;
      lives.firstElementChild.innerHTML = player.numLives;

      if (player.numLevel > 0) {
        player.numLevel--;
        level.firstElementChild.innerHTML = player.numLevel;
      } else {
        player.numLevel = 0;
        level.firstElementChild.innerHTML = player.numLevel;
      }
    } else {
      this.resetGame();

      Swal.fire(
        'GAME OVER !!!',
        'Please press OK to play again.');
    }
  }

  update(dt) {
    this.move();
    this.collisionCheck();
  }
}


class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedx = 20;
    this.speedy = 20;
    this.numLives = 3;
    this.numLevel = 0;
  }

  reachedSunCheck() {
    let xTouch = Math.abs(this.x - sun.x) <= 80;
    let yTouch = Math.abs(this.y - sun.y) <= 80;

    if (xTouch && yTouch) {
      this.score();
    }
  }

  score() {
    this.x = 450;
    this.y = 430;

    this.numLevel++;
    level.firstElementChild.innerHTML = this.numLevel;

    /*===================== optional =================================*/
    if (this.numLevel > 5) {
      allEnemies[0].speedY = 5;
      allEnemies[1].speedY = 2;
    } else if (this.numLevel > 1) {
      allEnemies[0].speedY = 1;
    }

    for (let enemy of allEnemies) {
      if (enemy.speed < 0) {
        enemy.speed += (-1);
      } else {
        enemy.speed += 1;
      } 
    }
  }

  update(dt) {
    this.reachedSunCheck();
  }

  handleInput(key) {

    if (key === "up" && this.y >= 10) {
      this.y += -this.speedy;
    } else if (key === "down" && this.y <= 420) {
      this.y += this.speedy;
    } else if (key === "left" && this.x >= 0) {
      this.x += -this.speedx;
    } else if (key === "right" && this.x <= 790) {
      this.x += this.speedx;
    }
  }
}

const sun = new Sun(450, 0);
const allEnemies = [
  new Enemy(200, 100, "ltr", "enemy1"), 
  new Enemy(800, 210, "rtl", "enemy2"), 
  new Enemy(0, 320, "ltr", "enemy3")
];
const player = new Player(450, 430);


document.addEventListener('keydown', function(e) {
  const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});