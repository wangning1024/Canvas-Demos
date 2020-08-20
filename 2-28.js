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

function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
    context.putImageData(drawingSurfaceImageData, 0, 0);
}

function drawPolygon(polygon) {
    context.beginPath();
    polygon.createPath(context);
    polygon.stroke(context);
    if (fillCheckbox.checked()) {
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
        rubberbandRect.width, parseInt(sidesSelect.value),
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