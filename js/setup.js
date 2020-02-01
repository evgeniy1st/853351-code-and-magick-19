'use strict';

var setup = document.querySelector('.setup');
var similarCharacters = [];
var listOfNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var listOfLastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var listOfColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var listOfEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
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
  var color = arrColor[getRandomNumber(0, arrColor.length)];
  return color;
};

var getRandomEyesColor = function (arrEyeColor) {
  var eyeColor = arrEyeColor[getRandomNumber(0, arrEyeColor.length)];
  return eyeColor;
};

var getRandomData = function (arr, quantity) {
  for (var i = 0; i < quantity; i++) {
    arr[i] = {
      name: getRamdomName(listOfNames, listOfLastNames),
      coatColor: getRandomColor(listOfColors),
      eyesColor: getRandomEyesColor(listOfEyesColors)
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

var renderWizard = function (characters) {
  for (var i = 0; i < characters.length; i++) {
    fragment.appendChild(createWizard(characters[i]));
  }
  similarListElement.appendChild(fragment);
};

setup.classList.remove('hidden');

getRandomData(similarCharacters, 4);

var fragment = document.createDocumentFragment();

renderWizard(similarCharacters);

setup.querySelector('.setup-similar').classList.remove('hidden');
