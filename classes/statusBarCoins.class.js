class StatusBarCoins extends DrawableObject {

    images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * The percentage of coins collected
     * @type {number}
     * @default 0
     */

    percentage = 0;

    /**
     * Creates a new StatusBarCoins instance
     */

    constructor() {
        super();
        this.loadImages(this.images);
        this.x = 30;
        this.y = 45;
        this.width = 200;
        this.height = 60;
        this.setPercentageCoins(0);
    }

    /**
     * Sets the percentage of coins collected and updates the displayed image
     * @param {number} percentage - The percentage of coins collected
     */

    setPercentageCoins(percentage) {
        this.percentage = percentage;   
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage of coins collected
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