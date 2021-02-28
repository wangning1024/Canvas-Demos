// https://blog.csdn.net/weixin_33788244/article/details/93178239

let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

let isDown = false;

let startX, startY;

context.lineWidth = 8;
context.lineCap = 'round';
context.lineJoin = 'round';
// context.strokeStyle = 'green';

context.canvas.onmousedown = function mouseDown(e) {
    e.preventDefault();
    console.log('onmousedown');

    // context.strokeRect(e.offsetX, e.offsetY, 120, 30);
    // context.fillStyle = 'goldenrod';

    startX = e.offsetX;
    startY = e.offsetY;
    context.moveTo(startX, startY);

    isDown = true;
};

context.canvas.onmousemove = function mouseMove(e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    if (isDown) {
        console.log('drawing');
        context.moveTo(startX, startY);
        context.lineTo(e.offsetX, e.offsetY);
        startX = e.offsetX;
        startY = e.offsetY;
        context.stroke();
    }

};



context.canvas.onmouseup = function onmouseUp(ev) {
    ev.preventDefault();
    isDown = false;

    console.log('onmouseup');
};
