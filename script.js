import INIT_HOME from "./home.js"
import INIT_WEATHER from "./weather.js"
var top=50;
var left=100;
INIT_HOME(top,left);
top+=10;left+=10;
INIT_WEATHER(top,left);
top+=10;left+=10;

/*
var titleScreenOpen = document.querySelector("#titleopen")
var titleScreenClose = document.querySelector("#titleclose")


titleScreenClose.addEventListener("click", function() {
  closeWindow(title);
});

titleScreenOpen.addEventListener("click", function(){
  if(title.style.display==="none")
  openWindow(title);
  else
    closeWindow(title);
})
  */