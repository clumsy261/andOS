import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"
import INIT from "./custom.js";
import { resizeElement, writetoapp } from "./coretools.js";

const URL="https://eomzkoohlqupoenlufwl.supabase.co";
const KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbXprb29obHF1cG9lbmx1ZndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0OTk0NzAsImV4cCI6MjEwMzA3NTQ3MH0.EZz3Sbb7QqS68FlrKboxVZlH3-sLwqOddlR_c99EsZI";

let content = `<div style="display:flex; justify-content:center;">
<div><strong style="vertical-align:top;">Title:</strong><textarea placeholder="app title(unique)" id="titledetail" style="height:1.3rem; resize:none;"></textarea></div>
<div><strong style="vertical-align:top;">Author:</strong><textarea placeholder="your cool username" id="authordetail" style="height:1.3rem; resize:none;"></textarea></div>
<div><strong style="vertical-align:top;">Emoji:</strong><textarea placeholder="font-awesome icon" id="emojidetail" style="height:1.3rem; resize:none;"></textarea></div>
<button style="border-top-left-radius: 5px; border-end-start-radius: 5px;" id="submitnewapp">Submit</button>
<button style="border-top-right-radius: 5px; border-end-end-radius: 5px;" id="submitshop">Publish</button></div>
<div style="display:flex; align-items:center; gap:5px;">
<strong>Content:</strong><textarea style="height:1.3rem; width:320px; resize:none;" id="contentdetail" placeholder="html code"></textarea>
<strong>Code:</strong><textarea style="height:1.3rem; width:320px; resize:none;" id="codedetail" placeholder="javascript code"></textarea></div>`;

const handle = "bscode"; ///handle of the app

function getAppId(){
    return localStorage.getItem("andos_app_id");
}

function setAppId(id){
    localStorage.setItem("andos_app_id", id);
}

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
            details.content = document.getElementById("contentdetail").value;
            details.emoji = document.getElementById("emojidetail").value;
            details.code = document.getElementById("codedetail").value;
            details.author = document.getElementById("authordetail").value;
            if(details.author === "")
            details.author = "anonymous";
            INIT(top,left,details);
        });
        
        publishnewapp.addEventListener("click", async (e)=>{
            const details = {
                title:"",
                content:"",
                emoji:"",
                code:"",
                author:"",
                info:""
            };
            async function isValidIcon(name) 
            {
            if (typeof window.FontAwesome === "undefined") return true;
            const probe = document.createElement("i");
            probe.className = `fa-solid fa-${name}`;
            probe.style.display = "none";
            document.body.appendChild(probe);
            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
            const ok = !!probe.querySelector("svg");
            probe.remove();
            return ok;
            }
            details.info = details.info = prompt("Do you want to add a description for your app?") || "";
            details.title = document.getElementById("titledetail").value;
            details.emoji = document.getElementById("emojidetail").value;
            details.content = document.getElementById("contentdetail").value;            
            details.code = document.getElementById("codedetail").value;
            details.author = document.getElementById("authordetail").value;
            if(details.title === "") details.title=prompt("The app has no name - please add one:");
            if(details.content === "" && details.code === "")
                details.content ="<p>Seems like the user forgot to add any content :/ oops</p>";
            if(details.author === "") details.author = "anonymous";
            if (!(await isValidIcon(details.emoji))) details.emoji = "gears";
            const appId = 15;//getAppId();
            if(details.title === "") details.title = "App"+appId;
            if (appId) 
        {
            console.log(appId);
            // Update existing row
            const res = await fetch(`${URL}/rest/v1/apps?id=eq.${appId}`, {
                method: "PATCH",
                headers: {
                    "apikey": KEY,
                    "Authorization": `Bearer ${KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify(details)
            });
            if (!res.ok) {console.error(await res.json()); alert(res.message);}
        } else 
        {
        // Insert new row
        const res = await fetch(`${URL}/rest/v1/apps`, {
            method: "POST",
            headers: {
                "apikey": KEY,
                "Authorization": `Bearer ${KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=representation"
            },
            body: JSON.stringify(details)
        });
        if (res.ok) {
            const data = await res.json();
            setAppId(data[0].id);  // store the assigned id
        } else {
            console.error(await res.json());
            alert(res.message);
        }
        }
        });
    }
    card.style.display="none";
}

