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
    displayGameWon = false;
    showEndbossStatusBar = false;
    enemyDeath = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.endboss = null;
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisionEnemies();
            this.checkCollisionBottleWithEnemies();
            this.checkThrowableObjects();
            this.bottleCollision();
            this.coinCollision();
            this.characterIsDead();
            this.endbossIsDead();
            this.updateEndbossStatusBar();
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


    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy, i) => {
            if (!enemy.enemyDeath && (enemy instanceof Chicken || enemy instanceof ChickenSmall || enemy instanceof Endboss)) {
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

    checkCollisionBottleWithEnemies() {
        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy, i) => {
                if (throwableObject.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        console.log('test');
                        enemy.energy -= 20;
                        enemy.isHurt = true;
                        console.log('endboss reduce energy');
                        this.statusBarEndboss.setPercentageEndboss(enemy.energy);
                        setTimeout(() => {
                            enemy.isHurt = false;
                        }, 1000);
                        if (enemy.energy <= 0) {
                            enemy.enemyDeath = true;
                            setTimeout(() => {
                                this.level.enemies.splice(i, 1);
                            }, 500);
                        }
                    } else {
                        enemy.enemyDeath = true;
                        setTimeout(() => {
                            this.level.enemies.splice(i, 1);
                        }, 500);
                    }
                    const y = this.throwableObjects.indexOf(throwableObject);
                    this.throwableObjects.splice(y, 1);
                }
            });
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

        if (this.showEndbossStatusBar) {
            this.addToMap(this.statusBarEndboss);
        }

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


    endbossIsDead() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.energy <= 0) {
                if (!this.displayGameWon) {
                    this.displayGameWon = true;
                    this.gameWon();
                }
            }
        });
    }


    characterIsDead() {
        if (!this.displayGameOver && this.character.energy <= 0) {
            this.displayGameOver = true;
            this.gameOver();
        }
    }


    gameOver() {
        console.log('Game over!');
        let gameIsOver = document.getElementById('gameOver');
        if (this.character.energy <= 0) {
            gameIsOver.classList.remove('d-none');
        } else {
            gameIsOver.classList.add('d-none');
            this.displayGameOver = false;
        }
        this.clearIntervals();
    }

    gameWon() {
        console.log('Game won!');
        let gameIsWon = document.getElementById('gameWon');
        let endbossDefeated = false;
    
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.energy <= 0) {
                endbossDefeated = true;
            }
        });

        setInterval( () => {
            if (endbossDefeated) {
                gameIsWon.classList.remove('d-none');
                this.displayGameWon = true;
                this.clearIntervals();
            } else {
                gameIsWon.classList.add('d-none');
                this.displayGameWon = false;
            }
        }, 2000);   
    
        
    }
    

    updateEndbossStatusBar() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                let distance = Math.abs(this.character.x - enemy.x);
                if (distance <= 630) {
                    this.showEndbossStatusBar = true;
                    if (distance <= 430 && !enemy.walkingDone) {
                        enemy.startWalking();
                    }
                } else {
                    this.showEndbossStatusBar = false;
                }
            }
        });
    }

    


}
