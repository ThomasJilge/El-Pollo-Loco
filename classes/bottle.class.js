class Bottle extends MovableObject {
    height = 90;
    width = 80;
    y = 335;

    imagesBottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        super().loadImage(this.imagesBottle[0]);
        this.loadImages(this.imagesBottle);
        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 200;
        // this.speed = 0.15 + Math.random() * 0.5;
        // this.animate();
    }

}