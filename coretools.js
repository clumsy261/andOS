export function dragElement(element) {
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
}
export function writetoapp(content,handle)
{
    document.querySelector(`#${handle} .appcontent`).innerHTML=content;
}
