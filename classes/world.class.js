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
    lastThrowTime = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.endboss = null;
        // this.collectedCoinsSound = new Audio('audio/collectedCoinsSound.mp3');
        // this.collectedBottlesSound = new Audio('audio/collectedBottlesSound.mp3');
    }

        toggleSound(action) {
        const audioObjects = [
            background_sound,
            this.collectedCoinsSound,
            this.collectedBottlesSound
        ];
        audioObjects.forEach(audio => {
            if (audio) {
                audio[action]();
            }
        });
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
            this.checkCollisions();
            // this.updateEndbossAndStatusBar();
            this.updateStatusBar();
        }, 50);
    }

    /**
    * Checks for and handles all collisions in the game.
    */
    checkCollisions() {
        this.checkCollisionEnemies();
        this.checkCollisionEndboss();
        this.checkCollisionBottleWithEnemies();
        this.checkThrowableObjects();
        this.bottleCollision();
        this.coinCollision();
        this.characterIsDead();
        // this.endbossIsDead();
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
        let currentTime = Date.now();
        if (this.collectedBottles > 0 && this.keyboard.d && currentTime - this.lastThrowTime > 500) {
            let direction = this.character.otherDirection ? -1 : 1;
            let offset = this.character.otherDirection ? -100 : 100;
            this.throwableObjects.push(new ThrowableObject(this.character.x + offset, this.character.y + 100, this.statusBarBottles, direction));
            this.character.resetIdleTimers();
            this.throwingBottle = true;
            this.collectedBottles--; 
            this.statusBarBottles.setPercentageBottle(this.collectedBottles * 20);
            this.lastThrowTime = currentTime;
        }
    }

    /**
     * Checks for collisions between the character and enemies
     */
    checkCollisionEnemies() {
        let hitted = false;
        this.level.enemies.forEach((enemy) => {
            if (!enemy.enemyDeath && (enemy instanceof Chicken || enemy instanceof ChickenSmall)) {
                hitted = this.checkAndHandleCollisionEnemies(enemy, hitted);
            }
        });
        if (hitted) {
            this.character.jump();
        }
    }

    /**
     * Handles collisions between the character and an enemy
     *
     * @param {Object} enemy - The enemy with which the character collides.
     * @param {boolean} hitted - Indicates whether the character has already been hit
     * @returns {boolean} - true if the character was hit, otherwise false
     */
    checkAndHandleCollisionEnemies(enemy, hitted) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isAboveGround() && this.character.speedY <= 0) {
                if (!hitted) {
                    this.setTimeOutEnemyDeath(enemy);
                    hitted = true;
                }
            } else {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }
        return hitted;
    }

    /**
    * Handles the logic when an enemy is killed
    * @param {Object} enemy - The enemy object that was killed
    */
    setTimeOutEnemyDeath(enemy) {
        enemy.enemyDeath = true;
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 500);
    }

    /**
     * Checks for collisions between the character and the endboss
     */
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
            }, 200);
        }
    }

    /**
    * Checks for collisions between the character and the endboss to inflict damage
    */
    checkCollisionEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && !enemy.enemyDeath) {
                if (this.character.isColliding(enemy)) {
                    this.character.hitByEndboss();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks for collisions between throwable objects (bottles) and enemies
     */
    checkCollisionBottleWithEnemies() {
        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy, i) => {
                if (throwableObject.isColliding(enemy)) {
                    enemy instanceof Endboss ? this.endbossCollision(enemy, i) : this.enemyCollision(enemy, i);
                    this.removeThrowableObject(throwableObject);
                }
            });
        });
    }

    /**
    * Handles the collision logic when an enemy is hit by a throwable object
    * @param {Object} enemy - The enemy object that was hit
    * @param {number} index - The index of the enemy in the enemies array
    */
    enemyCollision(enemy, index) {
        if (!enemy) return;
        enemy.enemyDeath = true;
        this.level.enemies.splice(index, 1);
    }

    /**
    * Removes a throwable object from the game
    * @param {Object} throwableObject - The throwable object to be removed
    */
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
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectingBottles();
                if (this.noSoundBottles) this.collectedBottlesSound.play();
                this.level.bottles.splice(i, 1);
                this.collectedBottles += 1;
                this.statusBarBottles.setPercentageBottle(this.collectedBottles * 20);
            }
        });
    }

    /**
     * Checks for collisions between the character and coins to collect them
     */
    coinCollision() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.collectingCoins();
                if (this.noSoundCoins) this.collectedCoinsSound.play();
                this.level.coins.splice(i, 1);
                this.statusBarCoins.setPercentageCoins(this.character.quantityCoins);
                this.collectedCoins += 1;
            }
        });
    }
    
    /**
     * Draws the game elements on the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.showEndbossStatusBar) {
            this.addToMap(this.statusBarEndboss);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
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
        gameIsOver.classList.toggle('d-none', this.character.energy > 0);
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
        let endbossDefeated = this.level.enemies.some(enemy => enemy instanceof Endboss && enemy.energy <= 0);
        this.setIntervalGameWon(endbossDefeated, gameIsWon);
    }

    /**
     * Periodically checks if the endboss is defeated and updates the game won status
     * If the endboss is defeated, it shows the game won screen and stops the game
     * @param {boolean} endbossDefeated - A flag indicating if the endboss has been defeated
     * @param {HTMLElement} gameIsWon - The HTML element representing the game won screen
     */
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
    updateStatusBar() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                let distance = Math.abs(this.character.x - enemy.x);
                if (distance <= 630) {
                    this.showEndbossStatusBar = true;
                    enemy.handleBehavior(distance, this.character);
                }
                if (enemy.energy <= 0) {
                    this.endbossIsDead(enemy);
                }
            }
        });
    }

    /**
     * Checks if the endboss is dead and triggers the game won sequence if so
     */
    endbossIsDead(enemy) {
        if (enemy.energy <= 0) {
            enemy.enemyDeath = true;
            if (!this.displayGameWon) {
                this.displayGameWon = true;
                this.gameWon();
            }
        }
    }
}
