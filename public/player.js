var Player = function(game, x, y, id) {
    this.entityType = "Player";
    this.id = id;
    this.hurtCoolDown = 0;
    this.isHurt = false;

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

    // this.filters = [ this.game.glowFilter ];
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
    // console.log( "hrut update dt : " + dt);
        this.hurtCoolDown -= dt;
        this.lastTime = this.game.time.now;

        if ( this.hurtCoolDown <= 0 ) {
            this.isHurt = false;
            this.play('walk');
        }
    }
};
Player.prototype.hurt = function() {
    // console.log( "hrut");
    this.hurtCoolDown = 2000;
    this.lastTime = this.game.time.now;
    this.isHurt = true;
    this.play( 'hurt' );
};

Player.prototype.attack = function() {
    // console.log( "hrut");
    this.hurtCoolDown = 2000;
    this.lastTime = this.game.time.now;
    this.isHurt = true;
    this.play( 'hurt' );
};

Player.prototype.normal = function() {
    // console.log( "hrut");
    this.hurtCoolDown = 0;
    this.isHurt = false;
    this.play( 'hurt' );
};

Player.prototype.changeState = function( state ) {
    switch( state ) {
        case "hurt":
            this.hurt();
            break;
        case "attack":
            this.attack();
            break;
    }
}