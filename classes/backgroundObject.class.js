class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Creates an instance of the background object
     * @param {string} imagePath - The path to the image to be loaded
     * @param {number} x - The x-coordinate position of the background object
     */

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; 
    }
}