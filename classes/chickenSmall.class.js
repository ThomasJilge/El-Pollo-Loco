class ChickenSmall extends MovableObject {

    height = 60;
    width = 50;
    y = 370;
    noSoundSmallChickenHit = true;
    enemyDeath = false;

    offset = {
        top: -5,
        bottom: -5,
        left: -5,
        right: -5,
    }

    imagesWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    imagesDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.x = 500 + Math.random() * 1500;
        this.speed = 0.10 + Math.random() * 0.5;
        this.animateSmallChicken();
    }

    /**
     * Animates the small chicken
     * Moves the chicken to the left continuously
     * Plays the walking or dead animation based on the state of the chicken
     */
    animateSmallChicken() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (this.enemyDeath) {
                this.playAnimation(this.imagesDead);
                if (this.noSoundSmallChickenHit) {
                    soundManagement.startSound('smallChickenHitSound');
                    this.noSoundSmallChickenHit = false;
                }
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);
    }
    
}