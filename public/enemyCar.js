var Enemy_Car = function(game, type, speed) {
    this.entityType = "Enemy_Car";
    this.id = game.nextEnemyId++;
    
    var targetX = 0;
    var targetY = 0;
    switch( type ) {
        case 0: {
            targetX = 0;
            targetY = game.rnd.integerInRange(0, game.myScreenHeight);
        }
        break;
        case 1: {
            targetX = game.rnd.integerInRange(0, game.myScreenWidth);
            targetY = 0;
        }
        break;
        case 2: {
            targetX = game.myScreenWidth;
            targetY = game.rnd.integerInRange(0, game.myScreenHeight);
        }
        break;
        case 3: {
            targetX = game.rnd.integerInRange(0, game.myScreenWidth);
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
    this.SPEED = speed; // missile speed pixels/second
    this.TURN_RATE = 5; // turn rate in degrees/frame
    // this.WOBBLE_LIMIT = 15; // degrees
    // this.WOBBLE_SPEED = 250; // milliseconds
    // this.SMOKE_LIFETIME = 3000; // milliseconds
    // this.AVOID_DISTANCE = 30; // pixels

    if ( this.game.account_id != 1 ) {
        return;
    }

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