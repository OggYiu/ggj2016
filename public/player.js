var Player = function(game, x, y, id) {
    this.entityType = "Player";
    this.id = id;
    this.hurtCoolDown = 0;
    this.attackCoolDown = 0;
    this.stateNormalName = "normal";
    this.stateHurtName = "hurt";
    this.stateAttackName = "attack";

    this.HURT_INTERVAL = 2000;
    this.ATTACK_INTERVAL = 1000;
    this.hp = 20;

    this.currentState = this.stateNormalName;

    var imageName = "";
    switch( this.id ) {
        case 1: {
            imageName = 'player_1';
        }
        break;
        case 2: {
            imageName = 'player_2';
        }
        break;
        case 3: {
            imageName = 'player_3';
        }
        break;
    }
    Phaser.Sprite.call( this, game, x, y, imageName );

    // this.filters = [this.game.grayFilter];

    // this.filters = null;

    this.anchor.setTo( 0.5, 0.5 );
    game.physics.enable(this, Phaser.Physics.ARCADE);
    //this.SPEED = 100;
    // this.TURN_RATE = 5;

    this.animations.add('walk', [ 0, 1 ], 5, true);
    this.animations.add('hurt', [ 6 ]);
    this.play('walk');

    // game.physics.enable(this, Phaser.Physics.ARCADE);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
    if ( this.hurtCoolDown > 0 ) {
        var dt = this.game.time.now - this.lastTime;
        this.hurtCoolDown -= dt;
        this.lastTime = this.game.time.now;

        if ( this.hurtCoolDown <= 0 ) {
            this.changeState( this.stateNormalName );
        }
    } else if ( this.attackCoolDown > 0 ) {
        var dt = this.game.time.now - this.lastTime;
        this.attackCoolDown -= dt;
        this.lastTime = this.game.time.now;

        if ( this.attackCoolDown <= 0 ) {
            this.changeState( this.stateNormalName );
        }
    }
};
Player.prototype.hurt = function() {
    // console.log( "hrut");
    this.hurtCoolDown = this.HURT_INTERVAL;
    this.attackCoolDown = 0;
    this.lastTime = this.game.time.now;
    this.play( 'hurt' );    
    this.currentState = this.stateHurtName;
    this.filters = null;
};

Player.prototype.attack = function() {
    // console.log( "hrut");
    this.hurtCoolDown = 0;
    this.attackCoolDown = this.ATTACK_INTERVAL;
    this.lastTime = this.game.time.now;
    this.play( 'hurt' );
    this.currentState = this.stateAttackName;
    this.filters = [ this.game.glowFilter ];
};

Player.prototype.normal = function() {
    // console.log( "hrut");
    this.hurtCoolDown = 0;
    this.attackCoolDown = 0;
    this.lastTime = this.game.time.now;
    this.play( 'walk' );
    this.currentState = this.stateNormalName;
    this.filters = null;
};

Player.prototype.changeState = function( state ) {
    if ( this.isDied() ) {
        return;
    }
    switch( state ) {
        case this.stateHurtName:
            this.hurt();
            break;
        case this.stateAttackName:
            this.attack();
            break;
        case this.stateNormalName:
            this.normal();
            break;
    }
}

Player.prototype.checkState = function( state ) {
    return this.currentState == state;
}

Player.prototype.isHurt = function() {
    return this.checkState( this.stateHurtName );
}

Player.prototype.isAttacking = function() {
    return this.checkState( this.stateAttackName );
}

Player.prototype.isDied = function() {
    return this.hp <= 0;
}