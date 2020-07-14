import * as Helper from './helper.js'; 

// This is the base class of the game. All object in the game are Game Objects.
export default class GameObject{
    constructor(gameObjectCoordinates){
        this.sourceX =  gameObjectCoordinates.sourceX;
        this.sourceY = gameObjectCoordinates.sourceY;
        this.width =  gameObjectCoordinates.width;
        this.height = gameObjectCoordinates.height;
        this.destinationX = gameObjectCoordinates.destinationX;
        this.destinationY = gameObjectCoordinates.destinationY;
    }

    update(){
        throw new Error("Not implemented.");
    }

    draw(ctx){
        ctx.drawImage(Helper.sprite,this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height)
    }
}
