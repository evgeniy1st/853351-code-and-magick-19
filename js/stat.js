'use strict';

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_Y_REVERSE = CLOUD_Y + CLOUD_HEIGHT;
var CLOUD_COLOR = '#fff';
var CONGRATULATION_FIRST_LINE = 'Ура вы победили!';
var CONGRATULATION_SECOND_LINE = 'Список результатов:';
var CONGRATULATION_FONT = '16px PT Mono';
var CONGRATULATION_COLOR = '#000';
var GAP = 50;
var CLOUD_PADDING_TOP = GAP / 4;
var HISTOGRAM_TEXT_COLOR = '#000';
var LINE_HEIGHT = 16;
var NO_PLAYERS_MESSAGE = 'Игроков нет';
var SCREW_MARGIN = 10;
var SCREW_RADIUS = 5;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var SHADOW_OFFSET = 10;
var startHistogramColumn = CLOUD_X + GAP;
var stepHistogramColumn = BAR_WIDTH + GAP;

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
  return false;
};

var renderCongratulation = function (ctx, textFirstLine, textSecondLine, color, font) {
  ctx.fillStyle = color;

  ctx.font = font;
  ctx.textBaseline = 'hanging';
  ctx.fillText(textFirstLine, startHistogramColumn, CLOUD_Y + CLOUD_PADDING_TOP);
  ctx.fillText(textSecondLine, startHistogramColumn, CLOUD_Y + CLOUD_PADDING_TOP + LINE_HEIGHT);
};

var renderHistogramText = function (ctx, color, nameText, nameX, nameY, timeText, timeX, timeY) {
  ctx.fillStyle = color;

  ctx.fillText(nameText, nameX, nameY);

  ctx.fillText(timeText, timeX, timeY);
};

var renderHistogramColumn = function (ctx, index, player, time, maxTime) {
  ctx.fillStyle = 'hsla(240, 100%, 50%, ' + (1 - (index / 10 * 2.5)) + ')';
  if (player === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }

  ctx.fillRect(startHistogramColumn + (stepHistogramColumn * index), (CLOUD_Y_REVERSE - GAP - Math.floor((BAR_HEIGHT * time) / maxTime)), BAR_WIDTH, Math.floor((BAR_HEIGHT * time) / maxTime));
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderScrew(ctx, CLOUD_X + SCREW_MARGIN, CLOUD_Y + SCREW_MARGIN, SCREW_RADIUS);
  renderScrew(ctx, CLOUD_X + SCREW_MARGIN, CLOUD_Y_REVERSE - SCREW_MARGIN, SCREW_RADIUS);
  renderScrew(ctx, CLOUD_X + CLOUD_WIDTH - SCREW_MARGIN, CLOUD_Y_REVERSE - SCREW_MARGIN, SCREW_RADIUS);
  renderScrew(ctx, CLOUD_X + CLOUD_WIDTH - SCREW_MARGIN, CLOUD_Y + SCREW_MARGIN, SCREW_RADIUS);

  renderCongratulation(ctx, CONGRATULATION_FIRST_LINE, CONGRATULATION_SECOND_LINE, CONGRATULATION_COLOR, CONGRATULATION_FONT);

  var maxTime = getMaxElement(times);

  if (!maxTime) {
    ctx.fillText(NO_PLAYERS_MESSAGE, startHistogramColumn * 2, CLOUD_Y + GAP * 2);
    return;
  }

  for (var i = 0; i < players.length; i++) {

    renderHistogramText(ctx, HISTOGRAM_TEXT_COLOR, players[i], startHistogramColumn + (stepHistogramColumn * i), (CLOUD_Y_REVERSE - GAP / 2), Math.floor(times[i]), startHistogramColumn + (stepHistogramColumn * i), (CLOUD_Y_REVERSE - GAP - Math.floor((BAR_HEIGHT * times[i]) / maxTime)) - LINE_HEIGHT);

    renderHistogramColumn(ctx, i, players[i], times[i], maxTime);
  }
};
