import * as Helper from './helper.js';
import GameObject from './GameObject.js';

export default class PipeCreator extends GameObject{
    constructor(){
        this.topPipe = {
            sourceX : 553,
            sourceY : 0,
        };

        this.bottomPipe = {
            sourceX : 502,
            sourceY : 0,
        }
        this.width = 53,
        this.height = 400,
        this.positions = [];
        this.gap = Helper.VariableObject.pipesGap;
        this.deltaX = Helper.VariableObject.deltaX;
        this.maxYPosition = Helper.VariableObject.maxYpipePosition;
    }

    draw(ctx){
        for(let i = 0; i< this.positions.length; i++){
            let currentPosiionPipe = this.positions[i];

            let topYPosition = currentPosiionPipe.y;
            let bottomYPosition = currentPosiionPipe.y + this.height + this.gap;

            // top pipe
            ctx.drawImage(Helper.sprite, this.topPipe.sourceX, this.topPipe.sourceY, this.width, this.height, currentPosiionPipe.x, topYPosition, this.width, this.height );

            // bottom pipe
            ctx.drawImage(Helper.sprite, this.bottomPipe.sourceX, this.bottomPipe.sourceY, this.width, this.height, currentPosiionPipe.x, bottomYPosition, this.width, this.height );
        }
    }

    update(){
        // If we are not in a game state, there is no need to create new pipes.
        if(Helper.State.CURRENT !== Helper.State.GAME){
            return;
        };

        if(Helper.VariableObject.frames % 100 == 0){
            this.positions.push({
                x : Helper.FieldSize.WIDTH,
                y : this.maxYPosition * (Math.random() + 1),
            })
        }

        for(let i = 0; i< this.positions.length; i++){
            let p = this.positions[i];
            let bottomPipeYPos = p.y + this.height + this.gap;

            // Collision detection
            // Detect collision with the top pipe
            this.colisionDetectTopPipe(bird,p);

            //Detect collision with the bottom pipe
            this.collisionDetectBottomPipe(bird,p,bottomPipeYPos)
            
            // Move the pipes to the left
            p.x -= this.deltaX;

            // if the pipe goes beyound canvas, we delete it from the position array
            if(p.x + this.width <= 0){
                this.position.shift();
                score.value++;
                SCORE_SOUND.play();
                score.best = Math.max(score.value,score.best);
                localStorage.setItem("best", score.best);
            }
       }
    }  
    
    reset(){
        this.positions = [];
    }

    colisionDetectTopPipe(bird,p){
        if(bird.destinationX + bird.radius > p.x 
            && bird.destinationX - bird.radius < p.x + this.width 
            && bird.destinationY + bird.radius > p.y 
            && bird.destinationY - bird.radius < p.y + this.height){
            Helper.State.CURRENT= Helper.State.OVER;
            Helper.HIT_SOUND.play();
        }
    }

    collisionDetectBottomPipe(bird,p,bottomPipeYPos){
        if(bird.destinationX + bird.radius > p.x 
            && bird.destinationX - bird.radius < p.x + this.width 
            && bird.destinationY + bird.radius > bottomPipeYPos
            && bird.destinationY - bird.radius < bottomPipeYPos + this.height){
            Helper.state.CURRENT = Helper.State.OVER;
            Helper.HIT_SOUND.play();
        }
    }
} 
