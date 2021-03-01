let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    eraseAllButton = document.getElementById('eraseAllButton'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    fillStyleSelect = document.getElementById('fillStyleSelect'),
    fillCheckbox = document.getElementById('fillCheckbox'),
    editCheckbox = document.getElementById('editCheckbox'),
    sidesSelect = document.getElementById('sidesSelect'), // todo
    drawingSurfaceImageData,
    mousedown = {},
    rubberbandRect = {},
    dragging = false,
    draggingOffsetX,
    draggingOffsetY,

    sides = 8,
    startAngle = 0,
    guidewires = false,
    editing = false,
    polygons = [];

let Point = function (x, y) {
    this.x = x;
    this.y = y;
};

let Polygon = function (centerX, centerY, radius, sides, startAngle, strokeStyle, fillStyle, filled) {
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.sides = sides;
    this.startAngle = startAngle;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.filled = filled;
};
Polygon.prototype = {
    getPoints: function () {
        let points = [],
            angle = this.startAngle || 0;
        for (let i = 0; i < this.sides; ++i) {
            points.push(new Point(this.x + this.radius * Math.sin(angle), this.y - this.radius * Math.cos(angle)));
            angle += 2 * Math.PI / this.sides;
        }
        return points;
    },
    createPath: function (context) {
        let points = this.getPoints();
        console.log('points', points);
        if (points.length > 0) {
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < this.sides; ++i) {
                context.lineTo(points[i].x, points[i].y);
            }
            context.closePath();
        }
    },
    stroke: function (context) {
        context.save();
        this.createPath(context);
        context.strokeStyle = this.strokeStyle;
        context.stroke();
        context.restore();
    },
    fill: function (context) {
        context.save();
        this.createPath(context);
        context.fillStyle = this.fillStyle;
        context.fill();
        context.restore();
    },
    move: function (x, y) {
        this.x = x;
        this.y = y;
    }
}


function saveDrawingSurface() {
    drawingSurfaceImageData =
        context.getImageData(0, 0, canvas.width, canvas.offsetHeight);
}

function restoreDrawingSurface() {
    context.putImageData(drawingSurfaceImageData, 0, 0);
}

function drawPolygon(polygon) {
    context.beginPath();
    polygon.createPath(context);
    polygon.stroke(context);
    if (fillCheckbox.checked) {
        polygon.fill(context);
    }
}

function updateRubberbandRectangle(loc) {
    rubberbandRect.width = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);

    if (loc.x > mousedown.x) {
        rubberbandRect.left = mousedown.x;
    } else {
        rubberbandRect.left = loc.x;
    }
    if (loc.y > mousedown.y) {
        rubberbandRect.top = mousedown.y;
    } else {
        rubberbandRect.top = loc.y;
    }
}

function drawRubberbandShape(loc, sides, startAngle) {
    let polygon = new Polygon(mousedown.x, mousedown.y,
        rubberbandRect.width, parseInt(sidesSelect.value || sides),
        (Math.PI / 180) * parseInt(startAngle),
        context.strokeStyle,
        context.fillStyle,
        fillCheckbox.checked
    );
    drawPolygon(polygon);
    if (!dragging) {
        polygons.push(polygon);
    }
}

function updateRubberband(loc, sides, startAngle) {
    updateRubberbandRectangle(loc);
    drawRubberbandShape(loc, sides, startAngle);
}

function drawPolygons() {
    polygons.forEach(function (polygon) {
        drawPolygon(polygon);
    });
}

function startDragging(loc) {
    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
}

function startEditing() {
    canvas.style.cursor = 'pointer';
    editing = true;
}

function stopEditing() {
    canvas.style.cursor = 'crosshair';
    editing = false;
}

canvas.onmousedown = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    console.log('editing', editing);
    if (editing) {
        polygons.forEach(function (polygon) {
            polygon.createPath(context);
            if (context.isPointInPath(loc.x, loc.y)) {
                startDragging(loc);
                dragging = polygon;
                draggingOffsetX = loc.x - polygon.x;
                draggingOffsetY = loc.y - polygon.y;
                return;
            }
        });
    } else {
        startDragging(loc);
        dragging = true;
    }
};
canvas.onmousemove = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    if (editing && dragging) {
        dragging.x = loc.x - draggingOffsetX; // todo
        dragging.y = loc.y - draggingOffsetY;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid(context, 'lightgray', 10, 20);
        drawPolygons();
    } else if (dragging) {
        restoreDrawingSurface();
        updateRubberband(loc, sides, startAngle);
        if (guidewires) {
            drawGuidewires(mousedown.x, mousedown.y);
        }
    }
};
canvas.onmouseup = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    dragging = false;
    // if (editing) {
    //
    // } else {
    //     restoreDrawingSurface();
    //     updateRubberband(loc); // todo
    // }
};
eraseAllButton.onclick = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, 'lightgray', 10, 10);
    saveDrawingSurface();
};
strokeStyleSelect.onchange = function (e) {
    context.strokeStyle = strokeStyleSelect.value;
};
fillStyleSelect.onchange = function (e) {
    context.fillStyle = fillStyleSelect.value;
};
editCheckbox.onchange = function (e) {
    if (editCheckbox.checked) {
        startEditing();
    } else {
        stopEditing();
    }
};

context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;
context.shadowColor = 'rgba(0,0,0, 0.4)';
context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 4;
drawGrid(context, 'lightgray', 10, 10);





