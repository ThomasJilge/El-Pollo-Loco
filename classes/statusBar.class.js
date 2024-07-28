class StatusBar extends DrawableObject {

    images = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /** 
     * Sets the percentage of the player's health and updates the status bar image accordingly
     * @param {number} percentage - The new percentage of the player's health
     */
    setPercentage(percentage) {
        this.percentage = percentage;   
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** 
     * Determines the index of the image to be used based on the current percentage
     * @returns {number} The index of the image to be used
     */
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}