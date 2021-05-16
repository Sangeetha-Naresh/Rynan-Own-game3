var PLAY= 1;
var END= 0;
var score= 0;
var coin, coinimg, coinGroup
var hunter, hunter_running
var runner, runner_running
var ground, invisibleGround, groundImage;
var bg;
var backgroundImg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstaclesGroup;
var gameState= PLAY;
var runnerstopimg, hunterstopimg;
var restart, restartimg;
var coin, coinimg;
var gameover, gameoverimg;

function preload()
{

  
  backgroundImg = loadImage("bg2.png")
  
  hunter_running = loadAnimation("H1.png", "H2.png", "H3.png", "H4.png", "H5.png", "H6.png", "H7.png", "H8.png");
  runner_running = loadAnimation("R1.png", "R2.png", "R3.png", "R4.png", "R5.png", "R6.png")

  coinimg= loadImage("coin.png")
  restartimg= loadImage("restart.png")

  obstacle1= loadImage("ob1.png")
  obstacle2= loadImage("ob2.png")
  obstacle3= loadImage("ob3.png")
  obstacle4= loadImage("ob4.png")

  runnerstopimg=loadAnimation("Rfall.png")
  hunterstopimg=loadAnimation("H3.png")
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width/2, height/2, windowWidth*4, windowHeight)
  bg.addImage(backgroundImg)
  
  bg.velocityX=-(3+score/100);
  bg.scale= 2;
  
  hunter = createSprite(100,height-70,20,50);
  hunter.addAnimation("running", hunter_running);

  hunter.addAnimation("stop", hunterstopimg)

  runner = createSprite(800,height-20,20,50);
  runner.debug=false;
  runner.setCollider("rectangle", -280,-130, 40, 60);
  runner.addAnimation("running", runner_running);

  runner.addAnimation("stop", runnerstopimg)

  invisibleGround = createSprite(width/2,height-10,width,35);  
  
  hunter.setCollider("rectangle", 0,0, 200, 150);
  hunter.debug=false;
  
  invisibleGround.visible =false;
  
  obstaclesGroup=new Group();



  restart=createSprite(width/2, height/2)
  restart.addImage("restart",restartimg)
  restart.scale=0.1;

  

  coinGroup=new Group();

  
}

function draw() 
{
  
  background(0);

 if(gameState===PLAY)
 {

  restart.visible=false;
    
  bg.velocityX=-(3+score/500);

  if(bg.x<150)
  {
    bg.x= width/2;
  }

 if((keyDown("SPACE") || touches.length>0) && runner.y>=height-120)
 {
  runner.velocityY=-12;
  touches=[];
 }

 runner.velocityY=runner.velocityY+1;
 runner.collide(invisibleGround);
 hunter.collide(invisibleGround);
 
  SpawnObstacles();
  SpawnCoin();

  for (var i = 0; i < coinGroup.length; i++)
  {
    if(coinGroup.isTouching(runner))
    {
      score=score+100;
      coinGroup.get(i).destroy();
    
    }
  }

  if(obstaclesGroup.isTouching(hunter))
  {
    hunter.velocityY=-12;

  }
  hunter.velocityY=hunter.velocityY+1;


  if(obstaclesGroup.isTouching(runner))
  {
    gameState= END;
  }
  

 }
    
else if(gameState===END)
{

restart.visible= true;

  bg.velocityX=0;
  runner.changeAnimation("stop", runnerstopimg);
  hunter.changeAnimation("stop", hunterstopimg);

  runner.collide(invisibleGround);
  hunter.collide(invisibleGround);

  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);

  coinGroup.setVelocityXEach(0);
  coinGroup.setLifetimeEach(-1);

if(touches.length>0 || keyDown("SPACE"))
{
  reset();
  touches=[];
}

}
  drawSprites();

  textSize(30);
  fill("white");
  text("score: "+ score, width/2-100, 100);
}

function reset()
{
  score=0;
  bg.velocityX=-(3+score/500);
  gameState=PLAY;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  runner.changeAnimation("running", runner_running );
  hunter.changeAnimation("running", hunter_running);
}


function SpawnObstacles(){
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(width,height-95,20,30);

    obstacle.velocityX = -(6+score/500);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale=0.7;
              obstacle.y=height-95;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale=0.8;
              obstacle.y=height-90;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale=0.9;
              obstacle.y=height-75;
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale=0.9;
              obstacle.y=height-60;
              break;
      default: break;
    }        
   
    obstacle.lifetime = 300;
  
    obstaclesGroup.add(obstacle);

  }
};

function SpawnCoin()
{
  if(frameCount % 70 === 0) {
    var coin = createSprite(width,random(height-100, height-300),20,30);

    coin.addImage("coin",coinimg);

    coin.velocityX = -(6+score/500);
   
    coin.lifetime = 300;
  
    coinGroup.add(coin);

  }
};