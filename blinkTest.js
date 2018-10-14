// File to test blinking led
var Gpio = require('onoff').Gpio,
led = new Gpio(4, 'out');

// Blink after .5 seconds
var iv = setInterval(function () {
  console.log("toggle");
  led.writeSync(led.readSync() === 0 ? 1 : 0)
}, 500);

// Turn off led after 10 secs
setTimeout(function () {
  clearInterval(iv);
  led.writeSync(0);
 
 // Turn LED off
 led.unexport();
 console.log("off");


 // End blinking after 2 seconds
}, 10000); 
