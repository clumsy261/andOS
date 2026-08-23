import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"
import INIT from "./custom.js";
import { resizeElement, writetoapp } from "./coretools.js";

let content = `<div style="display:flex; justify-content:center;">
<div>Title:<textarea id="titledetail" style="height:1.3rem; resize:none;"></textarea></div>
<div>Emoji:<textarea id="emojidetail" style="height:1.3rem; resize:none;"></textarea></div>
<button id="submitnewapp">Submit</button>
<button id="submitshop">Publish</button></div>
<div style="display:flex;">
Content:<textarea style="height:1.3rem; resize:none;" id="contentdetail"></textarea>
Code:<textarea style="height:1.3rem; resize:none;" id="codedetail"></textarea></div>`;

const handle = "bscode"; ///handle of the app

export default function INIT_BSCODE(top,left) //this function starts the app- change it's name to INIT_yourapp
{
    ///add html items - navbar icon + window div inside body + window content
    var navIcon = document.createElement("div");
    navIcon.id = handle + "open";
    navIcon.innerHTML = '<i class="fa-solid fa-hammer"></i>';
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
    //code
    {
        const events = resizeElement(card);
        function render(w,h)
        {
        document.getElementById("contentdetail").style.width=w/2 +"px";
        document.getElementById("contentdetail").style.height=h-60+"px";
        document.getElementById("codedetail").style.width=w/2+"px";
        document.getElementById("codedetail").style.height=h-60 +"px";
        }
        events.addEventListener("resize", (e)=>{
            render(e.detail.w,e.detail.h);
        })
        const submitnewapp = document.getElementById("submitnewapp");
        submitnewapp.addEventListener("click", (e)=>{
            var details = {
                handle:"",
                content:"",
                emoji:"",
                code:"",
            };
            details.handle = document.getElementById("titledetail").value;
            details.content = document.getElementById("contentdetail").value;            details.content = document.getElementById("contentdetail").value;
            details.emoji = document.getElementById("emojidetail").value;
            details.code = document.getElementById("codedetail").value;
            INIT(top,left,details);
        })
    }
    card.style.display="none";
}

