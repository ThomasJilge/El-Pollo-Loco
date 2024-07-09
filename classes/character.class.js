class Character extends MovableObject {

    height = 250;
    y = 180;
    speed = 10;
    characterIdle = false;
    characterLongIdle = false;
    idleTimer;
    longIdleTimer;
    CharacterIsHurt_sound = new Audio('audio/characterHurt.mp3');
    noSoundCharacterIsHurt = true;

    // bottles = 0;

    offset = {
        top: 80,
        bottom: 5,
        left: 10,
        right: 10,
    };

    imagesWalking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    imagesJumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    imagesDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    imagesHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    imagesLongIdle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('audio/running.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');

    /**
     * Creates an instance of Character and initializes it with images and animations
     */

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.applyGravity();
        this.animate();
        // this.bottlesCollected = 0;
    }

    /**
     * Handles the character's animations and movements
     */

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndx) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                this.resetIdleTimers();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirection = true ;
                this.resetIdleTimers();
            }
            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.jump();
                this.resetIdleTimers();
            }
            if (!this.world.keyboard.space && !this.world.keyboard.right && !this.world.keyboard.left && !this.world.keyboard.d) {
                this.setIdleTimers();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imagesDead);

            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
                if (this.noSoundCharacterIsHurt) {
                    this.CharacterIsHurt_sound.play();
                    this.noSoundCharacterIsHurt = false;
                }

            } else if (this.isAboveGround()) {
                this.playAnimation(this.imagesJumping);

            } else if (this.world.keyboard.right || this.world.keyboard.left) {
                this.playAnimation(this.imagesWalking);

            } 
        }, 50);  

        setInterval(() => {
            if (this.characterIdle) {
                this.playAnimation(this.imagesIdle);
            }
        }, 200);

        setInterval(() => {
            if (this.characterLongIdle) {
                this.playAnimation(this.imagesLongIdle);
                if (this.world.soundEnabled) {
                    this.snoring_sound.play();
                }
            } else {
                this.snoring_sound.pause();
            }
        }, 200);
    }

    /**
     * Sets the idle and long idle timers
     */

    setIdleTimers() {
        if (!this.idleTimer) {
            this.idleTimer = setTimeout(() => {
                this.isIdle();
                console.log('Character idle');
            }, 2000);
        }
        if (!this.longIdleTimer) {
            this.longIdleTimer = setTimeout(() => {
                this.isLongIdle();
                console.log('Character long idle');
            }, 5000);
        }
    }

    /**
     * Resets the idle and long idle timers
     */

    resetIdleTimers() {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
            this.idleTimer = null;
        }
        if (this.longIdleTimer) {
            clearTimeout(this.longIdleTimer);
            this.longIdleTimer = null;
        }
        this.characterIdle = true;
        this.characterLongIdle = false;
    }

    /**
     * Makes the character jump
     */

    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the character is about to fall.
     * @returns {boolean} - True if the character is about to fall, otherwise false
     */

    isAboutToFall() {
        return this.speedY > 0;
    }

    /**
     * Checks if the character is above the ground.
     * @returns {boolean} - True if the character is above the ground, otherwise false
     */

    isAboveGround() {
        return this.y < 180; 
    }
    

}