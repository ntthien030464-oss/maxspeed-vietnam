const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// resize canvas full màn hình ngang
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let speed = 0;
let money = 0;
let y = canvas.height - 120;

// Xe và người (dáng cao)
const cars = [
  {name:"Xe điện", color:"#0ff", speedMax:299, width:40, height:80},
  {name:"Xe máy độ", color:"#f00", speedMax:220, width:35, height:70}
];
let carIndex = 0;

const btn = document.getElementById("btn");
const moneyEl = document.getElementById("money");
const speedEl = document.getElementById("speed");

// Chọn xe (nhấn button giữ là tăng tốc)
btn.onclick = () => {
  speed += 10;
  if(speed > cars[carIndex].speedMax) speed = cars[carIndex].speedMax;
};

function loop(){
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Đường ngang
  ctx.fillStyle = "#333";
  ctx.fillRect(0, y+40, canvas.width, 5);

  // Xe + người
  const car = cars[carIndex];
  ctx.fillStyle = car.color;
  ctx.fillRect(canvas.width/2 - car.width/2, y - car.height/2, car.width, car.height);

  // Khói
  if(speed > 100){
    ctx.fillStyle = "rgba(200,200,200,0.5)";
    ctx.beginPath();
    ctx.arc(canvas.width/2 - car.width/2 - 10, y + 30, speed/20, 0, Math.PI*2);
    ctx.fill();
  }

  // Bốc đầu đơn giản
  if(speed > car.speedMax * 0.8){
    ctx.fillStyle = "rgba(255,255,0,0.3)";
    ctx.fillRect(canvas.width/2 - car.width/2, y - car.height/2 - 20, car.width, 10);
  }

  // Té xe đơn giản
  if(speed > car.speedMax && Math.random() < 0.01){
    speed = 0;
    money = Math.max(0, money - 50);
    alert("Té xe! Mất 50 tiền!");
  }

  // Tốc độ + tiền
  speed *= 0.98;
  money += Math.floor(speed/20);

  moneyEl.textContent = money;
  speedEl.textContent = Math.floor(speed);

  requestAnimationFrame(loop);
}
loop();
