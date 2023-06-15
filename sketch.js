var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var invisibleBlock2,  invisibleBlock2Group;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() 
{
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.4
  ghost.velocityY = 5
  
  climbersGroup = new Group()
  doorsGroup = new Group()
  invisibleBlockGroup = new Group()
  invisibleBlock2Group = new Group()

  ghost.debug = false
  ghost.setCollider("rectangle",0,0,270,ghost.height)
   
}

function draw() 
{
  background(200);
  
  if(gameState == "play")
  {
      
          if(tower.y > 400)
          {
            tower.y = 300
          }

          if(keyDown ("space"))
          {
            ghost.velocityY = -6
          }
        ghost.velocityY = ghost.velocityY + 0.8

        if(keyDown("right"))
        {
          ghost.x = ghost.x + 5
        }

        if(keyDown("left"))
        {
          ghost.x = ghost.x - 5
        }
        
      doorClimber();
     
      if(ghost.isTouching(invisibleBlock2Group))

      {
        ghost.velocityY = 0
      }
      drawSprites() 

      if(ghost.isTouching(invisibleBlockGroup))
      {
        gameState = "end"
       
      }
  }
  else if(gameState = "end")
  {
  console.log("Game Over")
  ghost.velocityY = 0
  tower.velocityY = 0
  doorsGroup.setVelocityYEach(0)
  climbersGroup.setVelocityYEach(0)
  invisibleBlockGroup.setVelocityYEach(0)
  invisibleBlock2Group.setVelocityYEach(0)

  textSize(40)
  text("Game Over",200,300)
  
  }
   
}

function doorClimber()
{

if (frameCount % 150 == 0)
{
  door = createSprite(300,50,50,50)
  door.addImage("door",doorImg)
  door.x = Math.round(random(80,550))
  door.velocityY = 2
  door.depth = ghost.depth;
  ghost.depth = ghost.depth + 1;

  climber = createSprite(300,120,50,50)
  climber.addImage("climber", climberImg)
  climber.x = door.x 
  climber.velocityY = 2 
  climber.depth = ghost.depth;
  ghost.depth = ghost.depth + 1;

  
  climber.lifetime = 300
  door.lifetime = 300

  invisibleBlock = createSprite(300,130,90,20);
  invisibleBlock.velocityY = 2
  invisibleBlock.x = climber.x
  // invisibleBlock.y = climber.y
  invisibleBlock.visible = false;

  invisibleBlock2 = createSprite(300,100,90,20);
  invisibleBlock2.velocityY = 2
  invisibleBlock2.x = climber.x
  // invisibleBlock.y = climber.y
  invisibleBlock2.visible = false;

  climbersGroup.add(climber)
  doorsGroup.add(door)
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock2Group.add(invisibleBlock2)
}







}