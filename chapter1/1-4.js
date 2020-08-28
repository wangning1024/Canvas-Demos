let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    FONT_HEIGHT = 30,
    MARGIN = 30,
    HAND_TRUNCATION = canvas.width / 25, // 分钟和秒针截断的长度
    HOUR_HAND_TRUNCATION = canvas.width / 10, // 时针截断的长度
    NUMERAL_SPACING = 15, // 数字与圆圈的间隔距离
    RADIUS = canvas.width / 2 - MARGIN, // 半径
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

function drawCircle() {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0,
        Math.PI * 2, true);
    context.stroke();
}

function drawNumerals() {
    let numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
        angle = 0,
        numeralWidth = 0;

    numerals.forEach(function (numeral) {
        angle = Math.PI / 6 * (numeral - 3);
        numeralWidth = context.measureText(numeral).width;
        context.fillText(numeral,
            canvas.width/2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
            canvas.height/2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3)
    })
}

function drawCenter() {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
    context.fill();
}

function drawHand(loc, isHour) {
    // 基本公式： 180 * 1度 = π * 1弧度 ，因此： 弧度 = π * 度数 / 180

    let angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2, // 当前时刻的弧度
        handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION : RADIUS - HAND_TRUNCATION; // 表针长度
    context.moveTo(canvas.width / 2, canvas.height / 2); // 圆心
    context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius, canvas.height / 2 + Math.sin(angle) * handRadius);
    context.stroke();
}

function drawHands() {
    let date = new Date,
        hour = date.getHours();
    hour = hour > 12 ? hour - 12 : hour;
    drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);
    drawHand(date.getMinutes(), false);
    drawHand(date.getSeconds(), false);
}

function drawClock() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
}

context.font = FONT_HEIGHT + 'px';
loop = setInterval(drawClock, 1000);