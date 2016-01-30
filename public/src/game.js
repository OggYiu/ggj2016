

    window.onload = function() {
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('player1', 'assets/player1.png');
}

var player1;
var keyLeft;
var keyRight;
var keyUp;
var keyDown;

function create() {
    // //  Our bullet group
    // bullets = game.add.group();
    // bullets.enableBody = true;
    // bullets.physicsBodyType = Phaser.Physics.ARCADE;
    // bullets.createMultiple(30, 'bullet');
    // bullets.setAll('anchor.x', 0.5);
    // bullets.setAll('anchor.y', 1);
    // bullets.setAll('outOfBoundsKill', true);
    // bullets.setAll('checkWorldBounds', true);

    // // The enemy's bullets
    // enemyBullets = game.add.group();
    // enemyBullets.enableBody = true;
    // enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    // enemyBullets.createMultiple(30, 'enemyBullet');
    // enemyBullets.setAll('anchor.x', 0.5);
    // enemyBullets.setAll('anchor.y', 1);
    // enemyBullets.setAll('outOfBoundsKill', true);
    // enemyBullets.setAll('checkWorldBounds', true);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //  The hero!
    player1 = game.add.sprite(400, 500, 'player1');
    player1.anchor.setTo(0.5, 0.5);
    game.physics.enable(player1, Phaser.Physics.ARCADE);

    this.keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);    
}

function update() {
    //  Reset the player, then check for movement keys
    player.body.velocity.setTo(0, 0);

    if (this.keyLeft.isDown)
    {
        player.body.velocity.x = -200;
    }
    else if (this.keyRight.isDown)
    {
        player.body.velocity.x = 200;
    }
}

function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

}
}