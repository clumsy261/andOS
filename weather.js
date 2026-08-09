
let content ="<p>nutting</p>";
fetch("https://ipwho.is/")
  .then(r => r.json())
  .then(ip => {
    content = `
<p>lat:${ip.latitude}</p>
<p>long:${ip.longitude}</p>
<p>city:${ip.city}</p>
<p>country_code:${ip.country_code}</p>`;
writetoapp(content,handle);
}).catch(err => {
    content=`<p>Sorry, we couldn't find your location</p><p>${err.message}</p>`;
    writetoapp(content,handle);
})

//fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m`)
//  .then(r => r.json())
//  .then(d => {
//    const c = d.current;   // c.temperature_2m, c.weather_code, c.wind_speed_10m
//  })

import {dragElement} from "./coretools.js" //dragging
import {openWindow} from "./coretools.js" //opening
import { closeWindow } from "./coretools.js" //closing
import { writetoapp } from "./coretools.js"; //updating app content
//for a custom template:
//change the handle const, the default function name (INIT_HOME), and put the code inside the content variable
//app title - title
const handle = "weather";
//this function starts the app- change it's name to INIT_yourapp
export default function INIT_WEATHER(top,left){
    ///add html items - navbar icon + window div inside body + window content
    var navIcon = document.createElement("div");
navIcon.id = handle + "open";
navIcon.innerHTML = '<i class="fa-solid fa-house"></i>';
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
}
