import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"
import { resizeElement } from "./coretools.js";
//have the app be hidden by default or not
let hidden=1;

//actual content you set in html
let mediatitle = `<strong>High Cliffs Surrounding Echus Chasma on Mars</strong>`;
const KEY="KSFtXMP6HhAYCTz29Nm4giBBdrCwf59EbbN5PG94ff";///last two ff for general testing (api is limited)

const handle = "background"; ///handle of the app

export default async function INIT_BACKGROUND(top,left) //this function starts the app- change it's name to INIT_yourapp
{
    const date = new Date();
    const datestr = date.toISOString().split('T')[0];
    await APOD_FETCH(KEY,datestr);
    document.body.style.backgroundImage=`url(${mediaurl})`;
    ///add html items - navbar icon + window div inside body + window content
    var navIcon = document.createElement("div");
    navIcon.id = handle + "open";
    navIcon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    document.querySelector(".navbar").appendChild(navIcon);    
    var card = document.createElement("div");
    card.id = handle;
    card.className = "card";
    card.style.top = top + "px";
    card.style.left = left + "px";
    card.style.width= "500px";
    document.body.appendChild(card);
    document.querySelector(`#${handle}`).innerHTML=`
    <div class="appbar header" id="${handle}header">
            <div id="${handle}close" class="closebutton"><i class="fa-solid fa-circle" style="color: rgb(255, 0, 0);"></i></div>
    </div>
    <div class="appcontent">
        <strong>${mediatitle}</strong><p>${mediacontent}</p>
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
    if(hidden)
        card.style.display="none";
}

let mediacontent="What created this great cliff on Mars? Did giant waterfalls once plummet through its grooves? With a four-kilometer drop, this high cliff surrounding Echus Chasma, near an impressive impact crater, was carved by either water or lava. A leading hypothesis is that Echus Chasma, at 100-kilometers long and 10-kilometers wide, was once one of the largest water sources on Mars. If true, water once held in Echus Chasma likely ran over the Martian surface to carve the impressive Kasei Valles, which extends over 3,000 kilometers to the north. Even if initially carved by water, lava appears to have later flowed in the valley, leaving an extraordinarily smooth floor. Echus Chasma lies north of tremendous Valles Marineris, the largest canyon in the Solar System. The above image was taken by the robotic Mars Express spacecraft currently orbiting Mars.";
let mediaurl="https://apod.nasa.gov/apod/image/0807/echuschasma_marsexpress.jpg";


async function APOD_FETCH(API_KEY,date)
{
    const link =`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
    await fetch(link)
    .then (response =>response.json()).then(data => {
        console.log(`Received APOD article: ${data.title}`);
        if (data.media_type === "image") {
            mediatitle="<strong>Find out more about today's picture!</strong>  ~"+date+"<br><strong>"+data.title+"</strong>";
            mediacontent=data.explanation;
            mediaurl = data.url;
        } else
        {
            console.log("Recieved unproper media for background :(");
            mediacontent="Unfortunately, today's media is unavailable so we used an older one:"+mediacontent;
        }
    })
    .catch(err => {
        console.log("Recieved unproper media for background :(");
        mediacontent="Unfortunately, today's media is unavailable so we used an older one:"+mediacontent;    
        });
}