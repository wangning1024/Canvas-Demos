let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    eraseAllButton = document.getElementById('eraseAllButton'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    guidewireCheckbox = document.getElementById('guidewireCheckbox'),
    instructions = document.getElementById('instructions'),
    instructionsOkayButton = document.getElementById('instructionsOkayButton'),
    instructionsNoMoreButton = document.getElementById('instructionsNoMoreButton'),

    showInstructions = true,

    AXIS_MARGIN = 40,
    HORIZONTAL_TICK_SPACING = 10,
    VERTICAL_TICK_SPACING = 10,
    TICK_SIZE = 10,

    GRID_STROKE_STYLE = 'lightblue',
    GRID_SPACING = 10,

    CONTROL_POINT_RADIUS = 5,
    CONTROL_POINT_STROKE_STYLE = 'blue',
    CONTROL_POINT_FILL_STYLE = 'rgba(255, 255, 0, 0.5)',

    END_POINT_STROKE_STYLE = 'navy',
    END_POINT_FILL_STYLE = 'rgba(0, 255, 0, 0.5)',

    GUIDEWIRE_STROKE_STYLE = 'rgba(0, 0, 230, 0.4)',

    drawingImageData,
    mousedown = {},
    rubberbandRect = {},
    dragging = false,
    draggingPoint = false,

    endPoints = [{}, {}],
    controlPoints = [{}, {}],
    editing = false,

    guidewires = guidewireCheckbox.checked;

function saveDrawingSurface() {
    drawingImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreDrawingSurface() {
    context.putImageData(drawingImageData, 0, 0);
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

function drawBezierCurve() {
    context.beginPath();
    context.moveTo(endPoints[0].x, endPoints[0].y);
    context.save();
    context.lineWidth = 3;
    context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
        controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
    context.stroke();
    context.restore();
}

function updateEndAndControlPoints() {
    endPoints[0].x = rubberbandRect.left;
    endPoints[0].y = rubberbandRect.top;
    endPoints[1].x = rubberbandRect.left + rubberbandRect.width;
    endPoints[1].y = rubberbandRect.top + rubberbandRect.height;

    controlPoints[0].x = rubberbandRect.left;
    controlPoints[0].y = rubberbandRect.top + rubberbandRect.height;
    controlPoints[1].x = rubberbandRect.left + rubberbandRect.width;
    controlPoints[1].y = rubberbandRect.top;
}

function drawRubberbandShape(loc) {
    updateEndAndControlPoints();
    drawBezierCurve();
}

function updateRubberband(loc) {
    updateRubberbandRectangle(loc);
    drawRubberbandShape(loc);
}

function drawControlPoint(index) {
    context.beginPath();
    context.arc(controlPoints[index].x, controlPoints[index].y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
}

function drawControlPoints() {
    context.save();
    context.strokeStyle = CONTROL_POINT_STROKE_STYLE;
    context.fillStyle = CONTROL_POINT_FILL_STYLE;
    drawControlPoint(0);
    drawControlPoint(1);
    context.stroke();
    context.fill();
    context.restore();
}

function drawEndPoint(index) {
    context.beginPath();
    context.arc(endPoints[index].x, endPoints[index].y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
}
function drawEndPoints() {
    context.save();
    context.strokeStyle = END_POINT_STROKE_STYLE;
    context.fillStyle = END_POINT_FILL_STYLE;
    drawEndPoint(0);
    drawEndPoint(1);
    context.stroke();
    context.fill();
    context.restore();
}

function drawControlAndEndPoints() {
    drawControlPoints();
    drawEndPoints();
}

function cursorInEndPoint(loc) {
    let pt;
    endPoints.forEach(function (point) {
        context.beginPath();
        context.arc(point.x, point.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
        if (context.isPointInPath(loc.x, loc.y)) {
            pt = point;
        }
    });
    return pt;
}

function cursorInControlPoint(loc) {
    let pt;
    controlPoints.forEach(function (point) {
        context.beginPath();
        context.arc(point.x, point.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
        if (context.isPointInPath(loc.x, loc.y)) {
            pt = point;
        }
    });
    return pt;
}

function updateDraggingPoint(loc) {
    draggingPoint.x = loc.x;
    draggingPoint.y = loc.y;
}

canvas.onmousedown = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    if (!editing) {
        saveDrawingSurface(context);
        mousedown.x = loc.x;
        mousedown.y = loc.y;
        updateRubberbandRectangle(loc);
        dragging = true;
    } else {
        draggingPoint = cursorInControlPoint(loc);
        if (!draggingPoint) {
            draggingPoint = cursorInEndPoint(loc);
        }
    }
}

canvas.onmousemove = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    if (dragging || draggingPoint) {
        e.preventDefault();
        restoreDrawingSurface();
        if (guidewires) {
            drawGuidewires(loc.x, loc.y);
        }
    }
    if (dragging) {
        updateRubberband(loc);
        drawControlAndEndPoints();
    } else if (draggingPoint) {
        updateDraggingPoint(loc);
        drawControlAndEndPoints();
        drawBezierCurve();
    }
}

canvas.onmouseup = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    restoreDrawingSurface();
    if (!editing) {
        updateRubberband(loc);
        drawControlAndEndPoints();
        dragging = false;
        editing = true;
        if (showInstructions) {
            instructions.style.display = 'inline';
        }
    } else {
        if (draggingPoint) {
            drawControlAndEndPoints();
        } else {
            editing = false;
        }
        drawBezierCurve();
        draggingPoint = undefined;
    }
}

eraseAllButton.onclick = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, GRID_STROKE_STYLE, GRID_SPACING, GRID_SPACING);
    saveDrawingSurface();
    editing = false;
    dragging = false;
    draggingPoint = undefined;
}

strokeStyleSelect.onchange = function (e) {
    context.strokeStyle = strokeStyleSelect.value;
}
guidewireCheckbox.onchange = function (e) {
    guidewires = guidewireCheckbox.checked;
}
instructionsOkayButton.onclick = function (e) {
    instructions.style.display = 'none';
}
instructionsNoMoreButton.onclick = function (e) {
    instructions.style.display = 'none';
    showInstructions = false;
}

context.strokeStyle = strokeStyleSelect.value;
context.lineWidth = 10;
drawGrid(context, GRID_STROKE_STYLE, GRID_SPACING, GRID_SPACING);



