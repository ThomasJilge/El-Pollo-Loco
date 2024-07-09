let enemyDeath = false;

class Chicken extends MovableObject {

    /**
     * Height of the chicken
     * @type {number}
     */

    height = 80;

    /**
     * Width of the chicken
     * @type {number}
     */

    width = 70;

    /**
     * Vertical position of the chicken
     * @type {number}
     */

    y = 350;

    /**
     * Sound played when the chicken is hit
     * @type {Audio}
     */

    chickenHitSound = new Audio ('audio/chicken1.mp3');

    /**
     * Flag to check if the sound for chicken hit has been played
     * @type {boolean}
     */

    noSoundChickenHit = true;

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
    };

    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    imagesDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of Chicken
     * Loads the initial image, all animation images, sets the initial position and speed
     * and starts the animation
     */

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


//     animateChicken() {
//         setInterval( () => {
//             this.moveLeft();
//         }, 1000 / 60);
//         setInterval(() => {
//             if (this.enemyDeath) {
//                     this.playAnimation(this.imagesDead);
//                     if (this.noSoundChickenHit == true) {
//                         this.chickenHitSound.play();
//                     }
//                     setTimeout(() => {
//                         this.noSoundChickenHit = false;
//                     });
//             } else {
//                 this.playAnimation(this.imagesWalking);
//             }
//         }, 200);      
//     }
// }