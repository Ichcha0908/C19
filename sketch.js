var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,500)
  ghost.addImage("ghost-standing", ghostImg)
  ghost.scale = 0.3

  doorsGroup= new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
  
}

function draw() {
  background(200);
  
  if(gameState=== "play"){
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown(UP_ARROW)){
    ghost.velocityY = -1
  }

  if(keyDown(DOWN_ARROW)){
    ghost.velocityY = 2
  }

  if(keyDown(RIGHT_ARROW)){
    ghost.velocityX= 1
  }

  if(keyDown(LEFT_ARROW)){
    ghost.velocityX = -1
  }
  spawnDoor()

  
if(ghost.isTouching(climbersGroup)){
  tower
}

  if(ghost.isTouching(invisibleBlockGroup)){
    gameState = "end"
  }
}
else if(gameState = "end"){
  ghost.destroy()
  climbersGroup.destroyEach()
  doorsGroup.destroyEach()
  invisibleBlockGroup.destroyEach()
  tower.destroy()

  background("black")
  fill("yellow")
  text("GAME OVER",300,300);

}
    drawSprites()
}

function spawnDoor(){
  if (frameCount % 200 === 0) {
  door = createSprite(280,0);
  door.x = Math.round(random(70,520))
  door.velocityY = 1
  door.addImage("door", doorImg);
  doorsGroup.add(door)

  climber = createSprite(door.x,250);
  climber.y = door.y +50
  climber.velocityY = 1
  climber.addImage("climber", climberImg)
  climbersGroup.add(climber)
  ghost.depth = climber.depth +1

  invisibleBlock = createSprite(door.x,260,door.width,10);
  invisibleBlock.y = climber.y+10;
  invisibleBlock.velocityY = 1
  invisibleBlockGroup.add(invisibleBlock);  
  
  }
}

