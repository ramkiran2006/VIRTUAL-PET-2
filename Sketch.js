var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg;
var canvas;
var database;

function preload()
{
  dogImg = loadImage("images/DOG1.png");
  happyDogImg = loadImage("images/DOG2.png");
}

function setup() {
  canvas = createCanvas(500,500);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePrerssed(addFoods);
  
}


function draw() {  

  background("white");

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Fees : "+ lastFed + "AM",350,30);
  }
  
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
