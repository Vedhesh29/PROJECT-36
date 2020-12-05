var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed = Feedtime;

//Create variables here

function preload()

{
  
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
  
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Milk();
  dog = createSprite(550,365,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition);
  feed = createButton("FEED THE DOG MILK")
  feed.position(1100,500)
  feed.mousePressed(FeedDog)
  add = createButton("ADD MORE MILK")
  add.position(1100,455)
  add.mousePressed(AddFood)

} 

function draw(){
 background(255);

 foodobject.display();

 Feedtime = database.ref('FeedTime');
 Feedtime.on("value",function(data){
   Lastfeed = data.val();
 })
 
 textSize(20);
 textFont("Aharoni");
 fill("black");
 text("See! The Dog Is Hungry....",10,20);
 text("Press On 'ADD FOOD' Button To Add Food,",10,50);
 text("Then Press On 'FEED DOG' Button To Feed The Dog",10,80);

 drawSprites();
  
 textSize(20);
 textFont("Aharoni");
 fill("black");
 if(Lastfeed >= 12){
   text("Last Feed : " + Lastfeed%12 + " PM",750,25);
 }else if(Lastfeed === 0){
   text("Last Feed : 12 AM",750,25);
 }else{
   text("Last Feed : " + Lastfeed + " AM",750,25);
 }

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){
dog.y = 380
dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}