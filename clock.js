import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import {closeWindow} from "./coretools.js"
import { writetoapp } from "./coretools.js";


let content = `<div style="display:flex;"><div id="timetext"><p>Time is $</p></div><canvas id="clockface" width="150" height="150"></canvas></div>`;


//app title - title
const handle = "clock";
//this function starts the app- change it's name to INIT_yourapp
export default function INIT_CLOCK(top,left){
    ///add html items - navbar icon + window div inside body + window content
    var navIcon = document.createElement("div");
    navIcon.id = handle + "open";
    navIcon.innerHTML = '<i class="fa-solid fa-clock"></i>';
    document.querySelector(".navbar").appendChild(navIcon);    
    var card = document.createElement("div");
    card.id = handle;
    card.className = "card";
    card.style.top = top + "px";
    card.style.left = left + "px";
    document.body.appendChild(card);
    document.querySelector(`#${handle}`).innerHTML=`
    <div class="appbar header" id="${handle}header">
            <div id="${handle}close" class="closebutton"><i class="fa-solid fa-circle" style="color: rgb(255, 0, 0);"></i></div>
    </div>
    <div class="appcontent">
        ${content}
    </div>`;

    //add event listeners for window
    var element = document.getElementById(handle);
    dragElement(document.getElementById(handle));
    var ScreenOpen = document.querySelector(`#${handle}open`)
    var ScreenClose = document.querySelector(`#${handle}close`)
    ScreenClose.addEventListener("mousedown", function(e) {
    closeWindow(element);
    });
    ScreenOpen.addEventListener("click", function(){
    if(element.style.display==="none")
    openWindow(element);
    else
    closeWindow(element);
    });
    card.style.display = "none";
    begin_time();
    begin_clock();
}
function begin_clock()
{
const canvas = document.getElementById("clockface");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}
function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}
function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.07);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.75, radius*0.07);
  // second
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}
function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}
setInterval(drawClock,1000);
}

function begin_time()
{
    let days=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
    function update_time(){
        const text=document.getElementById("timetext");
        const now=new Date();
        text.innerHTML=`<strong>Current time is:</strong>
        <p>${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</p>
        <strong>Current date is:</strong>
        <p>${now.getDate()}.${now.getMonth()}.${now.getFullYear()} </p>
        <p>(${days[now.getDay()]})</p>`;
        const canvas = document.getElementById("clockface");
        const size = text.offsetHeight;
        canvas.style.width = size + "px";
        canvas.style.height = size + "px";
    }
    setInterval(update_time,1000);
}


