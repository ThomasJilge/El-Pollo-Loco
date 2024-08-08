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

    /**
     * Plays the sound from the beginning and sets its volume to 1.0
     */
    static startSound(soundName) {
        const sound = this.allSounds[soundName];
        if (sound) {
            sound.currentTime = 0; 
            sound.volume = 1.0;
            sound.play();
        }
    }

    /**
     * Turns on all sounds
     */
    static soundOn() {
        this.isMuted = false;
        for (let soundName in this.allSounds) {
            let sound = this.allSounds[soundName];
            sound.muted = false;
            if (soundName === 'background_sound' && sound.paused) {
                sound.play(); 
            }
            this.setBackgroundVolume(0.1);
        }
    }

    /**
     * Turns off all sounds
     */
    static soundOff() {
        this.isMuted = true;
        for (let soundName in this.allSounds) {
            let sound = this.allSounds[soundName];
            sound.muted = true;
            if (!sound.paused) {
                sound.pause();
            }
        }
    }

    /**
     * Pauses the sound if it is currently playing
     *
     * @param {string} soundName - The key name of the sound in the `allSounds` object to be paused
     */
    static soundPause(soundName) {
        const sound = this.allSounds[soundName];
        if (sound) {
            sound.pause();
        }
    }

    /**
     * Applies the current mute state to all sounds
     * 
     * If the `isMuted` flag is true, all sounds are muted and the background sound is paused
     * Otherwise, all sounds are unmuted and the background sound is resumed if it was paused
     */
    static applyMuteState() {
        if (this.isMuted) {
            this.soundOff();
        } else {
            this.soundOn();
        }
    }

        /**
     * Sets the volume of the background sound (0.0 to 1.0)
     * 
     * @param {number} volume - Volume level
     */
    static setBackgroundVolume(volume) {
        const backgroundSound = this.allSounds['background_sound'];
        if (backgroundSound) {
            backgroundSound.volume = volume;
        }
    }
}

