class Coins extends MovableObject {

    /**
     * The height of the coin
     * @type {number}
     */

    height = 170;

    /**
     * The width of the coin
     * @type {number}
     */

    width = 170;

    /**
     * The initial y-coordinate of the coin
     * @type {number}
     */

    y = 100;

    /**
     * The offset values for collision detection
     * @type {Object}
     * @property {number} top - The top offset
     * @property {number} bottom - The bottom offset
     * @property {number} left - The left offset
     * @property {number} right - The right offset
     */

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
    };

    imagesCoins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of Coins
     * Loads the initial image and starts the animation
     */

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.imagesCoins);

        /**
         * The initial x-coordinate of the coin, randomly set between 200 and 2200
         * @type {number}
         */

        this.x = 200 + Math.random() * 2000;

        /**
         * The initial y-coordinate of the coin, randomly set between 100 and 300
         * @type {number}
         */

        this.y = 100 + Math.random() * 200;
        this.animate();
    }

    /**
     * Starts the animation for the coin, changing images every 400 milliseconds
     */

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesCoins);
        }, 400);
    }

}