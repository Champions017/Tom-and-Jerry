var tom,tomImg,tom_runningImg,tomImg4
var garden,gardenImg;
var jerry,jerryImg1,jerry_cheering,jerryImg4;
var resetBtn,resetBtnImg;

var PLAY = 1;
var END = 0;
var gameState = 1;

var sound;
var gameOver;

function preload() {
    //loading the images here
    tomImg = loadAnimation("cat1.png");
    tom_runningImg = loadAnimation("cat2.png","cat3.png")
    tomImg4 = loadAnimation("cat4.png");
    jerryImg1 = loadAnimation("mouse1.png")
    jerry_cheering = loadAnimation("mouse2.png","mouse3.png");
    jerryImg4 = loadAnimation("mouse4.png");
    gardenImg = loadImage("garden.png");
    resetBtnImg = loadImage("reset.png");
    sound = loadSound("jerrys-theme.mp3");
    gameOver = loadSound("gameOver.wav");
}

function setup(){
    createCanvas(1000,800);
    //create tom and jerry sprites here


    garden = createSprite(width/2,height/2);
    garden.addImage(gardenImg);


    tom = createSprite(800,600);
    tom.addAnimation("tom_lying_down",tomImg);
    tom.addAnimation("tom_running",tom_runningImg);
    tom.addAnimation("tom_happy",tomImg4);
    tom.scale = 0.1

    jerry = createSprite(100,600);
    jerry.addAnimation("jerry",jerryImg1);
    jerry.addAnimation("jerry_cheering",jerry_cheering);
    jerry.addAnimation("jerry_happy",jerryImg4)
    jerry.scale = 0.1

    jerry.setCollider("rectangle",0,0,700,900);
    tom.setCollider("rectangle",0,0,700,1000);

    resetBtn = createSprite(500,400);
    resetBtn.addImage(resetBtnImg);
    resetBtn.visible = false
}

function draw() {

    background(255);
    
    //Condition to evalute if tom and jerry collide
    if(gameState === PLAY){


        if(tom.isTouching(jerry)){
            tom.velocityX = 0;
            gameOver.play();
            gameState = END;
        }
        if(keyDown("left")){
            tom.changeAnimation("tom_running",tom_runningImg);
            tom.velocityX = -4
            tom.scale = 0.15
            sound.play();

            jerry.changeAnimation("jerry_cheering",jerry_cheering)
        }

    }

    if(gameState === END){
        resetBtn.visible = true;
        isTouching(jerry,tom);

        if(keyDown("r")){
            reset();
        }

        if(mousePressedOver(resetBtn)){
            reset();
        }

        if(touches.length > 0){
            if(resetBtn.overlapPoint(touches[0].x,touches[0].y)){
                reset();
            }
        }
    }
    drawSprites();
}

function reset(){
    resetBtn.visible = false;
    gameState = PLAY
    tom.x = 800
    tom.changeAnimation("tom_lying_down",tomImg);
    tom.scale = 0.1

    jerry.changeAnimation("jerry",jerryImg1)
}

function isTouching(jerry,tom){
    if(tom.isTouching(jerry)){
        sound.stop();
        tom.changeAnimation("tom_happy",tomImg4);
        jerry.changeAnimation("jerry_happy",jerryImg4);
    }
}

