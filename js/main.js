// Select our canvas
const canvas = document.getElementById("gameField");

// Get the context of our canvas
const context = canvas.getContext("2d");

//Game variables and constants
let frames = 0;
const DEGREE = Math.PI / 180 ;

// Load image that contains all needed small images
const mainImage = new Image();
mainImage.src = "img/spriteSheet.png"; 

// Load sounds
const SCORE_SOUND = new Audio();
SCORE_SOUND.src ="audio/sfx_point.wav";

const DIE_SOUND = new Audio();
DIE_SOUND.src ="audio/sfx_die.wav";

const FLAP_SOUND = new Audio();
FLAP_SOUND.src ="audio/sfx_flap.wav";

const HIT_SOUND = new Audio();
HIT_SOUND.src ="audio/sfx_hit.wav";

const SWOOSHING_SOUND = new Audio();
SWOOSHING_SOUND.src ="audio/sfx_swooshing.wav";

// Control Game state
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    gameOver : 2,
}

canvas.addEventListener('click', function(event){
    if(state.current == state.getReady){
        state.current = state.game;
        SWOOSHING_SOUND.play();
    }else if(state.current == state.game){
        bird.flap();
        FLAP_SOUND.play();
    }else if(state.current == state.gameOver){
        let rect = canvas.getBoundingClientRect();
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;

        // check whether we click on the start button
        if(clickX >= stratButton.x 
            && clickX <= stratButton.x + stratButton.w
            && clickY >= stratButton.y
            && clickY <= stratButton.y + stratButton.h){
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;
            }
    }
})

//Create the background
const background = {
    sourceX : 0,
    sourceY : 0,
    width : 275,
    height : 226,
    destinationX : 0,
    destinationY : canvas.height - 226,

    draw : function(){
        context.drawImage(mainImage, this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height);

        context.drawImage(mainImage, this.sourceX, this.sourceY, this.width, this.height, this.destinationX + this.width, this.destinationY, this.width, this.height);
    }

}

//Create foreground
const foreground = {
    sourceX : 276,
    sourceY : 0,
    width : 224,
    height : 112,
    destinationX : 0,
    destinationY : canvas.height - 112,
    deltaX : 2,

    draw : function(){
        context.drawImage(mainImage, this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height);

        context.drawImage(mainImage, this.sourceX, this.sourceY, this.width, this.height, this.destinationX + this.width, this.destinationY, this.width, this.height);
    },

    update : function(){
        if(state.current == state.game){
            this.destinationX = (this.destinationX - this.deltaX) % (this.width/2)
        }
    }

}

//Create Bird Object
const bird = {
    animation : [
        {sourceX: 276, sourceY: 112 },
        {sourceX: 276, sourceY: 139 },
        {sourceX: 276, sourceY: 164 },
        {sourceX: 276, sourceY: 139 },
    ],
    
    width : 34,
    height : 26,
    destinationX : 50,
    destinationY : 150,

    radius : 12,

    frame : 0, 

    speed: 0,
    gravity : 0.25,
    jump : 4.6,
    rotation : 0,


    draw : function(){
        let bird = this.animation[this.frame];
        context.save();
        context.translate(this.destinationX, this.destinationY);
        context.rotate(this.rotation);
        context.drawImage(mainImage, bird.sourceX, bird.sourceY, this.width, this.height, - this.width/2, - this.height/2, this.width, this.height);
        context.restore();
    },

    flap : function(){
        this.speed =  - this.jump;
    },

    update : function(){
        //If the game state is "getReady", the bird must flap slowly.
        this.period = state.current == state.getReady ? 10 : 5; 
        // We increment frame by 1, each period
        this.frame += frames % this.period == 0 ? 1 : 0; 
        //Frame goes from 0 to 4, and then again go back to zero
        this.frame = this.frame % this.animation.length;

        if(state.current == state.getReady){
            this.destinationY = 150; // reset the position of the bird  after gameover.
            this.rotation= 0 * DEGREE;
        }else{
            this.speed += this.gravity;
            this.destinationY += this.speed;

            if(this.destinationY + this.height/2 >= canvas.height - foreground.height){
                this.destinationY = canvas.height - foreground.height - this.height/2;

                if(state.current == state.game){
                    state.current = state.gameOver;
                    DIE_SOUND.play();
                }
            }

            // If the speed is greater than the jump, means that the bird is falling down
            if(this.speed >= this.jump){
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            }else{
                this.rotation = -25 * DEGREE;
            }
        }
    },

    speedReset : function(){
        this.speed = 0;
    }

}

// Create "GET READY" message
const getReady = {
    sourceX : 0,
    sourceY : 228,
    width : 173,
    height : 152,
    destinationX : canvas.width/2 - 173/2,
    destinationY : 80,

    draw : function(){
        if(state.current == state.getReady){
            context.drawImage(mainImage, this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height);
        }
    }
}

// Create "GAME OVER" message
const gameOver = {
    sourceX : 175,
    sourceY : 228,
    width : 225,
    height : 202,
    destinationX : canvas.width/2 - 225/2,
    destinationY : 90,

    draw : function(){
        if(state.current == state.gameOver){
            context.drawImage(mainImage, this.sourceX, this.sourceY, this.width, this.height, this.destinationX, this.destinationY, this.width, this.height);
        }
    }
}

// Create pipes
const pipes = {
    position : [],

    top : {
        sourceX : 553,
        sourceY : 0,
    },

    bottom : {
        sourceX : 502,
        sourceY : 0,

    },
    
    width : 53,
    height : 400,
    gap : 85,
    maxYPosition : -150,
    deltaX : 2,
    
    draw : function(){
        for(let i = 0; i< this.position.length; i++){
            let p = this.position[i];

            let topYPosition = p.y;
            let bottomYPosition = p.y + this.height + this.gap;

            // top pipe
            context.drawImage(mainImage, this.top.sourceX, this.top.sourceY, this.width, this.height, p.x, topYPosition, this.width, this.height );

            // bottom pipe
            context.drawImage(mainImage, this.bottom.sourceX, this.bottom.sourceY, this.width, this.height, p.x, bottomYPosition, this.width, this.height );
        }
    },

    update : function(){
        if(state.current !== state.game){
            return;
        };

        if(frames%100 == 0){
            this.position.push({
                x : canvas.width,
                y : this.maxYPosition * (Math.random() + 1),
            })
        }

        for(let i = 0; i< this.position.length; i++){
            let p = this.position[i];
            let bottomPipeYPos = p.y + this.height + this.gap;

            // Collision detection
            // Detect collision with the top pipe
            if(bird.destinationX + bird.radius > p.x 
                && bird.destinationX - bird.radius < p.x + this.width 
                && bird.destinationY + bird.radius > p.y 
                && bird.destinationY - bird.radius < p.y + this.height){
                state.current = state.gameOver;
                HIT_SOUND.play();
            }

            //Detect collision with the bottom pipe
            if(bird.destinationX + bird.radius > p.x 
                && bird.destinationX - bird.radius < p.x + this.width 
                && bird.destinationY + bird.radius > bottomPipeYPos
                && bird.destinationY - bird.radius < bottomPipeYPos + this.height){
                state.current = state.gameOver;
                HIT_SOUND.play();
            }

            // Move the pipes to the left
            p.x -=this.deltaX;

            // if the pipe goes beyound canvas, we delete it from the position array
            if(p.x + this.width <= 0){
                this.position.shift();
                score.value++;
                SCORE_SOUND.play();
                score.best = Math.max(score.value,score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },

    reset : function(){
        this.position = [];
    }

}

// Score
const score = {
    best : parseInt(localStorage.getItem('best')) || 0,
    value : 0,

    draw : function(){
        context.fillStyle = "#FFF";
        context.strokeStyle = "#000";
        if(state.current == state.game){
            context.lineWidth = 2;
            context.font = "35px Teko";
            context.fillText(this.value, canvas.width/2, 50);
            context.strokeText(this.value, canvas.width/2, 50);
        }else if(state.current == state.gameOver){
            //Score value
            context.font = "25px Teko";
            context.fillText(this.value, 225, 186);
            context.strokeText(this.value, 225, 186);

            //Best score
            context.fillText(this.best, 225, 228);
            context.strokeText(this.best, 225, 228);
        }
    },

    reset : function(){
        this.value = 0;
    }
}

// Start button coordination
const stratButton = {
    x : 120,
    y : 263,
    w : 83,
    h : 29,
}

// Main Draw function
function draw(){
    context.fillStyle = "#70c5ce";
    context.fillRect(0 , 0, canvas.width, canvas.height)

    background.draw();
    pipes.draw();
    foreground.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

// Update
function update(){
    bird.update();
    foreground.update();
    pipes.update();
}

// Loop 
function loop(){
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();