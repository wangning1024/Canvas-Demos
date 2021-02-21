let context = document.getElementById('canvas').getContext('2d');

context.lineWidth = 1;
context.beginPath();
context.moveTo(50, 10);
context.lineTo(250, 10);
context.stroke();
context.beginPath();
context.moveTo(50, 20.5);
context.lineTo(250, 20.5);
context.stroke();

context.lineWidth = 0.5;
context.beginPath();
context.moveTo(50, 30);
context.lineTo(250, 30);
context.stroke();
context.beginPath();
context.moveTo(50, 40.5);
context.lineTo(250, 40.5);
context.stroke();
context.beginPath();
context.moveTo(50, 50.2);
context.lineTo(250, 50.2);
context.stroke();