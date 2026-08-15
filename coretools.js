export function dragElement(element) {
  element.addEventListener("mousedown", function() {
    if (element.style.display !== "none") bringToFront(element);
  });  
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
export function closeWindow(element){
  element.style.display = "none";
}
export function openWindow(element){
  element.style.display = "flex";
  bringToFront(element);
}
///live updates to the content of your app, avoids resetting window eventlisteners
export function writetoapp(content,handle)
{
    document.querySelector(`#${handle} .appcontent`).innerHTML=content;
}
///corner handle for window resize
export function resizeElement(element) {
    if (element.style.display === "none") return;
    if (document.getElementById(element.id + "resize")) return;
    const minwidth=element.offsetWidth;
    const minheight=element.offsetHeight;

    var handle = document.createElement("div");
    handle.id = element.id + "resize";
    handle.className = "resizehandle";
    element.appendChild(handle);

    var startX = 0, startY = 0, startW = 0, startH = 0;
    handle.onmousedown = function(e) {
        e = e || window.event;
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        startW = element.offsetWidth;
        startH = element.offsetHeight;
        document.onmouseup = stopResizing;
        document.onmousemove = elementResize;
    };

    function elementResize(e) {
        if (element.style.display === "none") return;
        e = e || window.event;
        e.preventDefault();
        // direct math (start size + total drag) - no cumulative drift
        var w = startW + (e.clientX - startX);
        var h = startH + (e.clientY - startY);
        element.style.width  = Math.max(minwidth, w) + "px";   // min width
        element.style.height = Math.max(minheight, h) + "px";    // min height
    }

    function stopResizing() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

let zTop=1;

export function bringToFront(element)
{
  element.style.zIndex = ++zTop;
}