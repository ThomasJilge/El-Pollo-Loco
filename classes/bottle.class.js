class Bottle extends MovableObject {

    height = 90;
    width = 80;
    y = 335;

    offset = {
        top: 10,
        bottom: 5,
        left: 5,
        right: 5,
    };

    imagesBottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.imagesBottle);
        this.x = 200 + Math.random() * 2000;
        this.y = 100 + Math.random() * 200;
        this.animate();
    }

    /**
     * Animates the bottle by continuously playing through its images
     * Uses setInterval to change images
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesBottle);
        }, 400);
    
    }
}