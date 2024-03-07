class World {
    character = new Character();
    level = level1;
    bottles = level1.bottles;
    coins = level1.coins;
    bottle = [];
    coin = [];
    collectedBottles = 0;
    collectedCoins = 0;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [];
    collectedCoinsSound = new Audio ('audio/collectedCoinsSound.mp3');
    collectedBottlesSound = new Audio ('audio/collectedBottlesSound.mp3');
    noSoundCoins = true;
    noSoundBottles = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.bottleCollision();
            this.coinCollision();
        }, 200);
    }

    checkThrowableObjects() {
        if(this.keyboard.d) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
        // this.bottleCollision();
    }

    
    bottleCollision() {
        if (this.level && this.level.bottles) {
            this.level.bottles.forEach((bottle, i) => {
                if (this.character.isColliding(bottle)) {
                    this.character.collectingBottles();
                    if (this.noSoundBottles == true) {
                        this.collectedBottlesSound.play();
                    }
                    this.level.bottles.splice(i, 1);
                    this.statusBarBottles.setPercentageBottle(this.character.quantityBottles);
                    this.collectedBottles += 1;
                }
            });
        }
    }

    
    coinCollision() {
        if (this.level && this.level.coins) {
            this.level.coins.forEach((coin, i) => {
                if (this.character.isColliding(coin)) {
                    this.character.collectingCoins();
                    if (this.noSoundCoins == true) {
                        this.collectedCoinsSound.play();
                    }
                    this.level.coins.splice(i, 1);
                    this.statusBarCoins.setPercentageCoins(this.character.quantityCoins);
                    this.collectedCoins += 1;
                }
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        
        this.ctx.translate(-this.camera_x, 0);
        

        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
    
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(this.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    
}