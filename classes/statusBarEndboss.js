class StatusBarEndboss extends DrawableObject {

    images = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    percentage = 0;

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
     * Sets the percentage of the endboss's health and updates the status bar image
     * 
     * @param {number} percentage - The new percentage of the endboss's health (100 to 0)
     */
    setPercentageEndboss(percentage) {
        let throwableObject = new ThrowableObject(); 
        throwableObject.setPercentage(this, percentage);
    }
}