let canvas;
let world;
let keyboard = new Keyboard();

background_sound = new Audio('audio/backgroundSound.mp3'); 
background_sound.volume = 0.1;

/**
 * Initializes the game environment by setting up the canvas.
 */

function init() {
    // initLevel();
    canvas = document.getElementById('canvas');
    // world = new World(canvas, keyboard);
    // startGame();
    // console.log('My Character is', world.character);  
}

/**
 * Event listener for keydown events to update the keyboard state.
 * @param {KeyboardEvent} e - The keydown event.
 */

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.right = true;
    }
    if(e.keyCode == 37) {
        keyboard.left = true;
    }
    if(e.keyCode == 40) {
        keyboard.down = true;
    }
    if(e.keyCode == 38) {
        keyboard.up = true;
    }
    if(e.keyCode == 32) {
        keyboard.space = true;
    }
    if(e.keyCode == 68) {
        keyboard.d = true;
    }
    // console.log(e);
});

/**
 * Event listener for keyup events to update the keyboard state.
 * @param {KeyboardEvent} e - The keyup event.
 */

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.right = false;
    }
    if(e.keyCode == 37) {
        keyboard.left = false;
    }
    if(e.keyCode == 40) {
        keyboard.down = false;
    }
    if(e.keyCode == 38) {
        keyboard.up = false;
    }
    if(e.keyCode == 32) {
        keyboard.space = false;
    }
    if(e.keyCode == 68) {
        keyboard.d = false;
    }
});

function mobileButtonPressEvents() {
    document.getElementById('leftButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });

    document.getElementById('leftButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    });

    document.getElementById('rightButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });

    document.getElementById('rightButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    });

    document.getElementById('spaceButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    });

    document.getElementById('spaceButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.space = false;
    });

    document.getElementById('dButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.d = true;
    });

    document.getElementById('dButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.d = false;
    });
}


/**
 * Starts the game by initializing the level and setting up the world.
 */

function startGame() {
    initLevel();
    // init();
    world = new World(canvas, keyboard);
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('startScreenImg').classList.add('d-none');
    document.getElementById('startScreen').style.justifyContent = 'center';
    document.getElementById('infoScreen').classList.add('d-none');
    document.getElementById('infoBox').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('headline').classList.remove('d-none');
    document.getElementById('button').style.marginBottom = '0';
    document.getElementById('fullscreenImg').style.display = 'block';
    document.getElementById('soundButtonOn').classList.remove('d-none');
    document.getElementById('soundButtonOff').classList.remove('d-none');
    document.getElementById('mobileButtonContainerOne').classList.remove('d-none');
    document.getElementById('mobileButtonContainerTwo').classList.remove('d-none');
    
    document.getElementById('imprint').classList.add('d-none');
    document.getElementById('dataprotection').classList.add('d-none');
    document.getElementById('menuButton').classList.remove('d-none');
    document.getElementById('userInfoContainer').classList.add('d-none');
    mobileButtonPressEvents();

    if (window.innerWidth <= 720) {
        document.getElementById('userInfoContainer').classList.add('d-none');
    } 

    background_sound.play();
}

// document.getElementById('startButton').addEventListener('click', startGame);

/**
 * Opens the information box.
 */

function openInfoBox() {
    document.getElementById('infoContainer').classList.remove('d-none');
}

/**
 * Event listener for click events to close the information box if clicked outside.
 * @param {MouseEvent} event - The click event.
 */

document.addEventListener('click', function(event) {
    var infoContainer = document.getElementById('infoContainer');
    var infoButton = document.getElementById('infoButton');
    
    if (!infoContainer.contains(event.target) && event.target !== infoButton) {
        infoContainer.classList.add('d-none');
    }
});

/**
 * Activates fullscreen mode for the canvas.
 */

function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {  
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  
      element.webkitRequestFullscreen();
    }
}

/**
 * Enables the background sound.
 */

function soundOn() {
    if (background_sound) {
        background_sound.play();
        world.soundEnabled = true;
    }
}

/**
 * Disables the background sound and stops the character's snoring sound if active.
 */

function soundOff() {
    if (background_sound) {
        background_sound.pause();
        if (world && world.character && world.character.snoring_sound) {
            world.character.snoring_sound.pause();
            console.log('stop snoring sound');
        }
    }
    world.soundEnabled = false;
}

/**
 * Loops the background sound when it ends.
 */

background_sound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

/**
 * Reloads the game to start a new game.
 */

function newGame() {
    window.location.reload();
}

/**
 * Reloads the game to go back to the menu.
 */

function goToMenu() {
    window.location.reload();
}
