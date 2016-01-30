var Enemy_Missile = function(game, x, y, type) {
    Phaser.Sprite.call( this, game, x, y, 'monster_1' );

    this.anchor.setTo( 0.5, 0.5 );

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 100; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    // this.WOBBLE_LIMIT = 15; // degrees
    // this.WOBBLE_SPEED = 250; // milliseconds
    // this.SMOKE_LIFETIME = 3000; // milliseconds
    // this.AVOID_DISTANCE = 30; // pixels
};

// Missiles are a type of Phaser.Sprite
Enemy_Missile.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_Missile.prototype.constructor = Enemy_Missile;
Enemy_Missile.prototype.update = function() {
};