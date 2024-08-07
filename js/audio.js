class Sound {
    constructor(src) {
        this.audio = new Audio(src);
        this.audio.muted = !soundEnabled;
    }
    
    play() {
        if (soundEnabled) {
            this.audio.play();
        }
    }
    
    pause() {
        this.audio.pause();
    }
    
    setMuted(muted) {
        this.audio.muted = muted;
    }
}

let soundEnabled = true;
const walkingSound = new Sound('audio/running.mp3');
const snoringSound = new Sound('audio/snoring.mp3');
const characterHurtSound = new Sound('audio/characterHurt.mp3');
const chickenHitSound = new Sound('audio/chicken1.mp3');

let character = null;
let chickenSmall = null;
let chicken = null;
let bottle = null;

function soundOn() {
    soundEnabled = true;
    updateAllSounds();
}

function soundOff() {
    soundEnabled = false;
    updateAllSounds();
}

function isSoundEnabled() {
    return soundEnabled;
}

function updateAllSounds() {
    walkingSound.setMuted(!soundEnabled);
    snoringSound.setMuted(!soundEnabled);
    characterHurtSound.setMuted(!soundEnabled);
    chickenHitSound.setMuted(!soundEnabled);
    
    if (character) {
        character.walking_sound.setMuted(!soundEnabled);
        character.snoring_sound.setMuted(!soundEnabled);
        character.CharacterIsHurt_sound.setMuted(!soundEnabled);
    }
    
    if (chickenSmall) {
        chickenSmall.smallChickenHitSound.setMuted(!soundEnabled);
    }
    
    if (chicken) {
        chicken.chickenHitSound.setMuted(!soundEnabled);
    }
    
    if (bottle && bottle.salsaBottleSound) {
        bottle.salsaBottleSound.setMuted(!soundEnabled);
    }
}
updateAllSounds();
