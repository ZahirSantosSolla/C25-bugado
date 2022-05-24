const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
  
  showBoats();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }

  cannon.display();
}

function collisionWithBoat(index){
  for (var i = 0; i < boats.length; i++) {
    if(boats[i] !== undefined && balls[index] !== undefined){
      var collision = Matter.SAT.collides(boats[i].body, balls[index].body);
    
      if(collision.collided){
        boats[i].remove(i);
        balls[index].remove(index);
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function showBoats(){
  //matrix.length -> comprimento na matrix, número de elementos que ela contém.
  //testa se a matrix possui algum barco dentro dela.
  if (boats.length > 0) {
    if (boats[boats.length -1].body.position.x < width -300 || 
        boats[boats.length -1] == undefined) {

      var positions = [-40, -70, -60, -20]
      var position = random(positions)
      var boat;
      boat = new Boat(width, height - 60, 170, 170,position);
      boats.push(boat);

    }
    //percorrer todos os barcos que estão dentro da matrix e mostrá-los 1 por 1.
    //index ou i = contador do for.
    for (var index = 0; index < boats.length; index++) {
      //testar se existe o elemento; undefinied = falso para o if; 
      if(boats[index]){
        Matter.Body.setVelocity(boats[index].body,{x:-0.9, y:0});
        boats[index].display();
      }
    }
  }

  else {
    
    var boat;
    boat = new Boat(width, height - 60, 170, 170,-80);
    boats.push(boat); //adiciona um elemento no final da matrix.
   
  }
}