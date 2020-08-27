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

    control_point_radius = 5,
    control_point_stroke_style = 'blue',
    control_point_fill_style = 'rgba(255, 255, 0, 0.5)',

    end_point_stroke_style = 'navy',
    end_point_fill_style = 'rgba(0, 255, 0, 0.5)',

    guidewire_stroke_style = 'rgba(0, 0, 230, 0.4)',

    drawingImageData,
    mousedown = {},
    rubberbandRect = {},
    dragging = false,
    draggingPoint = false,

    endPoints = [{}, {}],
    controlPoints = [{}, {}],
    editing = false,

    guidewires = guidewireCheckbox.checked;

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
    context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
        controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
    context.stroke();
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

