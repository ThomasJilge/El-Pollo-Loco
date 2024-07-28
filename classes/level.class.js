class Level {

    enemies;
    bottles;
    coins;
    clouds;
    backgroundObjects;
    levelEndx = 3000;

    constructor(enemies, bottles, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}