var Enemy_Car = function(game, pos, type) {
    this.entityType = "Enemy_Car";
    var targetX = 0;
    var targetY = 0;
    var speed = 100;
    switch( type ) {
        case 0: {
            targetX = -100;
            targetY = pos;
        }
        break;
        case 1: {
            targetX = pos;
            targetY = -100;
        }
        break;
        case 2: {
            targetX = game.myScreenWidth;
            targetY = pos;
        }
        break;
        case 3: {
            targetX = pos;
            targetY = game.myScreenHeight;
        }
        break;
    }
    Phaser.Sprite.call( this, game, targetX, targetY, 'monster_car' );

    this.anchor.setTo( 0.5, 0.5 );
    this.animations.add('walk', [ 0, 1 ], 5, true);
    this.play('walk');
    this.revive();

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Define constants that affect motion
    this.SPEED = 100; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    // this.WOBBLE_LIMIT = 15; // degrees
    // this.WOBBLE_SPEED = 250; // milliseconds
    // this.SMOKE_LIFETIME = 3000; // milliseconds
    // this.AVOID_DISTANCE = 30; // pixels


    switch( type ) {
        case 0: {
            this.body.velocity.x = speed;
        }
        break;
        case 1: {
            this.body.velocity.y = speed;
        }
        break;
        case 2: {
            this.body.velocity.x = -speed;
        }
        break;
        case 3: {
            this.body.velocity.y = -speed;
        }
        break;
    }

    // if ( x <= 0 ) {
    //     this.body.velocity.x = 100;
    // }
    // if ( y <= 0 ) {
    // }
};
Enemy_Car.prototype = Object.create(Phaser.Sprite.prototype);
Enemy_Car.prototype.constructor = Enemy_Car;
Enemy_Car.prototype.update = function() {
};