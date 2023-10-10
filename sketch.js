//to change the limit to the number of animals on the screen change the num value
let num = 6;
let p = [];
let i = 0;
let animals;
let backgroundColor = '#202A44';

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(backgroundColor);
}
function draw() {
  animals = [new Fish(mouseX, mouseY), new Puffer(mouseX, mouseY), new Seahorse(mouseX, mouseY), new Shark(mouseX, mouseY)];
  
  background(backgroundColor);
  for (let j = constrain(p.length-20, 0, p.length-20); j < p.length; j++){
    p[j].drawAnimal();
    p[j].moveAnimal();
  }
}
class SeaAnimal {
  constructor (x,y) {
    this.x = x;
    this.y = y;
  }
  moveAnimal () {
    if(this.x<width*1.5) {
      this.x++;
      this.y+=random(-1,1);
    }else {
      this.x = width*-1.5
    }
    if((this.y>height*1.5)||(this.y<height*-0.5)){
      this.x = width*-1.5;
      this.y = random(height*0.25,height*0.75)
    }
  }
  drawEye (x, y) {
    noStroke();
    fill(255);
    ellipse(this.x+x, this.y+y, 6.5);
    fill(0);
    ellipse(this.x+x, this.y+y, 5);
  }
}

class Fish      extends SeaAnimal {
  constructor (x,y) {
    super(x,y);
    this.fin = [];
    for(let i = 0; i < 30; i++)
      this.fin[i] = [random(120,175), random(40,87)];
    this.col = random(-1,1);
  }
  drawAnimal () {
    strokeWeight(2);
    noFill();
    for(let i = 0; i < 15; i++){
      if(this.col>0)
        stroke(this.fin[i][0],this.fin[i][1],0);
      else
        stroke(this.fin[i][0],0,this.fin[i][1]);
      bezier(i+this.x-5, this.y-5, i+this.x-20, this.y-5, i+this.x-10, this.y-15, i+this.x-20, this.y-15);
      bezier(i+this.x-5, this.y+5, i+this.x-20, this.y+5, i+this.x-10, this.y+15, i+this.x-20, this.y+15);
      bezier(i*0.5+this.x-15,this.y, i*0.5+this.x-30,this.y, i*0.5+this.x-20, this.y-7.5, i*0.5+this.x-30, this.y-7.5);
      bezier(i*0.5+this.x-15,this.y, i*0.5+this.x-30,this.y, i*0.5+this.x-20, this.y+7.5, i*0.5+this.x-30, this.y+7.5);
    }
    
    noStroke();
    if(this.col>0)
      fill(145,60,0);
    else
      fill(145,0,60);
    ellipse (this.x, this.y, 23, 20);
    triangle(this.x-7.5, this.y-7.5, this.x-7.5, this.y+7.5, this.x-20, this.y);

    this.drawEye(3,-3);
  }
}
class Shark     extends SeaAnimal {
  constructor (x,y) {
    super(x,y);
  }
  drawAnimal () {
    strokeWeight(0.5);
    noStroke();
    fill(210);
    triangle(this.x-112, this.y+23, this.x-135, this.y+5, this.x-113, this.y+5); // back pelvic fin
    fill(80);
    triangle(this.x+25, this.y+47, this.x-100, this.y, this.x+10, this.y); // back pectoral fin
    fill(100);
    triangle(this.x-38, this.y-70, this.x-40, this.y-20, this.x+5, this.y-20); // dorsal fin
    triangle(this.x-70, this.y-22, this.x-70, this.y+22, this.x-165, this.y); // back of body
    triangle(this.x+82, this.y-18, this.x+82, this.y+18, this.x+120, this.y); // front of body
    ellipse(this.x, this.y,200,62); // center of body
    quad(this.x-150, this.y-2, this.x-150,this.y+2, this.x-160, this.y+8.5, this.x-160, this.y-9); // caudal fin connector
    
    noFill();
    stroke(100);
    for(let i = 0; i < 100; i++) // caudal fin
      curve (this.x-190-i*0.5, this.y-400-i*0.5, this.x-200, this.y-72, this.x-190, this.y+28, this.x-700+i*2.7, this.y+200-i*0.5);
    stroke(255);
    for(let i = 0; i < 100; i++){
      curve(this.x-450+i*2.7, this.y-150+i*1.1, this.x-145,this.y+4, this.x+110, this.y+5, this.x-25 +i*5.25, this.y+140-i*4.65);
      curve(this.x-380+i*2, this.y+100-i*1.6, this.x-145,this.y+4, this.x+110, this.y+5, this.x+620-i*1.2, this.y-395+i*0.7); // under belly
    } 
    stroke(backgroundColor);
    for(let i = 0; i < 110; i++){
      curve(this.x-21, this.y+15, this.x+55, this.y+7, this.x+86+i*0.143, this.y+16-i*0.12, this.x-i*1.9, this.y-i*0.1);
      curve(this.x-21, this.y+15, this.x+55, this.y+7, this.x+107, this.y-7, this.x-100-i*1.4, this.y-85-i*0.27); // nose shape
    } 
    
    stroke(255,0,0);
    strokeWeight(2);
    curve(this.x-21, this.y+15, this.x+55, this.y+7, this.x+86, this.y+16, this.x, this.y);
    line(this.x+55, this.y+7, this.x+107, this.y+3); // gums
    
    angleMode(DEGREES);
    stroke(255,0,0);
    strokeWeight(0.5);
    fill(255);
    for(let i = 14; i < 56; i+=7)
      arc(this.x+55+i, this.y+7+3.5-i*0.05, 14+i*0.125, 7+i*0.065, 240, 300, PIE);
    for(let i = 7; i < 25; i+=7)
      arc(this.x+67+i, this.y+0+4+i*0.3, 14+i*0.125, 7+i*0.065, 90, 150, PIE);
    
    noStroke(); 
    fill(100,100,100);
    quad(this.x-45, this.y+45, this.x-30, this.y, this.x+30, this.y-10, this.x+5, this.y+20); // front pectoral fin
    fill(255,255,255);
    triangle(this.x-141, this.y+20, this.x-138, this.y+5, this.x-116, this.y+5); // front pelvic fin
  
    this.drawEye(80,-8);
  }
}
class Puffer    extends SeaAnimal {
  constructor (x,y) {
    super(x,y);
    this.og = x;
  }
  drawAnimal () {
    angleMode(DEGREES);
    strokeWeight(4);
    stroke(240,144,72);
    line(this.x+25,this.y,this.x+28,this.y-3);
    line(this.x+25,this.y,this.x+28,this.y+3);
    strokeWeight(1);
    let temp = constrain(40/(200)*(this.x-this.og), 0, 40);
    stroke(120,72,36);
    fill(120,72,36);
    ellipse(this.x,this.y,50,10+temp);
    stroke(240,144,72);
    for(let i = 0; i <= temp; i++)
      curve(this.x,this.y-40-temp*4+i*2,this.x-25,this.y,this.x+25,this.y,this.x,this.y-40-temp*4+i*2);
    noStroke();
    fill(120,72,36);
    triangle(this.x-10,this.y,this.x-32,this.y+15,this.x-32,this.y-15);
    fill(80,48,24);
    for(let i = 0; i <= 180; i+=5){
      if(i * 3 <= 360)
        arc(this.x-cos(i*3)*50*0.5, this.y-sin(i*3)*(10+temp)*0.5, 10*(temp*0.02), 10*(temp*0.02), (i-1)*3, (i+4)*3);
      if(i * 4 <= 360)
        arc(this.x-cos(i*4)*50*0.4, this.y-sin(i*4)*(10+temp)*0.4, 9*(temp*0.02), 9*(temp*0.02), (i-2)*4, (i+3)*4);
      if(i * 5 <= 360)
        arc(this.x-cos(i*5)*50*0.3, this.y-sin(i*5)*(10+temp)*0.3, 8*(temp*0.02), 8*(temp*0.02), (i-3)*5, (i+2)*5);
      if(i * 6 <= 360)
        arc(this.x-cos(i*6)*50*0.2, this.y-sin(i*6)*(10+temp)*0.2, 7*(temp*0.02), 7*(temp*0.02), (i-4)*6, (i+1)*6);
      if((i * 7 <= 360)&&(i * 7 % 14 == 0))
        arc(this.x-cos(i*7)*50*0.1, this.y-sin(i*7)*(10+temp)*0.1, 6*(temp*0.02), 6*(temp*0.02), (i-5)*7, (i+0)*7);
    }
    this.drawEye(10,-temp*0.2);
  }
}
class Seahorse  extends SeaAnimal {
  constructor (x,y) {
    super(x,y);
  }
  moveAnimal () {
    if(this.x<width*1.5) {
      this.x++;
      this.y = this.y + 0.5*sin(this.x) + random(-1,1);
    }else {
      this.x = width*-1.5
    }
    if((this.y>height*1.5)||(this.y<height*-0.5)){
      this.x = width*-1.5;
      this.y = random(height*0.25,height*0.75)
    }
  }
  drawAnimal () {
    noFill();
    strokeWeight(4.5);
    stroke(135,150,120);
    curve(this.x+110, this.y+25, this.x, this.y-9, this.x-12, this.y+17.5, this.x, this.y);
    curve(this.x-6, this.y+12, this.x-12, this.y+17.5, this.x-4, this.y+30, this.x-6, this.y+12);
    
    noStroke();
    fill(backgroundColor);
    let d = [[3,-9],[-6,-11],[-14,-5],[-16,5],[-15,15],[-12,24],[-7,30],[-4,31]];
    for(let i = 0; i < d.length; i++)
      circle(this.x+d[i][0], this.y+d[i][1],6);
    
    fill(90,100,80);
    ellipse(this.x, this.y,15,15);
    ellipse(this.x-1, this.y+20,16,20);
    quad(this.x, this.y-2, this.x, this.y+2, this.x+12, this.y+2, this.x+12, this.y-2);
    
    noFill();
    strokeWeight(1);
    stroke(90,100,80);
    for(let i = 0; i < 100; i++){
      curve(this.x+90-i*0.9, this.y+20-i*0.2, this.x,this.y-7, this.x-9.5+i*0.1, this.y+17.5, this.x, this.y);
      curve(this.x-46+i*0.5, this.y-73-i*0.2, this.x-4+i*0.08, this.y+30-i*0.07, this.x+15, this.y+30, this.x+4, this.y+7);
    }
    curve(this.x-3, this.y+14, this.x-10, this.y+17, this.x-4, this.y+29, this.x-3, this.y+14);
    strokeWeight(2);
    curve(this.x+44, this.y+67, this.x+9, this.y+29, this.x+15, this.y+30, this.x+4, this.y+107);
    
    fill(63,70,56);
    ellipse(this.x+12, this.y,5,5);
    arc(this.x, this.y+16,15,15,110,190);
    this.drawEye(2,0);
  }
}

function mousePressed() {
  p[i++%num] = animals[floor(random(0, animals.length))];
}
