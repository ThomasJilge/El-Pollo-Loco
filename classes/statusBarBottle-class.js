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
     * Sets the percentage of bottles collected and updates the status bar image
     * 
     * @param {number} percentage - The new percentage of bottles collected (0 to 100)
     */
    setPercentageBottle(percentage) {
        let throwableObject = new ThrowableObject(); 
        throwableObject.setPercentage(this, percentage);
    }
  
}