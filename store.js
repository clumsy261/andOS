import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"
import { resizeElement } from "./coretools.js";
import INIT from "./custom.js";
const URL="https://eomzkoohlqupoenlufwl.supabase.co";
const KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvbXprb29obHF1cG9lbmx1ZndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0OTk0NzAsImV4cCI6MjEwMzA3NTQ3MH0.EZz3Sbb7QqS68FlrKboxVZlH3-sLwqOddlR_c99EsZI";



let content = `
<input placeholder="search apps here" id="storesearch" type="text" style="border-radius:5px;"></input>
<div id="storewindow"></div>`;

const handle = "store"; ///handle of the app

export default async function INIT_STORE(top,left) //this function starts the app- change it's name to INIT_yourapp
{
    ///add html items - navbar icon + window div inside body + window content
    var navIcon = document.createElement("div");
    navIcon.id = handle + "open";
    navIcon.innerHTML = '<i class="fa-solid fa-bag-shopping"></i>';
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
    <div class="appcontent" style="max-width:300px; text-align:center;">
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
    {
        async function fetch_supa(search,select)
        {
            if(search != "")
            search = "title=ilike.*"+search+"*&";
            if(select != "*")
                select="title,emoji,info";
            const res = await fetch(
            `${URL}/rest/v1/apps?${search}select=${select}`,
            {
                headers: {
                    "apikey": KEY,
                    "Authorization": `Bearer ${KEY}`
                }
            }
            );
            if(!res.ok){alert("something went wrong, please try again later");console.log(await res.json());}
            else
                return await res.json();        
        }
    ///initial return-all fetch for shop
    const data = await fetch_supa("","restrict");
    document.getElementById("storewindow").innerHTML="";
    data.forEach(app => 
    {
        const appcard = document.createElement("div");
        appcard.id = app.title+"storecard";
        appcard.innerHTML=`<i class="fa-solid fa-${app.emoji}"></i><strong>${app.title}</strong>`
        appcard.classList="shopcard";
        document.getElementById("storewindow").appendChild(appcard);
        console.log(app.title, app.author);
        appcard.addEventListener("click", async (e)=>
        {
            if(document.getElementById(app.title))
                alert("this app is already installed in your browser")
            else
            if(confirm(`Are you sure you want to add this app?\nInfo:${app.info}`))
            {
                const install = await fetch_supa(app.title, "*");
                console.log(install);
                const newdetails ={
                    handle:install[0].title,
                    emoji:install[0].emoji,
                    content:install[0].content,
                    code:install[0].code
                }; INIT(top,left,newdetails);
            }
        });
    });
    ///title-search based of event listener
    document.getElementById("storesearch").addEventListener("keydown", async (e) =>
    {
        if(e.key === "Enter")
        {
            const q=e.target.value;
            const data = await fetch_supa(q,"non");
            if(data.length>0)
            {                           
                document.getElementById("storewindow").innerHTML="";
                data.forEach(app => 
                    {
                        const appcard = document.createElement("div");
                        appcard.id = app.title+"storecard";
                        appcard.innerHTML=`<i class="fa-solid fa-${app.emoji}"></i><strong>${app.title}</strong>`
                        appcard.classList="shopcard";
                        document.getElementById("storewindow").appendChild(appcard);
                        console.log(app.title, app.author);
                        appcard.addEventListener("click", async (e)=>
                        {
                            if(document.getElementById(app.title))
                                alert("this app is already installed in your browser")
                            else
                            if(confirm(`Are you sure you want to add this app? Info:${app.info}`))
                            {
                                const install = await fetch_supa(app.title, "*");
                                    console.log(install);
                                    const newdetails ={
                                        handle:install[0].title,
                                        emoji:install[0].emoji,
                                        content:install[0].content,
                                        code:install[0].code
                                    }; INIT(top,left,newdetails);
                            }
                        });
                    });
            }
            else
            {console.log("no apps found"); 
            alert("no apps found");}                     
            
        }
    });
    }
    card.style.display="none";
}
