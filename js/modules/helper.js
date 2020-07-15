// Enumerations to be used in the game.
// Control Game state
const State = {
    CURRENT : 0,
    GETREADY: 0,
    GAME : 1,
    OVER : 2,
};

const FieldSize = Object.freeze({
    WIDTH : 320,
    HEIGHT : 480,
});

// Game variables and constants
const VariableObject = {
    frames : 0,
    DEGREE :  Math.PI / 180,
    pipesGap : 85,
    maxYpipePosition : -150,
    deltaX : 2,
}


//Load sprite
const sprite = new Image();
sprite.src = "img/spriteSheet.png";

//Load Game Sounds
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

// Dimensions of the Background Object
const BACKGROUND = {
    sourceX : 0,
    sourceY : 0,
    width : 275,
    height : 226,
    destinationX : 0,
    destinationY : FieldSize.HEIGHT - 226,
};

// Dimensions of the Foreground Object
const FOREGROUND = {
    sourceX : 276,
    sourceY : 0,
    width : 224,
    height : 112,
    destinationX : 0,
    destinationY : FieldSize.HEIGHT - 112,
};

// Dimensions of the GetReady Message
const GETREADY = {
    sourceX : 0,
    sourceY : 228,
    width : 173,
    height : 152,
    destinationX : FieldSize.WIDTH/2 - 173/2,
    destinationY : 80,
}

// Dimensions of the GameOver Message
const GAMEOVER = {
    sourceX : 175,
    sourceY : 228,
    width : 225,
    height : 202,
    destinationX : FieldSize.WIDTH/2 - 225/2,
    destinationY : 90,
}

// Start Button Coordinates
const startButton = {
    x : 120,
    y : 263,
    w : 83,
    h : 29,
}

export{
    State,
    FieldSize,
    sprite,
    SCORE_SOUND,
    DIE_SOUND,
    FLAP_SOUND,
    HIT_SOUND,
    SWOOSHING_SOUND,
    BACKGROUND,
    FOREGROUND,
    GETREADY,
    GAMEOVER,
    startButton,
    VariableObject,
};