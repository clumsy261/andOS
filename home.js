//actual app content
let content = `
<h2>Welcome to my OS!</h2>
<p>lorem ipsum something</p>`;
//app title - title
const handle = "title";
//this function starts the app- change it's name to INIT_yourapp
export default function INIT_HOME(top,left){
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

function dragElement(element) {
    if (element.style.display === "none") return;        
        var initialX = 0;
        var initialY = 0;
        var currentX = 0;
        var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY; 
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (element.style.display === "none") return;        
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function closeWindow(element){
  element.style.display = "none";
}
function openWindow(element){
  element.style.display = "flex";
}
}

/*
--inside navbar
<div id="titleopen"><i class="fa-solid fa-house"></i></div>

--inside body after navbar
00<div style="top: 50px; left: 100px;" class="card" id="title">
        <div class="appbar header" id="titleheader">
            <div id="titleclose" class="closebutton"><i class="fa-solid fa-circle" style="color: rgb(255, 0, 0);"></i></div>
        </div>
        <div class="appcontent">
            <h2>Welcome to my OS!</h2>
            <p>lorem ipsum something</p>
        </div>
00</div>
*/