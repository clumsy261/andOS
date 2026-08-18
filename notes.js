import {dragElement, writetoapp} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"
import { resizeElement } from "./coretools.js";
//have the app be hidden by default or not
let hidden=1;
//actual content you set in html
let content = `<textarea id="notesdata" style="width:200px; height:150px; resize:none;"></textarea>`;
function render(w,h)
{
    const data=document.getElementById("notesdata");
    data.style.width  = w-10 + "px";
    data.style.height = h-36 +"px";
}

const handle = "notes"; ///handle of the app

export default function INIT_NOTES(top,left) //this function starts the app- change it's name to INIT_yourapp
{
    ///add html items - navbar icon
    var navIcon = document.createElement("div");
    navIcon.id = handle + "open";
    navIcon.innerHTML = '<i class="fa-solid fa-note-sticky"></i>';
    document.querySelector(".navbar").appendChild(navIcon); 
    //window div inside body   
    var card = document.createElement("div");
    card.id = handle;
    card.className = "card";
    card.style.top = top + "px";
    card.style.left = left + "px";
    document.body.appendChild(card);
    //window content (handle + actual user content)
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
    const events=resizeElement(card);
    events.addEventListener("resize",(e) =>{
        render(e.detail.w,e.detail.h);
    });
    if(hidden)
        card.style.display="none";
}
