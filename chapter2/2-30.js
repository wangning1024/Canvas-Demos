let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    rectangle_width = 100,
    rectangle_height = 100;

context.translate(canvas.width / 2 - rectangle_width / 2,canvas.hidden / 2 - rectangle_height / 2);

context.strokeRect(0, 0, rectangle_width, rectangle_height);