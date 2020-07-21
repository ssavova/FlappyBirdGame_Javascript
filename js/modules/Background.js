import * as Helper from './helper.js';
import GameObject from './GameObject.js';
import * as Helper from './helper.js';

// Background definition
export default class Background extends GameObject{
    constructor(backgroundObjectDimenions){
        super(backgroundObjectDimenions);
    }

    draw(ctx){
        // We take the background from the sprite and draw it on our canvas
        ctx.drawImage(Helper.sprite, this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height);

        // but the width of the source background image is not equal to the width of the canvas, so we need to draw it again.
        ctx.drawImage(Helper.sprite, this.sourceX, this.sourceY, this.width, this.height, this.destinationX + this.width, this.destinationY, this.width, this.height);
    }

    // Background doesnt need update, but each object must have update method.
    update(){

    }
}

// Just a comment to try branching ... 