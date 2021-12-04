var game = new Phaser.Game(1024, 768, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() { /*_______________________PRELOAD________________________*/

    game.load.image('ground', 'assets/ground.png');
    game.load.spritesheet('dude', 'assets/pollicino.png', 290, 604);
    game.load.image('layer1', 'assets/background/livello1.png');
    game.load.image('layer2', 'assets/background/livello2.png');
    game.load.image('layer3', 'assets/background/livello3.png');
    game.load.image('layer4', 'assets/background/livello4.png');
    game.load.image('coin', 'assets/moneta.png');
    game.load.image('door1c', 'assets/doors2/door1c.png');
    game.load.image('door2c', 'assets/doors2/door2c.png');
    game.load.image('door3c', 'assets/doors2/door3c.png');
    game.load.image('door1adx', 'assets/doors2/door1adx.png');
    game.load.image('door2adx', 'assets/doors2/door2adx.png');
    game.load.image('door3adx', 'assets/doors2/door3adx.png');
    game.load.image('door1asx', 'assets/doors2/door1asx.png');
    game.load.image('door2asx', 'assets/doors2/door2asx.png');
    game.load.image('door3asx', 'assets/doors2/door3asx.png');
    game.load.image('button1', 'assets/buttons/button1.png');
    game.load.image('button2', 'assets/buttons/button2.png');
    game.load.image('button3', 'assets/buttons/button3.png');
    game.load.image('baseb1', 'assets/buttons/baseb1.png');
    game.load.image('baseb2', 'assets/buttons/baseb2.png');
    game.load.image('baseb3', 'assets/buttons/baseb3.png');
    game.load.image('houseup', 'assets/house/houseup.png');
    game.load.image('housedown', 'assets/house/housedown.png');
    game.load.image('blocco', 'assets/house/blocco1.png');
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
var buttonsY = 0;

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


/*____________________________DOORS UNDER PLAYER_____________________________*/

       //Open Doors 
      housedown = game.add.sprite(90, game.world.height -990, 'housedown');
          housedown.scale.setTo(0.5, 0.5);
       door1asx = game.add.sprite(315, game.world.height -257, 'door1asx');
           door1asx.scale.setTo(0.19, 0.19);
           door1asx﻿.visible = false;

       door3asx = game.add.sprite(920, game.world.height -257, 'door3asx');
           door3asx.scale.setTo(0.19, 0.19);
           door3asx﻿.visible = false;

       door2a = game.add.sprite(810, game.world.height -257, 'door2adx');
           door2a.scale.setTo(0.19, 0.19);
           door2a﻿.visible = false;



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


  // Close Doors
  houseup = game.add.sprite(90, game.world.height -990, 'houseup');
       houseup.scale.setTo(0.5, 0.5);
  close_door = game.add.group();
    close_door.enableBody = true;
  door1c = close_door.create(355, game.world.height -257, 'door1c');
      game.physics.arcade.enable(door1c);
      door1c.body.immovable = true;
      door1c.scale.setTo(0.19, 0.19);
  door2c = close_door.create(760, game.world.height -257, 'door2c');
      game.physics.arcade.enable(door2c);
      door2c.body.immovable = true;
      door2c.scale.setTo(0.19, 0.19);
  door3c = close_door.create(995, game.world.height -258, 'door3c');
      game.physics.arcade.enable(door3c);
      door3c.body.immovable = true;
      door3c.scale.setTo(0.19, 0.19);

//blocco
  blocco1 = game.add.sprite(355, game.world.height -475, 'blocco');
      game.physics.arcade.enable(blocco1);
      blocco1.body.immovable = true;
      blocco1.alpha = 0.0;


  //Doors over player

  door1a= game.add.sprite(395, game.world.height -257, 'door1adx');
      door1a.scale.setTo(0.19, 0.19);
      door1a﻿.visible = false;

  door3a = game.add.sprite(1039, game.world.height -257, 'door3adx');
      door3a.scale.setTo(0.19, 0.19);
      door3a﻿.visible = false;

  door2asx = game.add.sprite(685, game.world.height -257, 'door2asx');
      door2asx.scale.setTo(0.19, 0.19);
      door2asx﻿.visible = false;




//Buttons
  buttonsY = game.world.height - 125;

  buttons = game.add.group();
    buttons.enableBody = true;
  button1 = buttons.create(120, buttonsY, 'button1');
      game.physics.arcade.enable(button1);
      button1.body.immovable = true;
      button1.height = 30;
      button1.width = 42;
  button2 = buttons.create(220, buttonsY, 'button2');
      game.physics.arcade.enable(button2);
      button2.body.immovable = true;
      button2.height = 30;
      button2.width = 42;
  button3 = buttons.create(320, buttonsY, 'button3');
      game.physics.arcade.enable(button3);
      button3.body.immovable = true;
      button3.height = 30;
      button3.width = 42;

  basi = game.add.group();
    basi.enableBody = true;
  baseb1 = basi.create(112, buttonsY+20, 'baseb1');
      game.physics.arcade.enable(baseb1);
      baseb1.body.immovable = true;
      baseb1.height = 15;
      baseb1.width = 58;
  baseb2 = basi.create(212, buttonsY+20, 'baseb2');
      game.physics.arcade.enable(baseb2);
      baseb2.body.immovable = true;
      baseb2.height = 15;
      baseb2.width = 58;
  baseb3 = basi.create(312, buttonsY+20, 'baseb3');
      game.physics.arcade.enable(baseb3);
      baseb3.body.immovable = true;
      baseb3.height = 15;
      baseb3.width = 58;

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
    game.physics.arcade.collide(player, blocco1);

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
  if (button1.body.touching.up && contb1 == 0){
    contb1++;
    b1.height = 15;
    b1.y = buttonsY+15;
    premi_bottone('C', 'A', 'C');
    disegna_porta(1, statusDoor1);
    disegna_porta(2, statusDoor2);
    disegna_porta(3, statusDoor3);
  }
    //disegna_porta(1,"A");
  }
  function button2_action(p, b2){
  if (button2.body.touching.up && contb2 == 0){
    contb2++;
    b2.height = 15;
    b2.y = buttonsY+15;
    premi_bottone('C', 'A', 'A');
    disegna_porta(1, statusDoor1);
    disegna_porta(2, statusDoor2);
    disegna_porta(3, statusDoor3);
    //disegna_porta(1,"A");
  }
  }
  function button3_action(p, b3){
  if (button3.body.touching.up && contb3 == 0){
    contb3++;
    b3.height = 15;
    b3.y = buttonsY+15;
    premi_bottone('A', 'C', 'A');
    disegna_porta(1, statusDoor1);
    disegna_porta(2, statusDoor2);
    disegna_porta(3, statusDoor3);
    //disegna_porta(1,"A");
  }
  }
  function disegna_porta (n_porta, stato_porta) {

     if (n_porta == 1)
      {
        if (stato_porta == "A"){
          door1a﻿.visible = true;
          door1asx﻿.visible = true;
          door1c﻿.visible = false;
          door1c.body.enable = false;
        }
        else{
          door1a﻿.visible = false;
          door1asx﻿.visible = false;
          door1c﻿.visible = true;
          door1c.body.enable = true;
        }
      }
      if (n_porta == 2)
      {
        if (stato_porta == "A"){
          door2a﻿.visible = true;
          door2asx﻿.visible = true;
          door2c﻿.visible = false;
          door2c.body.enable = false;
        }
        else{
          door2a﻿.visible = false;
          door2asx﻿.visible = false;
          door2c﻿.visible = true;
          door2c.body.enable = true;
        }
      }
      if (n_porta == 3)
      {
        if (stato_porta == "A"){
          door3a﻿.visible = true;
          door3asx﻿.visible = true;
          door3c﻿.visible = false;
          door3c.body.enable = false;
        }
        else{
          door3a﻿.visible = false;
          door3asx﻿.visible = false;
          door3c﻿.visible = true;
          door3c.body.enable = true;
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
      statusDoor1 = calcola_porta(statusDoor1, porta1);
      statusDoor2 = calcola_porta(statusDoor2, porta2);
      statusDoor3 = calcola_porta(statusDoor3, porta3);
      n_tentativi++;
    }
    else
    {
       n_tentativi = 0;
       resetta_stato();
    }
  }

  function resetta_stato()
  {
    statusDoor1 = "C";
    statusDoor2 = "C";
    statusDoor3 = "C";
    contb1 = 0;
    contb2 = 0;
    contb3 = 0;
    button1.height = 30;
    button1.y = buttonsY;
    button2.height = 30;
    button2.y = buttonsY;
    button3.height = 30;
    button3.y = buttonsY;
  }

 }

  function render () {  /*_____________________RENDER_______________________*/

}
