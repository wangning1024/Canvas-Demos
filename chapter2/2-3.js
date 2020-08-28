let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    gradient = context.createLinearGradient(0, 0, canvas.width, 0);

gradient.addColorStop(0, 'blue');
// gradient.addColorStop(0.25, 'white');
// gradient.addColorStop(0.5, 'purple');
// gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1, 'yellow');

context.fillStyle = gradient;
context.rect(0, 0, canvas.width, canvas.height);
context.fill();

let canvas1 = document.getElementById('canvas1'),
    context1 = canvas1.getContext('2d'),
    gradient1 = context1.createLinearGradient(0, 0, 0, canvas.height);

gradient1.addColorStop(0, 'blue');
gradient1.addColorStop(0.25, 'white');
gradient1.addColorStop(0.5, 'purple');
gradient1.addColorStop(0.75, 'red');
gradient1.addColorStop(1, 'yellow');

context1.fillStyle = gradient1;
context1.rect(0, 0, canvas.width, canvas.height);
context1.fill();


let canvas2 = document.getElementById('canvas2'),
    context2 = canvas2.getContext('2d'),
    gradient2 = context2.createLinearGradient(0, 0, canvas.width,  canvas.height);

gradient2.addColorStop(0, 'blue');
gradient2.addColorStop(0.25, 'white');
gradient2.addColorStop(0.5, 'purple');
gradient2.addColorStop(0.75, 'red');
gradient2.addColorStop(1, 'yellow');

context2.fillStyle = gradient2;
context2.rect(0, 0, canvas.width, canvas.height);
context2.fill();