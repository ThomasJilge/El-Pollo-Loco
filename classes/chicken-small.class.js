class ChickenSmall extends MovableObject {

    /**
     * Height of the small chicken
     * @type {number}
     */

    height = 60;

    /**
     * Width of the small chicken
     * @type {number}
     */

    width = 50;

    /**
     * Vertical position of the small chicken
     * @type {number}
     */

    y = 370;

    /**
     * Sound played when the small chicken is hit
     * @type {Audio}
     */

    smallChickenHitSound = new Audio ('audio/chicken1.mp3');

    /**
     * Flag to check if the sound for small chicken hit has been played
     * @type {boolean}
     */

    noSoundSmallChickenHit = true;

    /**
     * Flag to check if the enemy is dead
     * @type {boolean}
     */

    enemyDeath = false;

    /**
     * Offset for collision detection
     * @type {Object}
     * @property {number} top - Top offset
     * @property {number} bottom - Bottom offset
     * @property {number} left - Left offset
     * @property {number} right - Right offset
     */

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

    /**
     * Creates an instance of ChickenSmall
     * Loads the initial image, all animation images, sets the initial position and speed
     * and starts the animation
     */

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
        setInterval( () => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.enemyDeath) {
                    this.playAnimation(this.imagesDead);
                    if (this.noSoundSmallChickenHit == true) {
                        this.smallChickenHitSound.play();
                    }
                    setTimeout(() => {
                        this.noSoundSmallChickenHit = false;
                    });
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);     
    }
}