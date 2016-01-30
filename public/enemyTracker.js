var Enemy_Tracker = function(game, targetId, x, y, targetPlayer) {
    this.entityType = "Enemy_Tracker";
    this.id = targetId;
    this.destroyCountDown = 0;

    Phaser.Sprite.call( this, game, x, y, 'monster_1' );

    this.anchor.setTo( 0.5, 0.5 );

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 100; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    this.targetPlayer = targetPlayer;

    this.animations.add('walk', [ 0, 1 ], 5, true);
    this.play('walk');


    // game.add.text(32, 120, 'Integer in Range (100-200): ' + game.rnd.integerInRange(100, 200), style);

    // this.WOBBLE_LIMIT = 15; // degrees
    // this.WOBBLE_SPEED = 250; // milliseconds
    // this.SMOKE_LIFETIME = 3000; // milliseconds
    // this.AVOID_DISTANCE = 30; // pixels
};

// Missiles are a type of Phaser.Sprite
Enemy_Tracker.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_Tracker.prototype.constructor = Enemy_Tracker;
Enemy_Tracker.prototype.update = function() {
    if ( this.destroyCountDown > 0 ) {
        var dt = this.game.time.now - this.lastTime;
        this.lastTime = this.game.time.now
        this.destroyCountDown -= dt;
        if ( this.destroyCountDown <= 0 ) {
            this.destroy();
        }
        return;
    }

    if ( !this.alive ) {
        return;
    }

    if ( this.game.account_id != 1 ) {
        return;
    }

    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.targetPlayer.x, this.targetPlayer.y
    );

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (this.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - this.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            // this.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            // this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            // this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(targetAngle) * this.SPEED;
    this.body.velocity.y = Math.sin(targetAngle) * this.SPEED;
}

Enemy_Tracker.prototype.die = function() {
    this.kill();
    // console.log( "die tracker" );
    this.destroyCountDown = 1000;
    this.lastTime = this.game.time.now;
    // this.destroy();
};