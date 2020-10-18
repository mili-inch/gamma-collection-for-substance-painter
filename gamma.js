const clipboardy = require("clipboardy");
const ioHook = require("iohook");
const clipboardListener = require('clipboard-event');

const gamma = (num) => {
    return Math.floor(Math.pow(num, 2.2)*1000)/1000;
}
const clamp = (num) => {
    return num > 1.00 ? 1.00 : num < 0.00 ? 0.00 : num;
}

clipboardListener.startListening();

let color = [];

clipboardListener.on('change', () => {
    try{
        const text = clipboardy.readSync();
        if (/\d\.\d\d,\s\d\.\d\d,\s\d\.\d\d/.test(text)) {
            color = text.split(", ");
            color = color.map(item => Number(item));
        }
    } catch (e) {
        console.log(e);
    }
});

ioHook.on('keyup', event => {
    //console.log(event.keycode);
    if(color.length == 0) {
        return;
    }
    switch (event.keycode) {
        case 19:
            console.log("pressed r");
            clipboardy.write(String(gamma(color[0])));
            break;
        case 34:
            console.log("pressed g");
            clipboardy.write(String(gamma(color[1])));
            break;
        case 48:
            console.log("pressed b");
            clipboardy.write(String(gamma(color[2])));
            break;
        case 61000:
            color = color.map(item => clamp(item * 2));
            break;
        case 61008:
            color = color.map(item => clamp(item / 2));
            break;
    }
});

ioHook.start();