class soundManagement {

    static allSounds = {
        characterIsHurt_sound: new Audio('audio/characterHurt.mp3'),
        chickenHitSound: new Audio ('audio/chicken1.mp3'),
        smallChickenHitSound: new Audio ('audio/chicken1.mp3'),
        endbossDeadSound: new Audio ('audio/endbossDead.mp3'),
        endBossIsHurt: new Audio ('audio/endbossHurt.mp3'),
        brokenBottleSound: new Audio ('audio/brokenBottle.mp3'),
        collectedCoinsSound: new Audio ('audio/collectedCoinsSound.mp3'),
        collectedBottlesSound: new Audio ('audio/collectedBottlesSound.mp3'),
        walking_sound: new Audio('audio/running.mp3'),
        snoring_sound: new Audio('audio/snoring.mp3'),
        background_sound: new Audio('audio/backgroundSound.mp3')
    };

    static isMuted = false;

    static startSound(soundName) {
        const sound = this.allSounds[soundName];
        if (sound) {
            sound.volume = 0.1;
            sound.play();
        } 
    }

    /**
     * Turns on all sounds.
     */
    static soundOn() {
        this.isMuted = false;
        this.allSounds.background_sound.muted = false; 
        if (this.allSounds.background_sound.paused) {
            this.allSounds.background_sound.play(); 
        }
    }
  
    /**
     * Turns off all sounds.
     */
    static soundOff() {
        this.isMuted = true;
        this.allSounds.background_sound.muted = true;
        if (!this.allSounds.background_sound.paused) {
            this.allSounds.background_sound.pause();
        }
    }

    static applyMuteState() {
        if (this.isMuted) {
            this.soundOff();
        } else {
            this.soundOn();
        }
    }
}

