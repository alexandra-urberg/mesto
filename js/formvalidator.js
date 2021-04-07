export class FormValidator {
  constructor(validSelectors, popupForms) {
    this._validSelectors = validSelectors;
    this._popupForms = popupForms;
    this._disabledSubmitButton = this._popupForms.querySelector(this._validSelectors.submitButtonSelector);
  }

  enableValidation() { ////метод добавление обработчиков всем формам
    const formList = Array.from(this._popupForms.querySelectorAll(this._validSelectors.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }

  disableSubmitButton() { //вводим кнопки submit в состояние disabled после обнуления 
    this._disabledSubmitButton.classList.add(this._validSelectors.inactiveButtonClass);
    this._disabledSubmitButton.disabled = true; 
  } 
  
  _showInputError(inputElement, errorMessage) { ////метод добавляющая класс с ошибкой
    const errorElement = this._popupForms.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validSelectors.errorClass);
  }

  _hideInputError(inputElement) { ////метод удаляющий класс с ошибкой
    const errorElement = this._popupForms.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validSelectors.inputErrorClass);
    errorElement.classList.remove(this._validSelectors.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) { //метод проверяющая валидность полей
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement) { //метод добавление обработчиков всем полям форм
    const inputList = Array.from(formElement.querySelectorAll(this._validSelectors.inputSelector));
    const buttonElement = formElement.querySelector(this._validSelectors.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _hasInvalidInput(inputList) { //метод проверки валидации по всем полям для настройки кнопок (submit, button) в popup
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }

  _toggleButtonState(inputList, buttonElement) { //метод меняющий статуc кнопок в popup на disabled при выявлении ошибок и восстанавливае статус обратно при их отстутсвии
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._validSelectors.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._validSelectors.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
}