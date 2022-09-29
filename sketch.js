var aw, awImg, awImg2, zumbi;
var edges;
var tiro, tiroImg;
var zumbiGroup, zumbiImg;
var tiroGroup;
var score = 0;
var vida = 3;

function preload(){
  zumbiImg = loadImage("zumbi2.jpg");
  awImg = loadImage("atirador.jpg");
  awImg2 = loadImage("atirador2.png");
  tiroImg = loadImage("bala.png");
}

function setup() {
  createCanvas(1000,400);
  
  edges = createEdgeSprites();

  aw = createSprite(30,350,20,20);
  aw.addImage("atirador", awImg);
  aw.scale = 0.1;
  
  zumbiGroup = new Group();
  tiroGroup = new Group();
}

function draw() {
  background("black");
  
  text("PONTUAÇÃO: "+ score, 800, 100);
  text("VIDA: "+ vida, 800, 50);


  aw.bounceOff(edges);
  awMove();
  shoot();
  geraZumbi();
  removeZumbi();

  if(zumbiGroup.isTouching(aw)){
    aw.x = 30;
    aw.y = 350;
    vida += -1;
  }

  if(vida === 0){
    aw.x = 1500;
    aw.y = 1000;
    text("FIM DE JOGO", 500,200);
    zumbiGroup.destroyEach();
  }

  drawSprites();
}

function awMove(){
  if(keyDown(UP_ARROW)){
    aw.y -= 5;
  }

  if(keyDown(DOWN_ARROW)){
    aw.y += 5;
  }
  if(keyDown(RIGHT_ARROW)){
    aw.x += 5;
  }

  if(keyDown(LEFT_ARROW)){
    aw.x -= 5;
  }
}

function shoot(){
  if(keyWentDown("space")){
    var tiro = createSprite(aw.x,aw.y,5,5);
    tiro.velocityX = 10;
    tiro.addImage("tiro", tiroImg);
    tiro.scale = 0.05;
    tiroGroup.add(tiro);
  }
}

function geraZumbi(){
  if(frameCount % 100 == 0){
    zumbi = createSprite(990, random(20,380),10,10);
    zumbi.addImage(zumbiImg);
    zumbi.scale = 0.1;
    zumbi.velocityX = -2;
    zumbiGroup.add(zumbi);
  }
}

function removeZumbi() {
  tiroGroup.overlap(zumbiGroup, function(collector, collected){
    collected.remove();
    tiroGroup.destroyEach();
    score += 1;
  })
}