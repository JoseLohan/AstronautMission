var astronaut, astronaut_Img, astronautUp_Img, astronautDown_Img;
var asteroid, asteroid_Img;
var pandoraPalace_Sound;
var asteroidGp;
var gameOver, gameOver_Img;
var restart, restart_Img
var space, space_Img;
var edges
var astronaut_inv

var Score = 0;
var Recorde = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  astronaut_Img = loadAnimation("astronaut.png");
  astronautUp_Img = loadAnimation("astronautUp.png");
  astronautDown_Img = loadAnimation("astronautDown.png");

  gameOver_Img = loadImage("Game Over.png");
  restart_Img = loadImage("Restart.png");

  space_Img = loadImage("Space.png");

  asteroid_Img = loadImage("Obstacle.png");
  pandoraPalace_Sound = loadSound("Loop_Sound.m4a");

}

function setup() {
  createCanvas(800, 300);

  space = createSprite(200, height / 2, width, height);
  space.addImage(space_Img);

  astronaut = createSprite(100, 150, 20, 20);
  astronaut.scale = 0.3
  astronaut.addAnimation("NoMoving", astronaut_Img)
  astronaut.addAnimation("Down", astronautDown_Img);
  astronaut.addAnimation("Up", astronautUp_Img);

  gameOver = createSprite(400, 150, 50, 50);
  gameOver.scale = 0.5;
  gameOver.addImage(gameOver_Img);

  restart = createSprite(400, 200, 50, 50);
  restart.scale = 0.2;
  restart.addImage(restart_Img);

  gameOver.visible = false;
  restart.visible = false;

  edges = createEdgeSprites();

  asteroidGp = new Group()
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    if(!pandoraPalace_Sound.isPlaying()){
      pandoraPalace_Sound.play();
      pandoraPalace_Sound.setVolume(0.3);
    }
    if (keyDown("down")) {
      astronaut.changeAnimation("Down");
      astronaut.y += 5;
    }

    if (keyDown("up")) {
      astronaut.changeAnimation("Up");
      astronaut.y -= 5;
    }

    Score += Math.round(getFrameRate() / 50);

    space.velocityX = (2 + Score / 200)
    if (space.x > 590) {
      space.x = 200
    }
    spawnAsteroids();
  }

  if (astronaut.isTouching(asteroidGp)) {
    gameState = END
  }

  if (gameState === END) {
    asteroidGp.setVelocityEach(0, 0);
    asteroidGp.lifetime = -1
    space.setVelocity(0, 0);
    gameOver.visible = true;
    restart.visible = true;
    pandoraPalace_Sound.stop();
    Score = 0


    if (Recorde < Score) {
      Recorde = Score;

    }

    if (mousePressedOver(restart)) {
      gameState = PLAY
      restart.visible = false;
      gameOver.visible = false;
      astronaut.y = 150;
      asteroidGp.destroyEach();
      frameCount = 1;
      space.x = 200
      pandoraPalace_Sound.play();
    }

  }

  //astronaut.debug = true
  astronaut.setCollider("rectangle", 0, -20, 200, 200, 360)
  astronaut.collide(edges);


  drawSprites();

  fill("black");
  strokeWeight(1);
  stroke("white");
  textSize(20);
  textAlign(CENTER);
  text("Pontuação: " + Score, width - 150, height - 230);
  text("Melhor Pontuação: " + Recorde, width - 200, height - 250);
}
function spawnAsteroids() {
  if (frameCount % 95 === 0) {
    asteroid = createSprite(800, 2, 30, 30);
    asteroid.velocityX = -(2 + Score / 200);;
    asteroid.addImage(asteroid_Img);
    asteroid.y = random(50, 250);
    asteroid.scale = random(0.09, 0.1);
    asteroid.lifetime = 410;
    asteroidGp.add(asteroid);
  }
}