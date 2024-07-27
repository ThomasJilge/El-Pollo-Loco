class Coins extends MovableObject {

    height = 170;

    width = 170;

    y = 100;

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

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.imagesCoins);
        this.x = 200 + Math.random() * 2000;
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