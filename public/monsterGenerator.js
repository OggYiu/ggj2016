var MonsterGenerator = function(game) {
    this.game = game;
    this.lastTime = this.startTime = this.game.time.now

    this.GENERATE_INTERVAL = 2000;
    this.CAR_INCREASER = 0.3;
    this.TRACKER_INCREASER = 0.1;

    this.coolDownTime = this.GENERATE_INTERVAL;
    this.numberOfCar = 1;
    this.numberOfTracker = 0;
};
MonsterGenerator.prototype.constructor = MonsterGenerator;
MonsterGenerator.prototype.update = function() {
    if ( this.coolDownTime > 0 ) {
        var dt = this.game.time.now - this.lastTime;
        this.coolDownTime -= dt;
        if ( this.coolDownTime <= 0 ) {
            this.generateMonsters();
            this.coolDownTime = this.GENERATE_INTERVAL;

            this.numberOfCar += this.CAR_INCREASER;
            this.numberOfTracker += this.TRACKER_INCREASER;
        }
    }
    this.lastTime = this.game.time.now;
};
MonsterGenerator.prototype.generateMonsters = function() {
    var number_of_car = Math.round( this.numberOfCar );
    var number_of_tracker = Math.round( this.numberOfTracker );

    for ( var i = 0; i < number_of_car; ++i ) {
        this.game.createEnemyCar(this.game, this.game.getNextEnemyId(), this.game.rnd.integerInRange(0, 3), this.game.rnd.integerInRange(100, 200));
    }
    for ( var i = 0; i < number_of_tracker; ++i ) {
        var point = this.game.getRandomTrackerSpawnPos();
        this.game.createEnemyTracker(this.game, this.game.getNextEnemyId(), point.x, point.y, this.game.rnd.integerInRange(1, this.game.getNumberOfPlayer()));
    }
}
