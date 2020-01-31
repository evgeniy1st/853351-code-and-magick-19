'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var BAR_WIDTH = 40;
var LINE_HEIGHT = 16;
var congratulationFirstLine = 'Ура вы победили!';
var congratulationSecondLine = 'Список результатов:';
var congratulationFont = '16px PT Mono';
var barHeight = 150;
var shadowOffset = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderScrew = function (ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.strokeStyle = '#000';
  ctx.stroke();
  ctx.fillStyle = '#000';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 2, cy - 2);
  ctx.lineTo(cx + 2, cy + 2);
  ctx.closePath();
  ctx.strokeStyle = '#fff';
  ctx.stroke();
};

var getMaxElement = function (arr) {
  if (arr[0]) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  }
  return 'Игроков нет';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + shadowOffset, CLOUD_Y + shadowOffset, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderScrew(ctx, CLOUD_X + 10, CLOUD_Y + 10, 5);
  renderScrew(ctx, CLOUD_X + 10, CLOUD_Y + CLOUD_HEIGHT - 10, 5);
  renderScrew(ctx, CLOUD_X + CLOUD_WIDTH - 10, CLOUD_Y + CLOUD_HEIGHT - 10, 5);
  renderScrew(ctx, CLOUD_X + CLOUD_WIDTH - 10, CLOUD_Y + 10, 5);

  ctx.fillStyle = '#000';

  ctx.font = congratulationFont;
  ctx.textBaseline = 'hanging';
  ctx.fillText(congratulationFirstLine, CLOUD_X + GAP, CLOUD_Y + GAP / 4);
  ctx.fillText(congratulationSecondLine, CLOUD_X + GAP, CLOUD_Y + GAP / 4 + LINE_HEIGHT);

  var maxTime = getMaxElement(times);

  if (maxTime === 'Игроков нет') {
    ctx.fillText(maxTime, CLOUD_X + 100, CLOUD_Y + 100);
    return;
  }

  if (times.length > players.length) {
    times.length = players.length;
  }

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP + ((BAR_WIDTH + GAP) * i), (CLOUD_Y + CLOUD_HEIGHT - GAP / 2));
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + ((BAR_WIDTH + GAP) * i), (CLOUD_Y + CLOUD_HEIGHT - GAP - Math.floor((barHeight * times[i]) / maxTime)) - LINE_HEIGHT);
    ctx.fillStyle = 'hsla(240, 100%, 50%, ' + (1 - (i / 10 * 2.5)) + ')';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + GAP + ((BAR_WIDTH + GAP) * i), (CLOUD_Y + CLOUD_HEIGHT - GAP - Math.floor((barHeight * times[i]) / maxTime)), BAR_WIDTH, Math.floor((barHeight * times[i]) / maxTime));
  }
};
