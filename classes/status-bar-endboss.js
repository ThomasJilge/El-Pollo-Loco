class StatusBarEndboss extends DrawableObject {

    images = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    /**
     * The percentage of the endboss's health.
     * @type {number}
     * @default 0
     */

    percentage = 0;

    /** 
     * Constructs a new StatusBarEndboss instance
     */

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 60;
        this.setPercentageEndboss(100);
    }

    /** 
     * Sets the percentage of the endboss's health and updates the status bar image accordingly
     * @param {number} percentage - The new percentage of the endboss's health
     */

    setPercentageEndboss(percentage) {
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
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}