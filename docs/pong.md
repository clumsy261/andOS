----content:----
<div style="position:relative; display:inline-block;">
  <canvas id="pingpongcanvas" width="400" height="300" style="display:block;"></canvas>
  <div id="pingpong-overlay" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; justify-content:center; align-items:center; background:rgba(0,0,0,0.5); cursor:pointer;">
    <i class="fa-solid fa-play" style="font-size:3rem; color:white;"></i>
  </div>
</div>
<div style="text-align:center;"><strong id="pingpongscore">0 - 0</strong></div>

----

---- code: ----
const canvas = document.getElementById("pingpongcanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("pingpongscore");

// Game state
let p1Y = canvas.height/2 - 25, p2Y = canvas.height/2 - 25;
let ballX = canvas.width/2, ballY = canvas.height/2;
let ballVX = 3, ballVY = 2;
let score1 = 0, score2 = 0;
let keys = {};
const paddleH = 50, paddleW = 10, ballR = 5;
const PADDLE_SPEED = 4;

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function gameLoop() {
    // Update
    if (keys["w"] || keys["W"]) p1Y -= PADDLE_SPEED;
    if (keys["s"] || keys["S"]) p1Y += PADDLE_SPEED;
    if (keys["ArrowUp"]) p2Y -= PADDLE_SPEED;
    if (keys["ArrowDown"]) p2Y += PADDLE_SPEED;
    
    p1Y = Math.max(0, Math.min(canvas.height - paddleH, p1Y));
    p2Y = Math.max(0, Math.min(canvas.height - paddleH, p2Y));
    
    ballX += ballVX;
    ballY += ballVY;
    
    // Bounce off top/bottom
    if (ballY <= ballR || ballY >= canvas.height - ballR) ballVY = -ballVY;
    
    // Paddle collision
    if (ballX - ballR <= paddleW && ballY >= p1Y && ballY <= p1Y + paddleH) ballVX = -ballVX;
    if (ballX + ballR >= canvas.width - paddleW && ballY >= p2Y && ballY <= p2Y + paddleH) ballVX = -ballVX;
    
    // Score
    if (ballX < 0) { score2++; resetBall(); }
    if (ballX > canvas.width) { score1++; resetBall(); }
    
    // Draw
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Net
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Paddles
    ctx.fillStyle = "white";
    ctx.fillRect(0, p1Y, paddleW, paddleH);
    ctx.fillRect(canvas.width - paddleW, p2Y, paddleW, paddleH);
    
    // Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballR, 0, Math.PI * 2);
    ctx.fill();
    
    // Score
    scoreEl.textContent = score1 + " - " + score2;
    if(card.style.display === "flex")
    requestAnimationFrame(gameLoop);
    else
    document.getElementById("pingpong-overlay").style.display = "flex";
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballVX = -ballVX; // reverse direction
}

gameLoop();
card.addEventListener("click", (e) =>{
if(document.getElementById("pingpong-overlay").style.display === "flex")
{
document.getElementById("pingpong-overlay").style.display = "none";
gameLoop();
}
});
----
