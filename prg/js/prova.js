var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() { /*_______________________PRELOAD________________________*/

    game.load.image('ground', 'assets/ground.png');
    game.load.spritesheet('dude', 'assets/pollicino.png', 290, 604);
    game.load.image('layer1', 'assets/background/livello1.png');
    game.load.image('layer2', 'assets/background/livello2.png');
    game.load.image('layer3', 'assets/background/livello3.png');
    game.load.image('layer4', 'assets/background/livello4.png');
    game.load.image('coin', 'assets/moneta.png');
    game.load.image('door1c', 'assets/doors/door1c.png');
    game.load.image('door1a', 'assets/doors/door1a.png');
    game.load.image('door2c', 'assets/doors/door2c.png');
    game.load.image('door2a', 'assets/doors/door2a.png');
    game.load.image('door3c', 'assets/doors/door3c.png');
    game.load.image('door3a', 'assets/doors/door3a.png');
    game.load.image('button1', 'assets/buttons/button1.png');
    game.load.image('button2', 'assets/buttons/button2.png');
    game.load.image('button3', 'assets/buttons/button3.png');


}
var player;
var platforms;
var background;
var ground;
var tileSprite;
var backTile;
var woodsTile1;
var woodsTile2;
var woodsTile3;
var turn;
var counter = 0;
var statusDoor1 = "C";
var statusDoor2 = "C";
var statusDoor3 = "C";
var n_tentativi = 0;
var contb1 = 0;
var contb2 = 0;
var contb3 = 0;

function create() {  /*________________________CREATE________________________*/

    //  The Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

   // Background
    backTile = game.add.tileSprite(0, 0, 1024, 768, 'layer4');
      woodsTile3 = game.add.tileSprite(0, 0, 1024, 768, 'layer3');
         woodsTile2 = game.add.tileSprite(0, 0, 1024, 768, 'layer2');
            woodsTile1 = game.add.tileSprite(0, 0, 1024, 768, 'layer1');

    backTile.fixedToCamera = true;
     woodsTile1.fixedToCamera = true;
      woodsTile2.fixedToCamera = true;
       woodsTile3.fixedToCamera = true;

    game.world.setBounds(0, 0, 4096, 1536);

/*_________________________________PLATFORMS_________________________________*/

      //The platforms
    platforms = game.add.group();
     platforms.enableBody = true;
    ground = platforms.create(0, game.world.height -100, 'ground');
      ground.body.immovable = true
       ground.scale.setTo(0.5, 0.5);

/*___________________________________PLAYER__________________________________*/

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 400, 'dude');
		 game.camera.follow(player);
      player.scale.setTo(0.2,0.2);
       game.physics.arcade.enable(player);

    //  Player physics properties.
    player.body.bounce.y = 0.2;
     player.body.gravity.y = 1500;
      player.body.collideWorldBounds = true;

    //  Animations, walking left and right.
    player.animations.add('left', [7, 6, 5, 4, 3, 2, 1, 0], 10, true);
     player.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);

/*_________________________________OBJECTS___________________________________*/

  // coins
   coins = game.add.group();
    coins.enableBody = true;

   coin = coins.create (675, game.world.height -150, 'coin');
    game.physics.arcade.enable(coin);
     coin.body.immovable = true;
      coin.scale.setTo(0.055, 0.055);

  // Doors
  close_door = game.add.group();
    close_door.enableBody = true;
  door1c = close_door.create(400, game.world.height -300, 'door1c');
    game.physics.arcade.enable(door1c);
    door1c.body.immovable = true;
    door1c.scale.setTo(0.25, 0.25);
  door2c = close_door.create(600, game.world.height -300, 'door2c');
      game.physics.arcade.enable(door2c);
      door2c.body.immovable = true;
      door2c.scale.setTo(0.25, 0.25);
  door3c = close_door.create(800, game.world.height -300, 'door3c');
      game.physics.arcade.enable(door2c);
      door3c.body.immovable = true;
      door3c.scale.setTo(0.25, 0.25);

  open_door = game.add.group();
      open_door.enableBody = true;
    door1a = open_door.create(400, game.world.height -300, 'door1a');
      game.physics.arcade.enable(door1a);
      door1a.body.immovable = true;
      door1a.scale.setTo(0.25, 0.25);
      door1a﻿.visible = false;
    door2a = open_door.create(600, game.world.height -300, 'door2a');
      game.physics.arcade.enable(door1a);
      door2a.body.immovable = true;
      door2a.scale.setTo(0.25, 0.25);
      door2a﻿.visible = false;
    door3a = open_door.create(800, game.world.height -300, 'door3a');
      game.physics.arcade.enable(door1a);
      door3a.body.immovable = true;
      door3a.scale.setTo(0.25, 0.25);
      door3a﻿.visible = false;

  buttons = game.add.group();
    buttons.enableBody = true;
  button1 = buttons.create(120, game.world.height -125, 'button1');
      game.physics.arcade.enable(button1);
      button1.body.immovable = true;
      button1.scale.setTo(0.20, 0.20);
  button2 = buttons.create(220, game.world.height -125, 'button2');
      game.physics.arcade.enable(button2);
      button2.body.immovable = true;
      button2.scale.setTo(0.20, 0.20);
  button3 = buttons.create(320, game.world.height -125, 'button3');
      game.physics.arcade.enable(button3);
      button3.body.immovable = true;
      button3.scale.setTo(0.20, 0.20);

    //close_door.create(3500, 4950, 'door2c');
  //close_door.create(5000, 4950, 'door3c');

    //close_door.body.immovable = true;
    //close_door.scale.setTo(0.25, 0.25);
/*_________________________________HUD_______________________________________*/

  text = game.add.text(1, 20, "Score: ", { font: "18px Arial", fill: "#3B6CCD" });
   text.fixedToCamera = true;
    text.cameraOffset.setTo(90, 80);

/*__________________________________INPUTS__________________________________*/

		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.input.keyboard.addKey(Phaser.Keyboard.A)
     game.input.keyboard.addKey(Phaser.Keyboard.D)
      game.input.keyboard.addKey(Phaser.Keyboard.W)
       game.input.keyboard.addKey(Phaser.Keyboard.R)

    //  Controls.
    cursors = game.input.keyboard.createCursorKeys();

}

function update() { /*________________________UPDATE________________________*/


    woodsTile1.tilePosition.x = game.camera.x * -0.8;
     woodsTile2.tilePosition.x = game.camera.x * -0.4;
      woodsTile3.tilePosition.x = game.camera.x * -0.2;

    /* ______________________________COLLIDES________________________________*/

    //  Collide the player with the platforms and woods
    game.physics.arcade.collide(player, platforms);

    //  Collide the player with the doors
    game.physics.arcade.collide(player, close_door);
    // Ovelap player buttons
    game.physics.arcade.collide(player, button1, button1_action);
    game.physics.arcade.collide(player, button2, button2_action);
    game.physics.arcade.collide(player, button3, button3_action);
   // pick up coins
    game.physics.arcade.overlap(player, coins, pu_coins);

    /* ________________________________PLAYER________________________________*/

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //  Move to the right
        player.body.velocity.x = 300;

        player.animations.play('right');

        turn = true;
    }
    else if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        //  Move to the left
        player.body.velocity.x = -300;

        player.animations.play('left');

        turn = false;
    }
    else
    {
      if (turn){
        //  Stand still
        player.animations.stop();
        player.frame = 8;
      }
      else{
        player.animations.stop();
        player.frame = 7;
      }
    }

    //  Allow the player to jump if they are touching the ground.
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.isDown(Phaser.Keyboard.W) || cursors.up.isDown)  {
			 if (player.body.touching.down && jumpTimer === 0) {
					 // jump is allowed to start
					 jumpTimer = 1;
					 player.body.velocity.y = -550;
			 } else if (jumpTimer > 0 && jumpTimer < 15) {
					 // keep jumping higher
					 jumpTimer++;
					 player.body.velocity.y = -550 + (jumpTimer * 3);
			 }
	 }
	 else {
			 // jump button not being pressed, reset jump timer
			 jumpTimer = 0;
	 }

/* _________________________________SQUIRREL_________________________________*/


  function pu_coins(p, c){
    c.kill();
    counter++;
    text.text = "Score: " + counter;
  }

  /* _________________________________funzionamento porte_________________________________*/

  function button1_action(p, b1){
  if (button1.body.touching.up && contb1==0){
    contb1++;
    b1.scale.setTo(0.20, 0.10);
    premi_bottone('C', 'C', 'A');
    disegna_porta(1, statusDoor1);
    disegna_porta(2, statusDoor2);
    disegna_porta(3, statusDoor3);
  }
    //disegna_porta(1,"A");
  }
  function button2_action(p, b2){
  if (button2.body.touching.up && contb2==0){
    contb2++;
    b2.scale.setTo(0.20, 0.10);
    premi_bottone('A', 'A', 'C');
    disegna_porta(1, statusDoor1);
    disegna_porta(2, statusDoor2);
    disegna_porta(3, statusDoor3);
    //disegna_porta(1,"A");
  }
  }
  function button3_action(p, b3){
  if (button3.body.touching.up && contb3==0){
    contb3++;
    b3.scale.setTo(0.20, 0.10);
    premi_bottone('C', 'A', 'A');
    disegna_porta(1, statusDoor1);
    disegna_porta(2, statusDoor2);
    disegna_porta(3, statusDoor3);
    //disegna_porta(1,"A");
  }
  }
  function disegna_porta (n_porta, stato_porta) {

     if (n_porta == 1)
      {
        if (stato_porta=="A" && button1.body.touching.up){
          door1a﻿.visible = true;
          door1c﻿.visible = false;
        }
        else{
          door1a﻿.visible = false;
          door1c﻿.visible = true;
        }
      }
      if (n_porta == 2)
      {
        if (stato_porta=="A"){
          door2a﻿.visible = true;
          door2c﻿.visible = false;
        }
        else{
          door2a﻿.visible = false;
          door2c﻿.visible = true;
        }
      }
      if (n_porta == 3)
      {
        if (stato_porta=="A"){
          door3a﻿.visible = true;
          door3c﻿.visible = false;
        }
        else{
          door3a﻿.visible = false;
          door3c﻿.visible = true;
        }
      }
  }

  function calcola_porta(v1, v2)
  {
    if (v1 == 'A' && v2 == 'A')
       return 'A';

    if (v1 == 'C' && v2 == 'C')
       return 'A';

    if (v1 == 'A' && v2 == 'C')
       return 'C';

    if (v1 == 'C' && v2 == 'A')
       return 'C';
  }

  function premi_bottone(porta1, porta2, porta3)
  {
    if (n_tentativi < 2)
    {
        n_tentativi++;

      statusDoor1 = calcola_porta(statusDoor1, porta1);
      statusDoor2 = calcola_porta(statusDoor2, porta2);
      statusDoor3 = calcola_porta(statusDoor3, porta3);
    }
    else
    {
       n_tentativi = 0;
       resetta_stato_porte();
    }
  }

  function resetta_stato_porte()
  {
    statusDoor1 = "C";
    statusDoor2 = "C";
    statusDoor3 = "C";
    b1.scale.setTo(0.20, 0.20);
    b2.scale.setTo(0.20, 0.20);
    b3.scale.setTo(0.20, 0.20);
  }

 }

  function render () {  /*_____________________RENDER_______________________*/

}
