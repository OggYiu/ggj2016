var MonsterGenerator = function(game) {
    this.game = game;
    this.startTime = this.game.time.now;
    this.coolDownTime = 1000;
};
MonsterGenerator.prototype.constructor = MonsterGenerator;
MonsterGenerator.prototype.update = function() {
    if ( this.coolDownTime >= 0 ) {

    }
};