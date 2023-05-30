let xSpacing = 1; 
let w;
let el_size = 7.5;
let wavelengthc = 30;
let wavelength = 71*5-wavelengthc*5; 
let frequency = 5;
let capa_revarse = 0;
let period = 1/frequency;
let P_amplitude;
let P_gukpanleng;
let frequencyc = 1;
let P_gukpangap;
let mode_choice;
let coil_onoff;
let rotated = 0;
let leng = 50;
let tum = 60;
let time = 0; 
let amplitude = ((leng*tum)*(el_size/5))/100; 
let mode = true;
let fccc;
let reset_but, reset_but2;
let see_opt = [true, true];

let capacitorX = -400; // 축전기의 시작 x 위치
let capacitorY = -50; // 축전기의 시작 y 위치

function preload() {
  myFont = loadFont('assets/inconsolata.otf');
  kfont = loadFont('assets/NanumSquareB.otf');
}

function mapRange(value, min1, max1, min2, max2) {
  return ((value - min1) / (max1 - min1)) * (max2 - min2) + min2;
}

function setup() {
  createCanvas(900, 400, WEBGL);
  w = width + 16;

  mode_choice = createSelect().position(570, height + 10).size(100, 20);
  mode_choice.option('송신/발생');
  mode_choice.option('수신 (미완성)');
  mode_choice.selected('송신').changed(updateMode);
  
  reset_but = createButton('초기화').position(410, height + 70).size(100, 40);
  reset_but.mousePressed(re_f);
  
  createSlider(1, 60, wavelengthc, 1).position(10, height + 70).input(updateHz);
  P_hz = createP(`교류 진동수 : ${wavelengthc}Hz`).position(10, height + 80).style('color','#FFFFFF');

  createSlider(0, 10, el_size, 0.5).position(10, height + 10).input(updateAmplitude);
  P_amplitude = createP(`전류 크기 : ${el_size}A`).position(10, height + 20).style('color','#FFFFFF');
  
  capa_onoff = createCheckbox('축전기 보이기', true).position(210, height + 70).style('color','#FFFFFF');
  capa_onoff.changed(capa_trigger);
  
  wave_onoff = createCheckbox('전자기파 보이기', true).position(210, height + 100).style('color','#FFFFFF');
  wave_onoff.changed(wave_trigger);

  createSlider(20, 100, leng, 5).position(210, height + 10).input(updateGukpanleng);
  P_gukpanleng = createP(`극판 면적 : ${leng}cm`).position(210, height + 20).style('color','#FFFFFF');

  createSlider(10, 90, tum, 5).position(410, height + 10).input(updateGgukpangap);
  P_gukpangap = createP(`극판 사이 간격 : ${110-tum}cm`).position(410, height + 20).style('color','#FFFFFF');

  createSlider(0.0, 20, frequency, 2.5).position(700, height + 10).input(updateFrequency).attribute('dlisabled', 'true');
  P_speed = createP(`속도 배수 : ${frequencyc}배`).position(700, height + 20).style('color','#FFFFFF');
  
  fccc = createSlider(-100, 80, rotated, 5).position(700, height + 70).input(updateRotate);
  P_rotate = createP(`그래프 회전(X축) : ${rotated+10}도 (기본)`).position(700, height + 80).style('color','#FFFFFF');
  reset_but2 = createButton('초기화').position(840, height + 70).size(60, 20);
  reset_but2.mousePressed(re_fic);
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
  fill('gray');
  text('값이 임의로 조정되어 있습니다. (단위가 정확하지 않습니다)', 0, -180);
  // 축전기 그리기
  if(see_opt[0]) {
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
  }
  let x = -time;
  let y = 0; 
  let z = 0; 
  let startX = w+100; 
  let startY = 50; 
  let startZ = 0; 
  rotateY(radians(-20));
  rotateX(radians(-rotated));
  let ypos = 0;
  if(see_opt[1]) {
    strokeWeight(2);
    noFill();
    beginShape();
    stroke(0, 255, 0, 255);
    vertex(-100, startY, 0);
    vertex(-100+w, startY, 0);
    vertex(-100, startY, 0);
    stroke(255, 0, 0, 255);
    vertex(-100, startY+amplitude+10, 0);
    vertex(-100, startY-amplitude-10, 0);
    vertex(-100, startY, 0);
    stroke(0, 0, 255, 255);
    vertex(-100, startY, -amplitude-10);
    vertex(-100, startY, amplitude+10);
    vertex(-100, startY, 0);
    endShape();
    stroke(255, 0, 0);
    beginShape();
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

  }
  time += frequency;
  
}

function updateMode() {
  
}

function wave_trigger() {
  if (this.checked()) {
    see_opt[1] = true;
  } else {
    see_opt[1] = false;
  }
  
}

function capa_trigger() {
  if (this.checked()) {
    see_opt[0] = true;
  } else {
    see_opt[0] = false;
  }
}

function updateAmplitude() {
  el_size = this.value();
  amplitude = ((leng*tum)*(el_size/5))/100;
  P_amplitude.html(`전류 크기 : ${el_size}A`);
}

function updateHz() {
  wavelength = 71*5-this.value()*5;
  wavelengthc = this.value();
  P_hz.html(`교류 진동수 : ${wavelengthc}Hz`);
}

function updateGukpanleng() {
  leng = this.value();
  amplitude = ((leng*tum)*(el_size/5))/100;
  P_gukpanleng.html(`극판 면적 : ${leng}cm`);
}

function updateGgukpangap() {
  tum = this.value();
  amplitude = ((leng*tum)*(el_size/5))/100;
  P_gukpangap.html(`극판 사이 간격 : ${110-tum}cm`);
}

function updateRotate() {
  rotated = this.value();
  if(this.value() == 0){
    P_rotate.html(`그래프 회전(X축) : ${rotated+10}도 (기본)`);
  } else {
    P_rotate.html(`그래프 회전(X축) : ${rotated+10}도`);
  }
}

function updateFrequency() {
  frequency = this.value();
  frequencyc = this.value()/5;
  P_speed.html(`속도 배수 : ${frequencyc}배`);
}
  
function re_f(){
    window.location.reload();
} 
  
function re_fic(){
  rotated = 0;
  P_rotate.html(`그래프 회전(X축) : ${rotated+10}도 (기본)`);
  fccc.remove();
  fccc = createSlider(-100, 80, rotated, 5).position(700, height + 70).input(updateRotate);
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
    for(let i =0;i<size/11;i++){
      rect(capacitorX+170-size+i*20, capacitorY+25+tum/2, 5, (110-tum));
      triangle(capacitorX+165-size+i*20, capacitorY+22+tum/2+(110-tum), capacitorX+180-size+i*20, capacitorY+22+tum/2+(110-tum), capacitorX+173-size+i*20, capacitorY+35+tum/2+(110-tum));
    }
    fill('blue');
    textSize(30);
    text('<', capacitorX+163, capacitorY+87);
    text('<', capacitorX+163-size/2, capacitorY+87);
    text('<', capacitorX+163+size/2, capacitorY+87);
    stroke('blue');
    noFill();
    arc(capacitorX+163, capacitorY+78, size*2+20, 25, 0, PI);
    noStroke();
  } else {
    noStroke();
    textSize(60);
    fill('orange');
    text("<---", capacitorX+25, capacitorY-13.5);
    text("--->", capacitorX+25, capacitorY+221.5);
    fill('red');
    textSize(30);
    textAlign(CENTER, CENTER);
    text("- ".repeat(size/13), capacitorX+170, capacitorY+7+tum/2);
    for(let i =0;i<size/11;i++){
      rect(capacitorX+170-size+i*20, capacitorY+33+tum/2, 5, (110-tum));
      triangle(capacitorX+165-size+i*20, capacitorY+38+tum/2, capacitorX+180-size+i*20, capacitorY+38+tum/2, capacitorX+173-size+i*20, capacitorY+25+tum/2);
    }
    fill('blue');
    text("+ ".repeat(size/13), capacitorX+170, capacitorY+47+tum/2+(110-tum));
    textSize(30);
    text('>', capacitorX+163, capacitorY+87);
    text('>', capacitorX+163-size/2, capacitorY+87);
    text('>', capacitorX+163+size/2, capacitorY+87);
    stroke('blue');
    noFill();
    arc(capacitorX+163, capacitorY+78, size*2+20, 25, 0, PI);
    
  }
  textAlign(LEFT, BASELINE);
}
