// File to test blinking led
var Gpio = require('onoff').Gpio,
 led = new Gpio(4, 'out');
var iv = setInterval(function () {
 led.writeSync(led.readSync() === 0 ? 1 : 0)
}, 500);

// Toggle state of the LED every half second
setTimeout(function () {
 clearInterval(iv);
 led.writeSync(0);
 
 // Turn LED off
 led.unexport();

 // End blinking after 2 seconds
}, 2000); 