'use strict';

var LIST_OF_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LIST_OF_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var LIST_OF_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var LIST_OF_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_SLOTS = 4;
var setup = document.querySelector('.setup');
var similarCharacters = [];
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRamdomName = function (arrNames, arrLastNames) {
  var name = arrNames[getRandomNumber(0, arrNames.length)];
  var lastName = arrLastNames[getRandomNumber(0, arrLastNames.length)];
  return name + ' ' + lastName;
};

var getRandomColor = function (arrColor) {
  return arrColor[getRandomNumber(0, arrColor.length)];
};

var getRandomEyesColor = function (arrEyeColor) {
  return arrEyeColor[getRandomNumber(0, arrEyeColor.length)];
};

var getRandomData = function (arr, quantity) {
  for (var i = 0; i < quantity; i++) {
    arr[i] = {
      name: getRamdomName(LIST_OF_NAMES, LIST_OF_LAST_NAMES),
      coatColor: getRandomColor(LIST_OF_COLORS),
      eyesColor: getRandomEyesColor(LIST_OF_EYES_COLORS)
    };
  }
  return arr;
};

var createWizard = function (character) {
  var wizard = similarWizardTemplate.cloneNode(true);

  wizard.querySelector('.setup-similar-label').textContent = character.name;
  wizard.querySelector('.wizard-coat').style.fill = character.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = character.eyesColor;

  return wizard;
};

var renderWizards = function (characters) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < characters.length; i++) {
    fragment.appendChild(createWizard(characters[i]));
  }
  similarListElement.appendChild(fragment);
};

setup.classList.remove('hidden');

getRandomData(similarCharacters, QUANTITY_SLOTS);

renderWizards(similarCharacters);

setup.querySelector('.setup-similar').classList.remove('hidden');
