let enemyDeath = false;

class Chicken extends MovableObject {

    height = 80;

    width = 70;

    y = 350;

    chickenHitSound = new Audio ('audio/chicken1.mp3');

    noSoundChickenHit = true;

    offset = {
        top: -5,
        bottom: -5,
        left: -5,
        right: -5,
    };

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
        this.animateChicken();
    }

    /**
     * Animates the chicken
     * Moves the chicken to the left continuously
     * Plays the walking or dead animation based on the state of the chicken
     */

    animateChicken() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (this.enemyDeath) {
                this.playAnimation(this.imagesDead);
                if (this.noSoundChickenHit) {
                    this.chickenHitSound.play();
                    this.noSoundChickenHit = false;
                }
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);
    }
}
