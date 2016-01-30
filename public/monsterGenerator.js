var MonsterGenerator = function(game) {
    this.game = game;
    this.lastTime = this.startTime = this.game.time.now;
    this.coolDownTime = 1000;
};
MonsterGenerator.prototype.constructor = MonsterGenerator;
MonsterGenerator.prototype.update = function() {
    if ( this.coolDownTime > 0 ) {
        var dt = this.game.time.now - this.lastTime;
        this.coolDownTime -= dt;
        if ( this.coolDownTime <= 0 ) {
            this.generateMonsters();
            this.coolDownTime = 2000;
        }
    }
    this.lastTime = this.game.time.now;
};
MonsterGenerator.prototype.generateMonsters = function() {
    this.game.createEnemyCar(this.game, this.game.getNextEnemyId(), this.game.rnd.integerInRange(0, 3), this.game.rnd.integerInRange(100, 200));
    this.game.createEnemyCar(this.game, this.game.getNextEnemyId(), this.game.rnd.integerInRange(0, 3), this.game.rnd.integerInRange(100, 200));
    this.game.createEnemyCar(this.game, this.game.getNextEnemyId(), this.game.rnd.integerInRange(0, 3), this.game.rnd.integerInRange(100, 200));
    this.game.createEnemyCar(this.game, this.game.getNextEnemyId(), this.game.rnd.integerInRange(0, 3), this.game.rnd.integerInRange(100, 200));
}
