class StatusBarCoins extends DrawableObject {

    images = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    percentage = 0;

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
     * Sets the percentage of coins collected and updates the status bar image
     * 
     * @param {number} percentage - The new percentage of coins collected (0 to 100)
     */
    setPercentageCoins(percentage) {
        let throwableObject = new ThrowableObject();
        throwableObject.setPercentage(this, percentage);
    }
}