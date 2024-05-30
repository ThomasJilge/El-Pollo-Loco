class Endboss extends MovableObject {

    endbossDeadSound = new Audio ('audio/endbossDead.mp3');
    noSoundEndbossDead = true;
    alertDone = false;
    walkingDone = false;
    isHurt = false;
    isAttack = false;
    isNotAttack = true;
    enemyDeath = false;

    height = 400;
    width = 250;
    y = 55;

    imagesAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    imagesAttack = [
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    imagesHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    imagesDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 2500;
        this.speed = 2.0;
        this.animateEndboss();
    }

    
    animateEndboss() {
        setInterval(() => {
            if (this.walkingDone && !this.enemyDeath) {
                this.moveLeft();
            }
        }, 100);
        
        setInterval(() => {
            if (this.enemyDeath) {
                this.playAnimation(this.imagesDead);
                if (this.noSoundEndbossDead) {
                    this.endbossDeadSound.play();
                    this.noSoundEndbossDead = false;
                }
            } else if (this.isHurt) {
                this.playAnimation(this.imagesHurt);
            } else if (this.alertDone) {
                this.playAnimation(this.imagesAlert);
            } else if (this.isAttack) {
                this.playAnimation(this.imagesAttack);
            } else if (this.walkingDone) {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);
    }


    startWalking() {
        this.walkingDone = true;
    }

    startAttack() {
        this.isAttack = true;
        this.isNotAttack = false;
    }
    
    stopAttack() {
        this.isAttack = false;
        this.isNotAttack = true;
    }

    // startAttack() {
    //     this.isAttack = true;
    // }

    // stopAttack() {
    //     this.isNotAttack = false;
    // }


    // walkingEndboss() {
    //     setInterval(() => {
    //         this.moveLeft();
    //         this.playAnimation(this.imagesWalking);
    //     }, 200);
    // }

}



