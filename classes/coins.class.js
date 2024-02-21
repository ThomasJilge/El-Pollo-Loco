class Coins extends MovableObject {

    height = 170;
    width = 170;
    y = 100;

    imagesCoins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.imagesCoins[0]);
        this.loadImages(this.imagesCoins);
        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 200;
        // this.speed = 0.15 + Math.random() * 0.5;
        // this.animate();
    }

}