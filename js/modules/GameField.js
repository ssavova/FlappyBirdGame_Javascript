import * as Helper from './helper.js';

//Game Field Definition
// This class represents canvas element on which the game objects are drawn

export default class GameField{
    //constructor receives canvas, has size and context
    constructor(canvas){
        canvas.width = Helper.FieldSize.WIDTH;
        canvas.height = Helper.FieldSize.HEIGHT;
        this.ctx = canvas.getContext("2d");
        // this.ctx.fillStyle = "#70c5ce"; this should be move to startGame() in gameEngine file
        // this.ctx.fillRect(0, 0, Helper.FieldSize.WIDTH, Helper.FieldSize.HEIGHT);  this should be move to startGame() in gameEngine file
    }
    
    //this methods receives gameObjects and draws them
    draw(gameObjects){
        for(let i = 0; i<gameObjects.length; i++){
            gameObjects[i].draw(this.ctx);
        }
    }
}