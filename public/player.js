var Player = function(game, x, y, id) {
    this.id = id;

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

    this.anchor.setTo( 0.5, 0.5 );
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.SPEED = 100;
    this.TURN_RATE = 5;

    this.animations.add('walk', [ 0, 1 ], 5, true);
    this.play('walk');

    game.physics.enable(this, Phaser.Physics.ARCADE);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
};