'use strict';

var LIST_OF_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LIST_OF_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var LIST_OF_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var LIST_OF_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_SLOTS = 4;
var LIST_OF_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupOpen = document.querySelector('.setup-open');
var similarCharacters = [];
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var inputWizardCoat = setup.querySelector('input[name="coat-color"]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var inputWizardEyes = setup.querySelector('input[name="eyes-color"]');
var fireballWrap = setup.querySelector('.setup-fireball-wrap');
var inputFireball = setup.querySelector('input[name="fireball-color"]');

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

var getObjectWizard = function () {
  return {
    name: getRamdomName(LIST_OF_NAMES, LIST_OF_LAST_NAMES),
    coatColor: getRandomColor(LIST_OF_COLORS),
    eyesColor: getRandomColor(LIST_OF_EYES_COLORS)
  };
};

var getRandomData = function (arr, quantity) {
  for (var i = 0; i < quantity; i++) {
    arr.push(getObjectWizard());
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

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var validateNameInput = function () {
  var message = '';
  if (userNameInput.validity.tooShort) {
    message = 'Имя должно состоять минимум из 2-х символов';
  } else if (userNameInput.validity.tooLong) {
    message = 'Имя не должно превышать 25-ти символов';
  } else if (userNameInput.validity.valueMissing) {
    message = 'Обязательное поле';
  }
  userNameInput.setCustomValidity(message);
};

var colorizeWizard = function (arrColor, el, inputEl) {
  el.style.fill = getRandomColor(arrColor);
  inputEl.value = el.style.fill;
};

var colorizeFireball = function (arrColor) {
  var color = arrColor[getRandomNumber(0, arrColor.length)];
  fireballWrap.style.backgroundColor = color;
  inputFireball.value = color;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

userNameInput.addEventListener('invalid', function () {
  validateNameInput();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  colorizeWizard(LIST_OF_COLORS, wizardCoat, inputWizardCoat);
});

fireballWrap.addEventListener('click', function () {
  colorizeFireball(LIST_OF_FIREBALL_COLORS);
});

wizardEyes.addEventListener('click', function () {
  colorizeWizard(LIST_OF_EYES_COLORS, wizardEyes, inputWizardEyes);
});

getRandomData(similarCharacters, QUANTITY_SLOTS);

renderWizards(similarCharacters);

setup.querySelector('.setup-similar').classList.remove('hidden');
