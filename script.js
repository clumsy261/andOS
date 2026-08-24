import INIT_HOME from "./home.js"
import INIT_WEATHER from "./weather.js"
import INIT_CLOCK from "./clock.js";
import INIT_NOTES from "./notes.js";
import INIT_BACKGROUND from "./background.js";
import INIT from "./custom.js";
import INIT_BSCODE from "./bscode.js";
import INIT_STORE from "./store.js";
var top=50;
var left=100;
INIT_HOME(top,left);
top+=10;left+=10;
INIT_WEATHER(top,left);
top+=10;left+=10;
INIT_CLOCK(top,left);
top+=10;left+=10;
INIT_NOTES(top,left);
top+=10;left+=10;
INIT_BACKGROUND(top,left);
top+=10;left+=10;
INIT_BSCODE(top,left);
top+=10;left+=10;
INIT_STORE(top,left);
