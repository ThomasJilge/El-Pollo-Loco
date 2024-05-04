class Chicken extends MovableObject {
    height = 80;
    width = 70;
    y = 350;
    // collidingChicken = false;

    enemyDeath = false;

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
        }, 1000 / 60);

        setInterval(() => {
            if (this.enemyDeath) {
                this.playAnimation(this.imagesWalking);
            } 
            if (this.enemyDeath) {
                this.loadImages(this.imagesDead);
                this.y += this.speedY;
            }

        }, 200);

        // setInterval( () => {
        //     if (this.isDead()) {
        //         this.loadImages('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        //         // this.playAnimation(this.imagesDead);
        //     } else {
        //     this.playAnimation(this.imagesWalking);
        //     }
        // }, 200);       
    }

}