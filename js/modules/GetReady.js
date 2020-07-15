import GameObject from './GameObject.js'
import * as Helper from './helper.js'

// Get Ready message definition

export default class GetReady extends GameObject{
    constructor(getReadyMessDimensions){
        super(getReadyMessDimensions);
    }

    // GetReady Object doesnt need update, but each object must have update method.
    update(){

    }

    // We need to show this message only when the game state is "getReady".
    draw(ctx){
        if(Helper.State.CURRENT == Helper.State.GETREADY){
            ctx.drawImage(Helper.sprite, this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height);
        }
    }
}
