//FOR LOADING EXTERNAL FILES (EG.JPGs), YOU WILL NEED TO RUN A SERVER.
//VISIT https://github.com/processing/p5.js/wiki/Local-server
//FOR INSTRUCTIONS ON HOW TO RUN A SERVER ON MAC/WINDOWS/LINUX
//SYSTEMS. ONCE YOU HAVE THAT SET UP, YOU ARE READY TO LOAD MEDIA!

var platform;
var savedTime;
var passedTime;
var angleSec=0;
var Sec;
var angleMin=0;
var Min;
var angleHour=0;
var Hour;
var d=280;
//"d" IS THE DIAMETER OF MINUTES ARC (BLUE ONE), ALL OTHER
//HANDS(HEIGHTS AND WIDTHS), THEIR ARCS AND THE CLOCK FACE
//ARE DERIVED FROM IT. CHANGE IT TO PROPORTIONATELY CHANGE
//THE SIZE OF THE WHOLE DEVICE.
var font;

function preload() {
  platform=loadImage("walnut.jpg");
  font=loadFont("Institut.otf");
  //WE ARE USING "INSTITUT" FONT FROM THE AWESOME
  //SLAVA KIRILENKO @ ASTRONAUTDESIGN.COM
}

function setup() {
  createCanvas(1450,680);
  savedTime=millis(); //SET THE TIMER!
  textFont(font);
  Sec=0;
  Min=0;
  Hour=0;
}

function draw() {
  background(255);

  //PLATFORM
  //platform is nothing other than a rectangle, the top part of which
  //is hidden behind the clock face.
  //The original "walnut.jpg" image size is 500*245.
  //Change its size and y-position to suit your clock face and screen sizes.
  // *Also, if you know how to make the corners of that image rectangle
  //slightly rounded, please make and share the edit! Thanks!*
  var imageWidth=(2/3)*500;
  var imageHeight=(2/3)*245;
  image(platform,width/2-imageWidth/2,height-140,imageWidth,imageHeight);

  //CLOCK FACE+RIM
  stroke(200);
  strokeWeight(5);
  fill(255,255,220);
  ellipse(width/2,height/2,2*d,2*d);

  //TEST TO FIND OUT IF ONE SECOND HAS ELAPSED,
  //AND IF IT DID, MOVE THE SECONDS HAND
  passedTime=millis()-savedTime;
  if(passedTime>1000) {
  Sec=Sec+1;
  angleSec=angleSec+radians(6);
  savedTime=millis(); //AND RESET THE TIMER!
}

//TEST TO CHECK IF 60 SECONDS HAVE PASSED,
//AND IF THEY DID, MOVE THE MINUTES HAND
if(Sec>59){
  Sec=0;
  angleMin=angleMin+radians(6);
  Min=Min+1;
}

//FINALLY, TEST IF 60 MINUTES HAVE PASSED,
//AND IF THE ANSWER IS "YES", MOVE THE HOURS HAND
if(Min>59){
  Min=0;
  angleHour=angleHour+radians(30);
  Hour=Hour+1;
}

//WAIT, BUT IF THE DAY HAS PASSED,
//START A NEW DAY!
if(Hour>23){
  Hour=0;
}

//SECONDS HAND
push();
translate(width/2,height/2);
  rotate(angleSec);
  noStroke();
  fill(255,0,0);
  arc(0,0,d/2,d/2,HALF_PI,PI+HALF_PI);
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(0,0,d/14,d/2);
  pop();

  //HOURS HAND
    push();
    translate(width/2,height/2);
      rotate(angleHour);
      noStroke();
      fill(255,180,0,200);
      arc(0,0,3*d/4,3*d/4,HALF_PI,PI+HALF_PI);
      noStroke();
      fill(0);
      rectMode(CENTER);
      rect(0,0,d/14,3*d/4);
      pop();

//MINUTES HAND
  push();
  translate(width/2,height/2);
    rotate(angleMin);
    noStroke();
    fill(0,50,200,150);
    arc(0,0,d,d,HALF_PI,PI+HALF_PI);
    noStroke();
    fill(0);
    rectMode(CENTER);
    rect(0,0,d/14,d);
    pop();

//TEXT
  fill(0);
  noStroke();
  textSize(50);
  textAlign(RIGHT,BOTTOM);
  text(Hour+":"+Min+":"+Sec,width-100,height-75);
}
