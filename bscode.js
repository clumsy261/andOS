import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"
import INIT from "./custom.js";
import { resizeElement, writetoapp } from "./coretools.js";

const URL="https://eomzkoohlqupoenlufwl.supabase.co";
const KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbXprb29obHF1cG9lbmx1ZndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0OTk0NzAsImV4cCI6MjEwMzA3NTQ3MH0.EZz3Sbb7QqS68FlrKboxVZlH3-sLwqOddlR_c99EsZI";

let content = `<div style="display:flex; justify-content:center;">
<div>Title:<textarea placeholder="app title(unique)" id="titledetail" style="height:1.3rem; resize:none;"></textarea></div>
<div>Author:<textarea placeholder="your cool username" id="authordetail" style="height:1.3rem; resize:none;"></textarea></div>
<div>Emoji:<textarea placeholder="font-awesome icon" id="emojidetail" style="height:1.3rem; resize:none;"></textarea></div>
<button id="submitnewapp">Submit</button>
<button id="submitshop">Publish</button></div>
<div style="display:flex;">
Content:<textarea style="height:1.3rem; width:300px; resize:none;" id="contentdetail" placeholder="html code"></textarea>
Code:<textarea style="height:1.3rem; width:300px; resize:none;" id="codedetail" placeholder="javascript code"></textarea></div>`;

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
        const publishnewapp =document.getElementById("submitshop");
        const submitnewapp = document.getElementById("submitnewapp");
        submitnewapp.addEventListener("click", (e)=>{
            const details = {
                handle:"",
                content:"",
                emoji:"",
                code:"",
                author:"",
            };
            details.handle = document.getElementById("titledetail").value;
            details.content = document.getElementById("contentdetail").value;            details.content = document.getElementById("contentdetail").value;
            details.emoji = document.getElementById("emojidetail").value;
            details.code = document.getElementById("codedetail").value;
            details.author = document.getElementById("authordetail").value;
            if(details.author === "");
            details.author = "anonymous";
            INIT(top,left,details);
        });
        
        publishnewapp.addEventListener("click", async (e)=>{
            const details = {
                handle:"",
                content:"",
                emoji:"",
                code:"",
                author:"",
            };
            details.handle = document.getElementById("titledetail").value;
            details.content = document.getElementById("contentdetail").value;            details.content = document.getElementById("contentdetail").value;
            details.emoji = document.getElementById("emojidetail").value;
            details.code = document.getElementById("codedetail").value;
            details.author = document.getElementById("authordetail").value;
            if(details.author === "");
            details.author = "anonymous";
            const res = await fetch(`${URL}/rest/v1/apps`,{
                method: "POST",
                headers:{
                    "apikey":KEY,
                    "Authorization": `Bearer ${KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                emoji: details.emoji,
                content: details.content,
                title: details.handle,
                code: details.code,
                author: details.author
                })
            });
            if(!res.ok)
            {
                const error = await res.json();
                console.log(error);
                alert(res.message);
            }
        });
    }
    card.style.display="none";
}

