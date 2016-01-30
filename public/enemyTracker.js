var Enemy_Tracker = function(game, x, y, targetPlayer) {
    this.entityType = "Enemy_Tracker";
    Phaser.Sprite.call( this, game, x, y, 'monster_1' );

    this.anchor.setTo( 0.5, 0.5 );

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 100; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    this.targetPlayer = targetPlayer;
    // this.WOBBLE_LIMIT = 15; // degrees
    // this.WOBBLE_SPEED = 250; // milliseconds
    // this.SMOKE_LIFETIME = 3000; // milliseconds
    // this.AVOID_DISTANCE = 30; // pixels
};

// Missiles are a type of Phaser.Sprite
Enemy_Tracker.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_Tracker.prototype.constructor = Enemy_Tracker;
Enemy_Tracker.prototype.update = function() {
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
            this.angle += this.TURN_RATE;
        } else {
            // Turn counter-clockwise
            this.angle -= this.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on this.rotation and this.SPEED
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
}