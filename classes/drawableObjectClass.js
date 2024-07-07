class DrawableObject {

    /**
     * The image of the drawable object
     * @type {HTMLImageElement}
     */

    img;

    /**
     * A cache for storing loaded images
     * @type {Object.<string, HTMLImageElement>}
     */

    imageCache = {};

    /**
     * The index of the current image in the image cache
     * @type {number}
     */

    currentImage = 0;

    /**
     * The x-coordinate of the drawable object
     * @type {number}
     */

    x = 120;

    /**
     * The y-coordinate of the drawable object
     * @type {number}
     */

    y = 280;

    /**
     * The height of the drawable object
     * @type {number}
     */

    height = 150;

    /**
     * The width of the drawable object
     * @type {number}
     */

    width = 100;

    /**
     * Loads an image from the given path
     * @param {string} path - The path to the image file
     */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image of the object on the given canvas context
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.drawFrameOffset(ctx);
    }

    /**
     * Draws a blue frame around the object if it is an instance of specified classes
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */

    drawFrame(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coins || this instanceof ChickenSmall || this instanceof Endboss) {
            ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            // ctx.stroke();
        }
    }

    /**
     * Draws a red frame offset around the object if it is an instance of specified classes
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */

    drawFrameOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Bottle || this instanceof Coins || this instanceof ChickenSmall || this instanceof Endboss) {
            ctx.beginPath();
            // ctx.lineWidth = '5';
            // ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            // ctx.stroke();
        }
    }

    /**
     * Loads multiple images from the given array of paths into the image cache
     * @param {string[]} arr - An array of paths to the image files
     */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}