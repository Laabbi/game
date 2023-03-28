<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Simple 1D Game</title>
  <script src="https://pixijs.download/v6.1.3/pixi.min.js"></script>
</head>
<body>
  <script>
    // Create a new PixiJS application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    // Add the app to the HTML document
    document.body.appendChild(app.view);

    // Create a line to represent the game world
    const line = new PIXI.Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 300);
    line.lineTo(800, 300);
    app.stage.addChild(line);

    // Create a sprite for the player
    const player = PIXI.Sprite.from('https://s3-us-west-2.amazonaws.com/s.cdpn.io/73639/cat.png');
    player.position.set(100, 250);
    app.stage.addChild(player);

    // Handle player input using the keyboard
    const left = keyboard(37);
    const right = keyboard(39);
    left.press = () => {
      player.vx = -5;
    };
    right.press = () => {
      player.vx = 5;
    };
    left.release = () => {
      if (!right.isDown) {
        player.vx = 0;
      }
    };
    right.release = () => {
      if (!left.isDown) {
        player.vx = 0;
      }
    };

    // Set up the game loop
    app.ticker.add((delta) => {
      // Move the player based on its velocity
      player.x += player.vx;

      // Keep the player within the game world
      if (player.x < 0) {
        player.x = 0;
      } else if (player.x > 700) {
        player.x = 700;
      }
    });

    // Helper function to handle keyboard input
    function keyboard(keyCode) {
      const key = {};
      key.code = keyCode;
      key.isDown = false;
      key.isUp = true;
      key.press = undefined;
      key.release = undefined;
      key.downHandler = (event) => {
        if (event.keyCode === key.code) {
          if (key.isUp && key.press) {
            key.press();
          }
          key.isDown = true;
          key.isUp = false;
          event.preventDefault();
        }
      };
      key.upHandler = (event) => {
        if (event.keyCode === key.code) {
          if (key.isDown && key.release) {
            key.release();
          }
          key.isDown = false;
          key.isUp = true;
          event.preventDefault();
        }
      };
      window.addEventListener(
        'keydown', key.downHandler.bind(key), false
      );
      window.addEventListener(
        'keyup', key.upHandler.bind(key), false
      );
      return key;
    }
  </script>
</body>
</html>
