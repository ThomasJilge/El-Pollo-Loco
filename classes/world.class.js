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
    soundEnabled = true;

    /**
     * Initializes the World with a canvas and keyboard input
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn
     * @param {Object} keyboard - An object to handle keyboard input
     */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.endboss = null;
    }

    /**
     * Sets the world property of the character to this instance of the World
     */

    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop, checking various conditions and updating the game state
     */

    run() {
        setInterval(() => {
            this.checkCollisionEnemies();
            this.endbossCollision();
            this.enemyCollision();
            this.removeThrowableObject();
            this.checkCollisionBottleWithEnemies();
            // this.checkCollisionWithEndboss();
            this.checkThrowableObjects();
            this.bottleCollision();
            this.coinCollision();
            this.characterIsDead();
            this.endbossIsDead();
            this.updateEndbossAndStatusBar();
        }, 100);
    }

    /**
     * Clears all intervals to stop the game loop
     */

    clearIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    };

    /**
     * Checks if throwable objects (bottles) should be created and added to the game
     */

    checkThrowableObjects() {
        if (this.collectedBottles > 0 && this.keyboard.d) {
            let direction = this.character.otherDirection ? -1 : 1;
            let offset = this.character.otherDirection ? -100 : 100;
            let bottle = new ThrowableObject(this.character.x + offset, this.character.y + 100, this.statusBarBottles, direction);
            this.throwableObjects.push(bottle);
            this.character.resetIdleTimers();
        }
    }

    /**
     * Checks for collisions between the character and enemies
     */

    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
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
                        console.log(`Character energy: ${this.character.energy}`);
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and the endboss
     */

    // checkCollisionWithEndboss() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (!enemy.enemyDeath && enemy instanceof Endboss) {
    //             if (this.character.isColliding(enemy)) {
    //                 if (this.character.isAboveGround()) {
    //                     this.character.jump();
    //                 } else {
    //                     this.character.hit();
    //                     this.statusBar.setPercentage(this.character.energy);
    //                 }
    //             }
    //         }
    //     });
    // }

    endbossCollision(enemy, index) {
        if (!enemy) return;
        enemy.energy -= 20;
        enemy.isHurt = true;
        enemy.noSoundEndbossIsHurt = true;
        this.statusBarEndboss.setPercentageEndboss(enemy.energy);
        setTimeout(() => {
            enemy.isHurt = false;
        }, 1000);
        if (enemy.energy <= 0) {
            enemy.enemyDeath = true;
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 500);
        }
    }
    
    /**
     * Checks for collisions between throwable objects (bottles) and enemies
     */

    // checkCollisionBottleWithEnemies() {
    //     this.throwableObjects.forEach((throwableObject) => {
    //         this.level.enemies.forEach((enemy, i) => {
    //             if (throwableObject.isColliding(enemy)) {
    //                 if (enemy instanceof Endboss) {
    //                     console.log('test');
    //                     enemy.energy -= 20;
    //                     enemy.isHurt = true;
    //                     enemy.noSoundEndbossIsHurt = true;
    //                     console.log('endboss reduce energy');
    //                     this.statusBarEndboss.setPercentageEndboss(enemy.energy);
    //                     setTimeout(() => {
    //                         enemy.isHurt = false;
    //                     }, 1000);
    //                     if (enemy.energy <= 0) {
    //                         console.log('endboss is dead');
    //                         enemy.enemyDeath = true;
    //                         setTimeout(() => {
    //                             this.level.enemies.splice(i, 1);
    //                         }, 500);
    //                     }
    //                     console.log(`Endboss energy: ${enemy.energy}`);
    //                 } else {
    //                     enemy.enemyDeath = true;
    //                     setTimeout(() => {
    //                         this.level.enemies.splice(i, 1);
    //                     }, 500);
    //                 }
    //                 const y = this.throwableObjects.indexOf(throwableObject);
    //                 this.throwableObjects.splice(y, 1);
    //             }
    //         });
    //     });
    // }

    checkCollisionBottleWithEnemies() {
        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy, i) => {
                if (throwableObject.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        this.endbossCollision(enemy, i);
                    } else {
                        this.enemyCollision(enemy, i);
                    }
                    this.removeThrowableObject(throwableObject);
                }
            });
        });
    }

    enemyCollision(enemy, index) {
        if (!enemy) return; // Safety check to ensure enemy is defined
        enemy.enemyDeath = true;
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 500);
    }

    removeThrowableObject(throwableObject) {
        const index = this.throwableObjects.indexOf(throwableObject);
        if (index > -1) {
            this.throwableObjects.splice(index, 1);
        }
    }

  
    /**
     * Checks for collisions between the character and bottles to collect them
     */
    
    bottleCollision() {
        if (this.level && this.level.bottles) {
            this.level.bottles.forEach((bottle, i) => {
                if (this.character.isColliding(bottle)) {
                    this.character.collectingBottles();
                    if (this.noSoundBottles == true) {
                        this.collectedBottlesSound.play();
                    }
                    this.level.bottles.splice(i, 1);
                    this.collectedBottles += 1;
                    let newPercentage = this.statusBarBottles.percentage + 20;
                    this.statusBarBottles.setPercentageBottle(newPercentage);
                }
            });
        }
    }
    

    /**
     * Checks for collisions between the character and coins to collect them
     */
    
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

    /**
     * Draws the game elements on the canvas
     */

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
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map
     * @param {Array} objects - An array of objects to be added to the map
     */

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single movable object to the map
     * @param {Object} mo - A movable object to be added to the map
     */

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

    /**
     * Flips the image horizontally for drawing
     * @param {Object} mo - A movable object to be flipped
     */

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image back to its original orientation
     * @param {Object} mo - A movable object to be restored
     */

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks if the character is dead and triggers the game over sequence
     */

    characterIsDead() {
        if (!this.displayGameOver && this.character.energy <= 0) {
            this.displayGameOver = true;
            this.gameOver();
        }
    }

    /**
     * Show the game over screen and stops the game
     */

    gameOver() {
        let gameIsOver = document.getElementById('gameOver');
        if (this.character.energy <= 0) {
            gameIsOver.classList.remove('d-none');
        } else {
            gameIsOver.classList.add('d-none');
            this.displayGameOver = false;
        }
        background_sound.pause();
        this.clearIntervals();
        this.character.snoring_sound.pause();
        this.character.walking_sound.pause();
    }

    /**
     * Show the game won screen and stops the game
     */

    gameWon() {
        let gameIsWon = document.getElementById('gameWon');
        let endbossDefeated = false;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.energy <= 0) {
                endbossDefeated = true;
            }
        });   
        this.setIntervalGameWon(endbossDefeated, gameIsWon);
    }
    
    setIntervalGameWon(endbossDefeated, gameIsWon) {
        setInterval(() => {
            if (endbossDefeated) {
                gameIsWon.classList.remove('d-none');
                this.displayGameWon = true;
                this.clearIntervals();
                this.character.snoring_sound.pause();
            } else {
                gameIsWon.classList.add('d-none');
                this.displayGameWon = false;
            }
        }, 2000); 
    }
    
    /**
     * Updates the status bar and triggers the endboss behavior
     */

    updateEndbossAndStatusBar() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                let distance = Math.abs(this.character.x - enemy.x);
                if (distance <= 630) {
                    this.showEndbossStatusBar = true;
                    this.endbossWalking(enemy, distance);
                    this.endbossAttack(enemy, distance);
                } 
            }
        });
    }

    endbossWalking(enemy, distance) {
        if (distance <= 430 && !enemy.walkingDone) {
            enemy.startWalking();
        }
    }

    endbossAttack(enemy, distance) {
        if (distance <= 150 && !enemy.isAttack) {
            enemy.startAttack();
        }
        if (distance >= 151 && enemy.isAttack) {
            enemy.stopAttack();
        }
    }

    /**
     * Checks if the endboss is dead and triggers the game won sequence if so
     */

    endbossIsDead() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.energy <= 0) {
                enemy.enemyDeath = true;
                if (!this.displayGameWon) {
                    this.displayGameWon = true;
                    this.gameWon();
                }
            }
        });
    }

}
