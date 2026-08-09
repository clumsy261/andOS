import {dragElement} from "./coretools.js"
import {openWindow} from "./coretools.js"
import { closeWindow } from "./coretools.js"

//actual app content
let content = `
<h2>Welcome to my OS!</h2>
<p>lorem ipsum something</p>`;
//app title - title
const handle = "clock";
//this function starts the app- change it's name to INIT_yourapp
export default function INIT_CLOCK(top,left){
    ///add html items - navbar icon + window div inside body + window content
    document.querySelector(".navbar").innerHTML+=`<div id="${handle}open"><i class="fa-solid fa-house"></i></div>`;
    document.querySelector("body").innerHTML+=`<div style="top: ${top}px; left: ${left}px;" class="card" id="${handle}"></div>`;
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
`<div style="top: 50px; left: 100px;" class="card" id="clock">
    <div class="appbar header" id="notesheader">
            <div id="clockclose" class="closebutton"><svg class="svg-inline--fa fa-circle" style="color: rgb(255, 0, 0);" data-prefix="fas" data-icon="circle" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"></path></svg><!-- <i class="fa-solid fa-circle" style="color: rgb(255, 0, 0);"></i> Font Awesome fontawesome.com --></div>
    </div>
        <div class="appcontent">  
            <div style="display:flex">
            <div>
                <script src="https://cdn.logwork.com/widget/clock.js"></script>
                Current time for
                <select>
                    <option value="Atlantic/Reykjavík">GMT</option>
                    <option value="Europe/London">GMT+1</option>
                    <option value="Europe/Berlin">GMT+2</option>
                    <option value="Europe/Bucharest">GMT+3</option>
                    <option value="Asia/Dubai">GMT+4</option>
                    <option value="Asia/Astana">GMT+5</option>
                    <option value="Asia/Bangladesh">GMT+6</option>
                    <option value="Asia/Norilsk">GMT+7</option>
                    <option value="Asia/Beijing">GMT+8</option>
                    <option value="Asia/Yakutsk">GMT+9</option>
                    <option value="Australia/Cairns">GMT+10</option>
                    <option value="Asia/Magadan">GMT+11</option>
                    <option value="Asia/Anadyr">GMT+12</option>
                    <option value="Pacific/Niue">GMT-11</option>
                    <option value="Pacific/Honolulu">GMT-10</option>
                    <option value="America/Adak">GMT-9</option>
                    <option value="America/Anchorage">GMT-8</option>
                    <option value="America/Whitehorse">GMT-7</option>
                    <option value="America/Denver">GMT-6</option>
                    <option value="America/Chicago">GMT-5</option>
                    <option value="America/Miami">GMT-4</option>
                    <option value="America/Halifax">GMT-3</option>
                    <option value="America/Godthab">GMT-2</option>
                    <option value="America/Godthab">GMT-1</option>
                </select>
            </div>
            <div>            
            <a href="https://logwork.com/current-time-in-ploiesti-romania-prahova" class="clock-time" data-style="default-numeral" data-size="150" data-timezone="Europe/Bucharest">_</a>
            <a href="https://logwork.com/current-time-in-ploiesti-romania-prahova" class="clock-time" data-style="default-numeral" data-size="150" data-timezone="America/New_York">_</a>
            </div>
            </div>
            <!--<iframe src="https://free.timeanddate.com/clock/iajf6usg/n5121/szw110/szh110/hoc000/hbw4/cf100/hgr0/fav0/fiv0/mqc000/mqs3/mql25/mqw6/mqd96/mhc000/mhs3/mhl20/mhw6/mhd96/mmc000/mms3/mml10/mmw2/mmd96/hhw16/hmw16/hmr4/hsc000/hss3/hsl90" frameborder="0" width="110" height="110"></iframe>-->
        </div>
    </div>`