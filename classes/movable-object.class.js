class MovableObject extends DrawableObject {

    /** 
     * The speed of the object
     * @type {number}
     * @default 0.15
     */

    speed = 0.15;

    /** 
     * Indicates if the object is moving in the other direction
     * @type {boolean}
     * @default false
     */

    otherDirection = false;

    /** 
     * The vertical speed of the object
     * @type {number}
     * @default 0
     */

    speedY = 0;

    /** 
     * The acceleration due to gravity
     * @type {number}
     * @default 2.5
     */

    acceleration = 2.5;

    /** 
     * The energy level of the object
     * @type {number}
     * @default 100
     */

    energy = 100;

    /** 
     * The timestamp of the last hit
     * @type {number}
     * @default 0
     */

    lastHit = 0;

    /** 
     * The quantity of bottles collected
     * @type {number}
     * @default 0
     */

    quantityBottles = 0;

    /** 
     * The quantity of coins collected
     * @type {number}
     * @default 0
     */

    quantityCoins = 0;

    /** 
     * The Y-axis offset
     * @type {number}
     * @default 0
     */

    offsetY = 0;

    /** 
     * The X-axis offset
     * @type {number}
     * @default 0
     */

    offsetX = 0;

    /**
     * The offset boundaries of the object
     * @type {Object}
     * @property {number} top - Top offset
     * @property {number} bottom - Bottom offset
     * @property {number} left - Left offset
     * @property {number} right - Right offset
     */

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /** 
     * Applies gravity to the object
     */

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /** 
     * Checks if the object is above ground.
     * @returns {boolean} True if the object is above ground, false otherwise
     */

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 180;
        }
    }


    // isColliding(obj) {
    //     return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
    //             (this.y + this.offsetY + this.height) >= obj.y &&
    //             (this.y + this.offsetY) <= (obj.y + obj.height) && 
    // }

    /** */

    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x &&
    //         this.y < mo.y + mo.height;
    // }

    /** 
     * Checks if the object is colliding with another object
     * @param {Object} mo - The object to check collision with
     * @returns {boolean} True if the objects are colliding, false otherwise
     */

    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
          this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
          this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
          this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
      }

    // isCollidingOffset(mo) {
    //     return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
    //       this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
    //       this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
    //       this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
    //   }


    // jumpOnEnemies(enemy) { 
    //     return this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
    //         this.y + this.height > enemy.y &&
    //         this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right &&
    //         this.y < enemy.y + enemy.height;

    // }

    /** 
     * Collects bottles and updates the quantity
     */

    collectingBottles() {
        this.quantityBottles += 20;
        if (this.quantityBottles > 100) {
            this.quantityBottles = 100;
        }
    }

    /** 
     * Collects coins and updates the quantity
     */

    collectingCoins() {
        this.quantityCoins += 20;
        if (this.quantityCoins > 100) {
            this.quantityCoins = 100;
        }
    }

    /** 
     * Plays the animation from the provided images
     * @param {Array} images - The array of images for the animation
     */

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
    }

    /** 
     * Moves the object to the right
     */

    moveRight() {
        this.x += this.speed;
    }

    /** 
     * Moves the object to the left
     */

    moveLeft() {
        this.x -= this.speed;    
    }

    /** 
     * Makes the object jump
     */

    jump() {
        this.speedY = 30;
    }

    /** 
     * Decreases the energy of the object when hit
     */

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** 
     * Checks if the object is hurt
     * @returns {boolean} True if the object is hurt, false otherwise
     */

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /** 
     * Checks if the object is dead
     * @returns {boolean} True if the object is dead, false otherwise
     */

    isDead() {
        return this.energy == 0;
    }

    /** 
     * Sets the object to idle state
     * @returns {boolean} True if the object is idle, false otherwise
     */

    isIdle() {
        return this.characterIdle = true;
    }

    /** 
     * Sets the object to long idle state
     * @returns {boolean} True if the object is in long idle state, false otherwise
     */

    isLongIdle() {
        return this.characterLongIdle = true;
    }

}