"use strict";

/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function () {
  var resourceCache = {};
  var readyCallbacks = [];
  /* This is the publicly accessible image loading function. It accepts
   * an array of strings pointing to image files or a string for a single
   * image. It will then call our private image loading function accordingly.
   */

  function load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      /* If the developer passed in an array of images
       * loop through each value and call our image
       * loader on that image file
       */
      urlOrArr.forEach(function (url) {
        _load(url);
      });
    } else {
      /* The developer did not pass an array to this function,
       * assume the value is a string and call our image loader
       * directly.
       */
      _load(urlOrArr);
    }
  }
  /* This is our private image loader function, it is
   * called by the public image loader function.
   */


  function _load(url) {
    if (resourceCache[url]) {
      /* If this URL has been previously loaded it will exist within
       * our resourceCache array. Just return that image rather than
       * re-loading the image.
       */
      return resourceCache[url];
    } else {
      /* This URL has not been previously loaded and is not present
       * within our cache; we'll need to load this image.
       */
      var img = new Image();

      img.onload = function () {
        /* Once our image has properly loaded, add it to our cache
         * so that we can simply return this image if the developer
         * attempts to load this file in the future.
         */
        resourceCache[url] = img;
        /* Once the image is actually loaded and properly cached,
         * call all of the onReady() callbacks we have defined.
         */

        if (isReady()) {
          readyCallbacks.forEach(function (func) {
            func();
          });
        }
      };
      /* Set the initial cache value to false, this will change when
       * the image's onload event handler is called. Finally, point
       * the image's src attribute to the passed in URL.
       */


      resourceCache[url] = false;
      img.src = url;
    }
  }
  /* This is used by developers to grab references to images they know
   * have been previously loaded. If an image is cached, this functions
   * the same as calling load() on that URL.
   */


  function get(url) {
    return resourceCache[url];
  }
  /* This function determines if all of the images that have been requested
   * for loading have in fact been properly loaded.
   */


  function isReady() {
    var ready = true;

    for (var k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }

    return ready;
  }
  /* This function will add a function to the callback stack that is called
   * when all requested images are properly loaded.
   */


  function onReady(func) {
    readyCallbacks.push(func);
  }
  /* This object defines the publicly accessible functions available to
   * developers by creating a global Resources object.
   */


  window.Resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var level = document.getElementById("score");
var lives = document.getElementById("lives");

var Sun = function Sun(x, y) {
  _classCallCheck(this, Sun);

  this.x = x;
  this.y = y;
};

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(x, y, direction, style) {
    var speedY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, Enemy);

    this.x = x;
    this.y = y;
    this.direction = direction;
    this.style = style;
    this.speedY = speedY;
    this.speed = Math.floor((Math.random() + 1) * 3);
  }

  _createClass(Enemy, [{
    key: "resetGame",
    value: function resetGame() {
      lives.firstElementChild.innerHTML = 3;
      level.firstElementChild.innerHTML = 0;
      player.numLives = 3;
      player.numLevel = 0;
      /*===================== optional =================================*/

      allEnemies[0].y = 100;
      allEnemies[0].speedY = 0;
      allEnemies[1].y = 210;
      allEnemies[1].speedY = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = allEnemies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var enemy = _step.value;
          enemy.speed = Math.floor((Math.random() + 1) * 3);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "move",
    value: function move() {
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
  }, {
    key: "collisionCheck",
    value: function collisionCheck() {
      var xTouch = Math.abs(this.x - player.x) <= 70;
      var yTouch = Math.abs(this.y - player.y) <= 70;

      if (xTouch && yTouch) {
        this.collision();
      }
    }
  }, {
    key: "collision",
    value: function collision() {
      player.x = 450;
      player.y = 430;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = allEnemies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var enemy = _step2.value;

          if (Math.abs(enemy.speed) > 1) {
            if (enemy.speed < 0) {
              enemy.speed += 1;
            } else {
              enemy.speed -= 1;
            }
          }
        }
        /*===================== optional =================================*/

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

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
        Swal.fire('GAME OVER !!!', 'Please press OK to play again.');
      }
    }
  }, {
    key: "update",
    value: function update(dt) {
      this.move();
      this.collisionCheck();
    }
  }]);

  return Enemy;
}();

var Player =
/*#__PURE__*/
function () {
  function Player(x, y) {
    _classCallCheck(this, Player);

    this.x = x;
    this.y = y;
    this.speedx = 20;
    this.speedy = 20;
    this.numLives = 3;
    this.numLevel = 0;
  }

  _createClass(Player, [{
    key: "reachedSunCheck",
    value: function reachedSunCheck() {
      var xTouch = Math.abs(this.x - sun.x) <= 80;
      var yTouch = Math.abs(this.y - sun.y) <= 80;

      if (xTouch && yTouch) {
        this.score();
      }
    }
  }, {
    key: "score",
    value: function score() {
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

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = allEnemies[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var enemy = _step3.value;

          if (enemy.speed < 0) {
            enemy.speed += -1;
          } else {
            enemy.speed += 1;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "update",
    value: function update(dt) {
      this.reachedSunCheck();
    }
  }, {
    key: "handleInput",
    value: function handleInput(key) {
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
  }]);

  return Player;
}();

var sun = new Sun(450, 0);
var allEnemies = [new Enemy(200, 100, "ltr", "enemy1"), new Enemy(800, 210, "rtl", "enemy2"), new Enemy(0, 320, "ltr", "enemy3")];
var player = new Player(450, 430);
document.addEventListener('keydown', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
"use strict";

/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */
var Engine = function (global) {
  /* Predefine the variables we'll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas element's height/width and add it to the DOM.
   */
  var doc = global.document,
      win = global.window,
      canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      lastTime;
  canvas.width = 900;
  canvas.height = 534;
  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.
   */

  function main() {
    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone's computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */

    update(dt);
    render();
    /* Set our lastTime variable which is used to determine the time delta
     * for the next time this function is called.
     */

    lastTime = now;
    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */

    win.requestAnimationFrame(main);
  }
  /* This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for the
   * game loop.
   */


  function init() {
    reset();
    lastTime = Date.now();
    main();
  }
  /* This function is called by main (our game loop) and itself calls all
   * of the functions which may need to update entity's data. Based on how
   * you implement your collision detection (when two entities occupy the
   * same space, for instance when your character should die), you may find
   * the need to add an additional function call here. For now, we've left
   * it commented out - you may or may not want to implement this
   * functionality this way (you could just implement collision detection
   * on the entities themselves within your app.js file).
   */


  function update(dt) {
    updateEntities(dt); // checkCollisions();
  }
  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to the object. Do your drawing in your
   * render methods.
   */


  function updateEntities(dt) {
    allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });
    player.update();
  }
  /* This function initially draws the "game level", it will then call
   * the renderEntities function. Remember, this function is called every
   * game tick (or loop of the game engine) because that's how games work -
   * they are flipbooks creating the illusion of animation but in reality
   * they are just drawing the entire screen over and over.
   */


  function render() {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    // var rowImages = [
    //         'images/water-block.png',   // Top row is water
    //         'images/stone-block.png',   // Row 1 of 3 of stone
    //         'images/stone-block.png',   // Row 2 of 3 of stone
    //         'images/stone-block.png',   // Row 3 of 3 of stone
    //         'images/grass-block.png',   // Row 1 of 2 of grass
    //         'images/grass-block.png'    // Row 2 of 2 of grass
    //     ],
    //     numRows = 6,
    //     numCols = 5,
    //     row, col;
    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    // for (row = 0; row < numRows; row++) {
    //     for (col = 0; col < numCols; col++) {

    /* The drawImage function of the canvas' context element
     * requires 3 parameters: the image to draw, the x coordinate
     * to start drawing and the y coordinate to start drawing.
     * We're using our Resources helpers to refer to our images
     * so that we get the benefits of caching these images, since
     * we're using them over and over.
     */

    ctx.drawImage(Resources.get('images/background.png'), 0, 0); // }
    //}

    renderEntities();
  }
  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */


  function renderEntities() {
    ctx.drawImage(Resources.get('images/sun.png'), sun.x, sun.y);
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */

    player.tickCount++;

    if (player.tickCount > player.ticksPerFrame) {
      player.tickCount = 0;
      player.frameIndex++;
    }

    if (player.frameIndex >= player.numberOfFrames) {
      player.frameIndex = 0;
    }

    var playerImage = Resources.get('images/player.png');
    ctx.drawImage(playerImage, 0, player.frameIndex * playerImage.naturalHeight / player.numberOfFrames, playerImage.naturalWidth, playerImage.naturalHeight / player.numberOfFrames, player.x, player.y, playerImage.naturalWidth, playerImage.naturalHeight / player.numberOfFrames); // ctx.strokeStyle = '#FFF'
    // ctx.strokeRect(player.x, player.y, playerImage.naturalWidth, playerImage.naturalHeight/ player.numberOfFrames);

    allEnemies.forEach(function (enemy) {
      enemy.tickCount++;

      if (enemy.tickCount > enemy.ticksPerFrame) {
        enemy.tickCount = 0;
        enemy.frameIndex++;
      }

      if (enemy.frameIndex >= enemy.numberOfFrames) {
        enemy.frameIndex = 0;
      }

      var image = Resources.get("images/".concat(enemy.style, "-").concat(enemy.direction, ".png"));
      ctx.drawImage(image, 0, enemy.frameIndex * image.naturalHeight / enemy.numberOfFrames, image.naturalWidth, image.naturalHeight / enemy.numberOfFrames, enemy.x, enemy.y, image.naturalWidth, image.naturalHeight / enemy.numberOfFrames); // ctx.strokeStyle = '#FFF'
      // ctx.strokeRect(enemy.x, enemy.y, image.naturalWidth, image.naturalHeight/ enemy.numberOfFrames);
    });
  }
  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */


  function reset() {
    allEnemies.forEach(function (enemy) {
      enemy.tickCount = 0;
      enemy.ticksPerFrame = 5;
      enemy.frameIndex = 0;
      enemy.numberOfFrames = 3;
    });
    player.tickCount = 0;
    player.ticksPerFrame = 5;
    player.frameIndex = 0;
    player.numberOfFrames = 2;
  }
  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */


  Resources.load(['images/background.png', 'images/enemy1-ltr.png', 'images/enemy2-ltr.png', 'images/enemy3-ltr.png', 'images/enemy1-rtl.png', 'images/enemy2-rtl.png', 'images/enemy3-rtl.png', 'images/enemy4-rtl.png', 'images/enemy4-ltr.png', 'images/sun.png', 'images/player.png']);
  Resources.onReady(init);
  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */

  global.ctx = ctx;
}(void 0);