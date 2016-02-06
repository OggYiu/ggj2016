var Enemy_Car = function(game, targetId, type, speed) {
    this.entityType = "Enemy_Car";
    this.id = targetId;
    this.destroyCountDown = 0;
    this.stopSend = false;

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
    this.animations.add('walk', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 ], 20, true);
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
  if (this.socket)
  {
    this.updateMonsterPosition(this.socket);
  }

  if ( this.destroyCountDown > 0 ) {
      var dt = this.game.time.now - this.lastTime;
      this.lastTime = this.game.time.now;
      this.destroyCountDown -= dt;
          // console.log( "car count down: " + this.destroyCountDown );
      if ( this.destroyCountDown <= 0 ) {
          // console.log( "car destroy" );
          this.destroy();
      }
      return;
  }
};

Enemy_Car.prototype.socket = null;
Enemy_Car.prototype.updateMonsterPosition = function updateMonsterPosition()
{
    var json = {"id":this.id, "posX":this.x, "posY":this.y, "alive":this.alive};
    if ( this.socket ) {
        this.socket.emit('update_monster', json);
    }
};

Enemy_Car.prototype.die = function() {
    this.kill();
    this.destroyCountDown = 1000;
    this.lastTime = this.game.time.now;
    // this.destroy();

    if (this.socket)
    {
      this.updateMonsterPosition(this.socket);
    }
};
