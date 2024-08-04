class StatusBarBottles extends DrawableObject {

    images = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 30;
        this.y = 95;
        this.width = 200;
        this.height = 60;
        this.setPercentageBottle(0);
    }

    /**
     * Sets the percentage of bottles collected and updates the displayed image
     * @param {number} percentage - The percentage of bottles collected
     */
    setPercentageBottle(percentage) {
        this.percentage = percentage;   
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Resolves the image index based on the current percentage of bottles collected
     * @returns {number} The index of the image to display
     */
    resolveImageIndex() {
        if(this.percentage == 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
  
}