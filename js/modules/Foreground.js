import GameObject from './GameObject.js';
import * as Helper from './helper.js';

// Foreground definition

export default class Foreground extends GameObject{
    constructor(foregroundObjectCoordinates){
        super(foregroundObjectCoordinates);
        this.deltax = 2;
    }

    draw(ctx){
        // We take the foreground from the sprite and draw it on our canvas
        context.drawImage(Helper.sprite, this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height);

        // but the width of the source foreground image is not equal to the width of the canvas, so we need to draw it again.
        context.drawImage(Helper.sprite, this.sourceX, this.sourceY, this.width, this.height, this.destinationX + this.width, this.destinationY, this.width, this.height);
    }

    // This update() method of the foreground brings the illusion that the field is moving
    update(){
        // Only when we are in game state we need to move our field, so we need to do the check for the state
        if(Helper.State.CURRENT == Helper.State.GAME){
            this.destinationX = (this.destinationX - this.deltaX) % (this.width/2)
        }
    }
}