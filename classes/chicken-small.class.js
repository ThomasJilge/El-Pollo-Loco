class ChickenSmall extends MovableObject {
    height = 60;
    width = 50;
    y = 370;
    smallChickenHitSound = new Audio ('audio/chicken2.mp3');
    noSoundSmallChickenHit = true;

    enemyDeath = false;

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