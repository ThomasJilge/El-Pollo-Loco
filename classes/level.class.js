class Level {
    enemies;
    // chickens;
    bottles;
    clouds;
    backgroundObjects;
    levelEndx = 2200;

    constructor(enemies, bottles, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        // this.chickens = chickens;
        this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}