var ball, database;
var position;
var data = 0;
var x ;
var y;

function setup(){
  // connecting database 
  database = firebase.database();
  console.log(database);
  // creating canvas
  createCanvas(500,500);
  // creating ball and colour
  ball = createSprite(250,250,10,10);
  ball.shapeColor = "red";

  // updating ball position 
  var ballPosition = database.ref('ball/position');
  ballPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  // giving movements to ball 
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
      data = {
        x:-1,
        y:+0
      }
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
      data = {
        x:+1,
        y:+0
      }
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
      data = {
        x:+0,
        y:-1
      }
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
      data = {
        x:+0,
        y:+1
      }
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref("ball/position").set({
    'x':position.x+x,
    'y':position.y+y,
    data:position.data+data
  })
  
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  console.log(position.data);
  ball.x = position.x;
  ball.y = position.y;
  data = position.data;
}

function showError(){
  console.log("Error in writing to the database");
}
