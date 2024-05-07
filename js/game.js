let canvas;
let world;
let keyboard = new Keyboard();

// background_sound = new Audio('audio/backgroundSound.mp3'); 

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // console.log('My Character is', world.character);  
}

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

function startGame() {
    init();
    document.getElementById('startButton').classList.add('d-none');
    document.getElementById('startScreenImg').classList.add('d-none');
    document.getElementById('startScreen').style.justifyContent = 'center';
    document.getElementById('infoScreen').classList.add('d-none');
    document.getElementById('infoBox').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('headline').classList.remove('d-none');
    document.getElementById('button').style.marginBottom = '0';
    document.getElementById('fullscreenImg').style.display = 'block';
    document.getElementById('soundButtonOn').style.display = 'block';
    document.getElementById('soundButtonOff').style.display = 'block';
    // this.background_sound.play();
}

function openInfoBox() {
    document.getElementById('infoContainer').classList.remove('d-none');
}

document.addEventListener('click', function(event) {
    var infoContainer = document.getElementById('infoContainer');
    var infoButton = document.getElementById('infoButton');
    
    if (!infoContainer.contains(event.target) && event.target !== infoButton) {
        infoContainer.classList.add('d-none');
    }
});


function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {  
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  
      element.webkitRequestFullscreen();
    }
  }

function soundOn() {
    if (background_sound) {
        background_sound.play();
    }
}

function soundOff() {
    if (background_sound) {
        background_sound.pause();
    }
}

// background_sound.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
// }, false);
