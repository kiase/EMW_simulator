let xSpacing = 1; 
let w; 
let amplitude = 75; 
let wavelength = 300; 
let wavelengthc = 1; 
let frequency = 5;
let capa_revarse = 0;
let period = 1/frequency;
let P_amplitude;
let P_gukpanleng;
let frequencyc = 1;
let P_gukpangap;
let mode_choice;
let coil_onoff;
let leng = 50;
let tum = 80;
let time = 0; 
let mode = true;

let capacitorX = -400; // 축전기의 시작 x 위치
let capacitorY = -50; // 축전기의 시작 y 위치

function preload() {
  myFont = loadFont('assets/inconsolata.otf');
  kfont = loadFont('assets/NanumSquareB.otf');
}

function setup() {
  createCanvas(900, 400, WEBGL);
  w = width + 16;

  mode_choice = createSelect().position(570, height + 10).size(100, 20);
  mode_choice.option('송신/발생');
  mode_choice.option('수신 (미완성)');
  mode_choice.selected('송신').changed(updateMode);
  
  createSlider(1, 60, wavelengthc, 1).position(10, height + 70).input(updateHz);
  P_hz = createP(`전류 주파수 : ${wavelengthc}Hz`).position(10, height + 80).style('color','#FFFFFF');

  createSlider(0, 100, amplitude).position(10, height + 10).input(updateAmplitude);
  P_amplitude = createP(`전류 크기 : ${amplitude/20}A`).position(10, height + 20).style('color','#FFFFFF');
  
  capa_onoff = createCheckbox('축전기 활성화', false).position(210, height + 70).style('color','#FFFFFF');
  capa_onoff.changed(capa_trigger);

  createSlider(20, 100, leng, 5).position(210, height + 10).input(updateGukpanleng);
  P_gukpanleng = createP(`극판 면적(미적용) : ${leng}`).position(210, height + 20).style('color','#999999');

  createSlider(10, 100, tum).position(410, height + 10).input(updateGgukpangap);
  P_gukpangap = createP(`극판 사이 간격(미적용) : ${110-tum}`).position(410, height + 20).style('color','#999999');

  createSlider(0.0, 10, frequency, 2.5).position(700, height + 10).input(updateFrequency).attribute('di1sabled', 'true');
  P_speed = createP(`속도 배수 : ${frequencyc}배`).position(700, height + 20).style('color','#FFFFFF');
}

function draw() {
  background(90);
  textFont(kfont);
  textSize(15);
  fill('orange');
  text('● : 전류 방향', -440, -180);
  fill('blue');
  text('● : 자기장', -440, -160);
  fill('red');
  text('● : 전기장', -440, -140);
  // 축전기 그리기
  if((time+40)*2-(wavelength*capa_revarse*2) < -wavelength) {
    capa_revarse -= 1;
  }
  if((time+40)*2-(wavelength*capa_revarse*2) <= wavelength) {
        drawCapacitor(leng, tum, true);
      } else {
        drawCapacitor(leng, tum, false);
      }
  if((time+40)*2-(wavelength*capa_revarse*2) >= wavelength*2) {
    capa_revarse += 1;
  }
  let x = -time;
  let y = 0; 
  let z = 0; 
  let startX = w+100; 
  let startY = 50; 
  let startZ = 0; 
  rotateY(radians(-20)); 
  let ypos = 0;
  stroke(255, 0, 0); 
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(startX, startY, startZ);

  for (let i = 0; i < w / xSpacing; i++) {
    x -= xSpacing;
    let posX = startX - i * xSpacing;
    y = amplitude * sin((x / wavelength) * TWO_PI - HALF_PI);
    let posY = y;
    if(i==0){
      ypos = y;
    }
    
    vertex(posX-200, posY+50, z);
  }
  endShape();
  x = -time;
  y = 0;
  stroke(0, 0, 255); 
  strokeWeight(2);
  beginShape();
  vertex(startX, startY, startZ);
  for (let i = 0; i < w / xSpacing; i++) {
    x -= xSpacing;
    let posX = startX - i * xSpacing;
    z = amplitude * sin((x / wavelength) * TWO_PI - HALF_PI);
    let posZ = z*-1;
    vertex(posX-200, y+50, posZ);
  }
  endShape();
  
  time += frequency;
  
}

function updateMode() {
  
}

function coil_trigger() {
  
}

function capa_trigger() {
  
}

function updateAmplitude() {
  amplitude = this.value();
  P_amplitude.html(`전류 크기 : ${amplitude/10}A`);
  
}

function updateHz() {
  wavelength = 71*5-this.value()*5;
  wavelengthc = this.value();
  P_hz.html(`전류 주파수 : ${wavelengthc}Hz`);
}

function updateGukpanleng() {
  leng = this.value();
  P_gukpanleng.html(`극판 면적(미적용) : ${leng}`);
}

function updateGgukpangap() {
  tum = this.value();
  P_gukpangap.html(`극판 사이 간격(미적용) : ${110-tum}`);
}

function updateFrequency() {
  frequency = this.value();
  frequencyc = this.value()/5;
  P_speed.html(`속도 배수 : ${frequencyc}배`);
}

// 축전기 그리기
function drawCapacitor(size, tum, revarse) {
  noStroke();
  fill(255);
  rect(capacitorX+160-size, capacitorY+tum/2, size*2+5, 20);
  rect(capacitorX+160-size, capacitorY+150-tum/2, size*2+5, 20);
  rect(capacitorX+160, capacitorY+tum/2, 5, -30-tum/2);
  rect(capacitorX+160, capacitorY+170-tum/2, 5, 30+tum/2);
  rect(capacitorX+165, capacitorY-30, -150, -5);
  rect(capacitorX+165, capacitorY+200, -150, 5);
  rect(capacitorX+15, capacitorY-30, 5, 40);
  rect(capacitorX+15, capacitorY+200, 5, -95);
  rect(capacitorX+15, capacitorY+65, 5, -100);
  noFill();
  stroke(255);
  strokeWeight(4);
  circle(capacitorX+18, capacitorY+85, 40);
  textFont(myFont);
  textSize(60);
  fill('#FFFFFF');
  text("~", capacitorX+2, capacitorY+109);
  noFill();
  if(revarse){
    noStroke();
    textSize(60);
    fill('orange');
    text("--->", capacitorX+25, capacitorY-13.5);
    text("<---", capacitorX+25, capacitorY+221.5);
    fill('blue');
    textSize(30);
    textAlign(CENTER, CENTER);
    text("+ ".repeat(size/13), capacitorX+170, capacitorY+7+tum/2);
    fill('red');
    text("- ".repeat(size/13), capacitorX+170, capacitorY+47+tum/2+(110-tum));
    textAlign(LEFT, BASELINE);
  } else {
    textSize(60);
    fill('orange');
    text("<---", capacitorX+25, capacitorY-13.5);
    text("--->", capacitorX+25, capacitorY+221.5);
    fill('red');
    textSize(30);
    textAlign(CENTER, CENTER);
    text("- ".repeat(size/13), capacitorX+170, capacitorY+7+tum/2);
    fill('blue');
    text("+ ".repeat(size/13), capacitorX+170, capacitorY+47+tum/2+(110-tum));
    textAlign(LEFT, BASELINE);
  }
}
