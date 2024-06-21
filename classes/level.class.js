class Level {

    /** 
     * Array of enemies in the level
     * @type {Array}
     */

    enemies;

    /** 
     * Array of bottles in the level
     * @type {Array}
     */

    bottles;

    /** 
     * Array of coins in the level
     * @type {Array}
     */

    coins;

    /** 
     * Array of clouds in the level
     * @type {Array}
     */

    clouds;

    /** 
     * Array of background objects in the level
     * @type {Array}
     */

    backgroundObjects;

    /**
     * The x-coordinate where the level ends
     * @type {number}
     * @default 2200
     */

    levelEndx = 2200;

    /**
     * Creates a new Level instance
     * 
     * @param {Array} enemies - The enemies in the level
     * @param {Array} bottles - The bottles in the level
     * @param {Array} coins - The coins in the level
     * @param {Array} clouds - The clouds in the level
     * @param {Array} backgroundObjects - The background objects in the level
     */

    constructor(enemies, bottles, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}