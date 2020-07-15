import GameObject from './GameObject.js'
import * as Helper from './helper.js'

// GameOver message definition

export default class GameOver extends GameObject{
    constructor(GameOverDimensions){
        super(GameOverDimensions);
    }

    // GameOver Object doesnt need update, but each object must have update method.
    update(){

    }

    // We need to show this message only when the game state is "GameOver".
    draw(ctx){
        if(Helper.State.CURRENT == Helper.State.OVER){
            super.draw(ctx);
        }
    }
}
