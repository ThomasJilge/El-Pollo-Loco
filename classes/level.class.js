class Level {
    enemies;
    // bottles;
    clouds;
    backgroundObjects;
    levelEndx = 2200;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        // this.bottles = bottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}