export class FormValidator {
  constructor(validSelectors, popupForm) {
    this._validSelectors = validSelectors;
    this._popupForm = popupForm;
    this._submitButton = this._popupForm.querySelector(
      this._validSelectors.submitButtonSelector
    );
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(this._validSelectors.inputSelector)
    );
    this._errorList = Array.from(document.querySelectorAll(".input-error"));
  }

  _showInputError(inputElement, errorMessage) {////метод добавляющая класс с ошибкой
    const errorElement = this._popupForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._validSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validSelectors.errorClass);
  }

  _hideInputError(inputElement) { ////метод удаляющий класс с ошибкой
    const errorElement = this._popupForm.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._validSelectors.inputErrorClass);
    errorElement.classList.remove(this._validSelectors.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {//метод проверяющая валидность полей
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {//метод проверки валидации по всем полям для настройки кнопок (submit, button) в popup
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton() {//вводим кнопки submit в состояние disabled после обнуления
    this._submitButton.classList.add(this._validSelectors.inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  _toggleButtonState() {//метод меняющий статуc кнопок в popup на disabled при выявлении ошибок и восстанавливае статус обратно при их отстутсвии
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._submitButton.classList.remove(
        this._validSelectors.inactiveButtonClass
      );
      this._submitButton.removeAttribute("disabled");
    }
  }

  _setEventListeners() {//метод добавление обработчиков всем полям форм
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {//метод добавление обработчиков всем формам
    this._popupForm.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  removeErrors() {//метод удаляющий выявленные ошибки при закрытие popup через esc, overlay и кнопку "крестик"
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove(this._validSelectors.inputErrorClass);
    });
    this._errorList.forEach((errorElement) => {
      errorElement.classList.remove(this._validSelectors.errorClass);
      errorElement.textContent = "";
    });
  }
}