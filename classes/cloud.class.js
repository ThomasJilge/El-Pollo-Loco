class Cloud extends MovableObject {

    /**
     * Vertical position of the cloud
     * @type {number}
     */

    y = 50;

    /**
     * Width of the cloud
     * @type {number}
     */

    width = 500;

    /**
     * Height of the cloud.
     * @type {number}
     */

    height = 250;

    /**
     * Speed of the cloud
     * @type {number}
     */

    speed = 0.15;

    /**
     * Creates an instance of Cloud
     * Loads the initial image, sets the initial position, and starts the animation
     */

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2000;
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left
     */

    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud to the left continuously at the defined speed
     */

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}