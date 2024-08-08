class ThrowableObject extends MovableObject {

    floor = 350;
    noSoundBrokenBottle = true;

    throwBottleRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    throwBottleSplash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, statusBar, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.throwBottleRotation);
        this.loadImages(this.throwBottleSplash);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.statusBar = statusBar;
        this.direction = direction; 
        this.throw();
        this.animateThrowable();
    }

    /**
     * Animate the throwable object
     */
    animateThrowable() {
        setInterval(() => {
            if (this.y < this.floor) {
                this.playAnimation(this.throwBottleRotation);
            } else if (this.y >= this.floor) {
                this.playAnimation(this.throwBottleSplash);
                if (this.noSoundBrokenBottle == true) {
                    soundManagement.startSound('brokenBottleSound');
                }
                setTimeout(() => {
                    this.noSoundBrokenBottle = false;
                });
            }
        }, 1000 / 60);
    }
    
    /**
     * Throw the object with gravity applied
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10 * this.direction;
        }, 25);
        if (this.statusBar) {
            this.statusBar.setPercentageBottle(this.statusBar.percentage - 20);
        } 
    }

    /**
     * Sets the percentage and updates the corresponding image for the given status bar
     * 
     * @param {DrawableObject} statusBar - The status bar instance to update
     * @param {number} percentage - The new percentage value (0 to 100)
     */
    setPercentage(statusBar, percentage) {
        statusBar.percentage = percentage;
        let path = statusBar.images[this.resolveImageIndex(percentage)];
        statusBar.img = statusBar.imageCache[path];
    }

    /**
     * Resolves the image index based on the percentage
     * 
     * @param {number} percentage - The percentage to resolve the image index for
     * @returns {number} - The index of the image corresponding to the given percentage
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

    