class Bottle extends DrawableObject {
    height = 80;
    width = 70;
    y = 350;

    imagesBottle = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];


    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png' );
        this.loadImages(this.imagesBottle);
        // this.x = 200 + Math.random() * 500;
        // this.speed = 0.15 + Math.random() * 0.5;
        // this.animate();
    }

}