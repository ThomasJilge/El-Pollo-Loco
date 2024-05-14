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
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedCoinsSound = new Audio ('audio/collectedCoinsSound.mp3');
    collectedBottlesSound = new Audio ('audio/collectedBottlesSound.mp3');
    noSoundCoins = true;
    noSoundBottles = true;
    displayGameOver = false;

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
            this.characterIsDead();
        }, 200);
    }

    clearIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    };

    checkThrowableObjects() {
        if(this.statusBarBottles.percentage > 0 && this.keyboard.d) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.statusBarBottles);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (!enemy.enemyDeath && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
                if (this.character.isColliding(enemy)) {
                    if (this.character.isAboveGround()) {
                        enemy.enemyDeath = true;
                        setTimeout(() => {
                            const index = this.level.enemies.indexOf(enemy);
                            this.level.enemies.splice(index, 1);
                        }, 500);
                        this.character.jump();
                    } else {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }   
                }
            }
        });
    }
    
    bottleCollision() {
        if (this.level && this.level.bottles) {
            this.level.bottles.forEach((bottle, i) => {
                if (this.character.isColliding(bottle) && this.collectedBottles < 5) {
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
        this.addToMap(this.statusBarEndboss);
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
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    // gameOver() {
    //     let gameIsOver = document.getElementById('gameOver');
    //     if (this.character.energy <= 0) {
    //         gameIsOver.style.display = 'block';
    //     } else {
    //         gameIsOver.style.display = 'none';
    //         this.displayGameOver = false;
    //     }
    // }

    gameOver() {
        let gameIsOver = document.getElementById('gameOver');
        if (this.character.energy <= 0) {
            gameIsOver.classList.remove('d-none');
        } else {
            gameIsOver.classList.add('d-none');
            this.displayGameOver = false;
        }
        console.log('now Game Over (Function gameOver)!');
        this.clearIntervals();
    }
    

    characterIsDead() {
        if (!this.displayGameOver && this.character.energy <= 0) {
            this.displayGameOver = true;
            this.gameOver();
            console.log('now Game Over (Function characterIsDead)!');
        }
    }

}