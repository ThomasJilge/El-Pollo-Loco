class Coins extends MovableObject {

    height = 170;
    width = 170;

    imagesCoins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.imagesCoins[0]);
        this.loadImages(this.imagesCoins);
        this.x = 200 + Math.random() * 500;
        // this.speed = 0.15 + Math.random() * 0.5;
        // this.animate();
    }

}