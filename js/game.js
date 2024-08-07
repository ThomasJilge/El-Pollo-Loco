let canvas;
let world;
let keyboard = new Keyboard();

// background_sound = new Audio('audio/backgroundSound.mp3'); 
// background_sound.volume = 0.1;

/**
 * Initializes the game environment by setting up the canvas
 */

function init() {
    canvas = document.getElementById('canvas'); 
}

/**
 * Event listener for keydown events to update the keyboard state
 * @param {KeyboardEvent} e - The keydown event
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
});

/**
 * Event listener for keyup events to update the keyboard state
 * @param {KeyboardEvent} e - The keyup event
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

/**
 * Adds touch event listeners to an element to handle touchstart, touchend, and touchmove events
 * @param {HTMLElement} element - The element to which touch listeners will be added
 * @param {Function} startCallback - The callback function to be called on touchstart event
 * @param {Function} endCallback - The callback function to be called on touchend event
 */

function addTouchListener(element, startCallback, endCallback) {
    let active = false;

    element.addEventListener('touchstart', (e) => {
        active = true;
        startCallback(e);
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
        if (active) {
            active = false;
            endCallback(e);
        }
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
        if (active) {
            e.preventDefault();
        }
    }, { passive: false });
}

document.addEventListener('DOMContentLoaded', () => {
    addTouchListener(document.getElementById('leftButton'), () => {
        keyboard.left = true;
    }, () => {
        keyboard.left = false;
    });

    addTouchListener(document.getElementById('rightButton'), () => {
        keyboard.right = true;
    }, () => {
        keyboard.right = false;
    });

    addTouchListener(document.getElementById('spaceButton'), () => {
        keyboard.space = true;
    }, () => {
        keyboard.space = false;
    });

    addTouchListener(document.getElementById('dButton'), () => {
        keyboard.d = true;
    }, () => {
        keyboard.d = false;
    });
});

/**
 * Starts the game by initializing the level and setting up the world
 */

function startGame() {
    initLevel();
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
    document.getElementById('button').style.height = 'auto';

    if (window.innerWidth <= 720) {
        document.getElementById('userInfoContainer').classList.add('d-none');
    } 
    
    // background_sound.play();
    // background_sound.volume = 0.1;
    soundManagement.startSound('backgroundSound');
    soundManagement.soundOn();
}

/**
 * Opens the information box
 */

function openInfoBox() {
    document.getElementById('infoContainer').classList.remove('d-none');
}

/**
 * Event listener for click events to close the information box if clicked outside
 * @param {MouseEvent} event - The click event
 */

document.addEventListener('click', function(event) {
    var infoContainer = document.getElementById('infoContainer');
    var infoButton = document.getElementById('infoButton');
    
    if (!infoContainer.contains(event.target) && event.target !== infoButton) {
        infoContainer.classList.add('d-none');
    }
});

/**
 * Activates fullscreen mode for the canvas
 */

function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode for a given element
 * @param {HTMLElement} element - The element to display in fullscreen
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
 * Loops the background sound when it ends
 */

// background_sound.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
// }, false);

/**
 * Reloads the game to start a new game
 */

function newGame() {
    startGame();
    document.getElementById('gameOver').classList.add('d-none');
    document.getElementById('gameWon').classList.add('d-none');
}

/**
 * Reloads the game to go back to the menu
 */

function goToMenu() {
    window.location.reload();
}
