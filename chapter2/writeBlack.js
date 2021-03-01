// https://blog.csdn.net/weixin_33788244/article/details/93178239

let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');
let isDown = false;
let startX, startY;
let lineWidth;

context.lineCap = 'round';
context.lineJoin = 'round';

context.canvas.onmousedown = function (e) {
    e.preventDefault();
    console.log('onmousedown');
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    startX = loc.x;
    startY = loc.y;
    context.moveTo(startX, startY);
    isDown = true;
};

context.canvas.onmousemove = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    if (isDown) {
        context.save();
        console.log('drawing');
        context.moveTo(startX, startY);
        context.lineTo(loc.x, loc.y);

        let distance = Math.sqrt(Math.pow(loc.x - startX, 2) +
            Math.pow(loc.y - startY, 2));
        console.log('distance', distance);

        lineWidth = 8;
        if (distance > 3) {
            lineWidth = Math.floor(lineWidth * (distance / 50));
        }
        context.lineWidth = lineWidth < 1 ? 1 : lineWidth;
        console.log('lineWidth', context.lineWidth);

        startX = loc.x;
        startY = loc.y;

        context.stroke();
        context.restore();
    }

};



context.canvas.onmouseup = function onmouseUp(ev) {
    ev.preventDefault();
    isDown = false;

    console.log('onmouseup');
};
