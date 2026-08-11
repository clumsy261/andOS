import INIT_HOME from "./home.js"
import INIT_WEATHER from "./weather.js"
import INIT_CLOCK from "./clock.js";
var top=50;
var left=100;
INIT_HOME(top,left);
top+=10;left+=10;
INIT_WEATHER(top,left);
top+=10;left+=10;
INIT_CLOCK(top,left);