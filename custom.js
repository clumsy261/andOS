import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"
import { resizeElement } from "./coretools.js";
import { writetoapp } from "./coretools.js";


export default function INIT(top,left,details) //this function starts the app- change it's name to INIT_yourapp
{ 
    let handle, content,emoji;
    if (details.handle === undefined || details.handle === "")
        handle = "app"+Date.now();
    else
    handle = details.handle;
    if (details.content === undefined)
        content = "";
    else
    content= details.content;
    if(details.emoji === undefined || details.emoji === "")
        emoji = "gears";
    else
        emoji=details.emoji;

    ///add html items - navbar icon + window div inside body + window content
    var navIcon = document.createElement("div");
    navIcon.id = handle + "open";
    navIcon.innerHTML = `<i class="fa-solid fa-${emoji}"></i>`;
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
    eval(details.code);
}
