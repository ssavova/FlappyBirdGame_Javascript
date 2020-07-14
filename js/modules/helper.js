// Enumerations to be used in the game.
// Control Game state
const State = Object.freeze({
    CURRENT : 0,
    GETREADY: 0,
    GAME : 1,
    OVER : 2,
});

const FieldSize = Object.freeze({
    WIDTH : 320,
    HEIGHT : 480,
});

// Game variables and constants
const frames = 0;
const DEGREE = Math.PI / 180 ;

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

const BACKGROUND = {
    sourceX : 0,
    sourceY : 0,
    width : 275,
    height : 226,
    destinationX : 0,
    destinationY : FieldSize.HEIGHT - 226,
}

export{
    State,
    FieldSize,
    frames,
    DEGREE,
    sprite,
    SCORE_SOUND,
    DIE_SOUND,
    FLAP_SOUND,
    HIT_SOUND,
    SWOOSHING_SOUND,
    BACKGROUND,
};