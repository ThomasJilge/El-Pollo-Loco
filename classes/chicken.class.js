class Chicken extends MovableObject {
    height = 80;
    width = 70;
    y = 350;
    // collidingChicken = false;

    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    imagesDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.x = 500 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.moveLeft();
            this.checkChickenDeath();
        }, 1000 / 60);

        setInterval( () => {
            this.playAnimation(this.imagesWalking);
        }, 200);       
    }

    checkChickenDeath() {
        if (this.isDead()) {
            this.deadChicken();
        }
    }

    deadChicken() {
        this.playAnimation(this.imagesDead);
    }

}