class ThrowableObject extends MovableObject {

    constructor(x, y, statusBar) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.statusBar = statusBar;
        this.throw();
    }
    

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25);
        if (this.statusBar) {
            this.statusBar.setPercentageBottle(this.statusBar.percentage - 20);
        } 
    }
    }
    