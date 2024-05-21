class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;

    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    imagesDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.x = 2500;
        this.animateEndboss();
    }

    animateEndboss() {
        setInterval( () => {
            if (this.enemyDeath) {
                this.playAnimation(this.imagesDead);
                // if (this.noSoundChickenHit == true) {
                //     this.chickenHitSound.play();
                
                // setTimeout(() => {
                //     this.noSoundChickenHit = false;
                // });
        } else {
            this.playAnimation(this.imagesWalking);
        }
        }, 200);   
    }
}