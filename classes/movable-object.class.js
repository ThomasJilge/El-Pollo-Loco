class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    quantityBottles = 0;
    quantityCoins = 0;
    offsetY = 0;
    offsetX = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /** */

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /** */

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

    /** */

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

    /** */

    collectingBottles() {
        this.quantityBottles += 20;
        if (this.quantityBottles > 100) {
            this.quantityBottles = 100;
        }
    }

    /** */

    collectingCoins() {
        this.quantityCoins += 20;
        if (this.quantityCoins > 100) {
            this.quantityCoins = 100;
        }
    }

    /** */

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage ++;
    }

    /** */

    moveRight() {
        this.x += this.speed;
    }

    /** */

    moveLeft() {
        this.x -= this.speed;    
    }

    /** */

    jump() {
        this.speedY = 30;
    }

    /** */

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** */

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Differnce in s
        return timepassed < 1;
    }

    /** */

    isDead() {
        return this.energy == 0;
    }

    /** */

    isIdle() {
        return this.characterIdle = true;
    }

    /** */

    isLongIdle() {
        return this.characterLongIdle = true;
    }

}