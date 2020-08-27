let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    // gradient = context.createRadialGradient(
    //     canvas.width/2, canvas.height, 100, canvas.width/2, 0, 100);

gradient = context.createRadialGradient(
    0, canvas.height/2, 10, canvas.width, canvas.height/2, 100);

gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.25, 'white');
gradient.addColorStop(0.5, 'purple');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1, 'yellow');

context.fillStyle = gradient;
context.rect(0, 0, canvas.width, canvas.height);
context.fill();



let canvas1 = document.getElementById('canvas1'),
    context1 = canvas1.getContext('2d'),

    gradient1 = context1.createRadialGradient(
        200, canvas.height/2, 50, canvas.width, canvas.height/2, 10);

gradient1.addColorStop(0, 'yellow');
gradient1.addColorStop(0.25, 'red');
gradient1.addColorStop(0.5, 'purple');
gradient1.addColorStop(0.75, 'white');
gradient1.addColorStop(1, 'blue');

context1.fillStyle = gradient1;
context1.rect(0, 0, canvas.width, canvas.height);
context1.fill();