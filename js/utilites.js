const initialCards = [
  { 
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  { 
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  { 
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  { 
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  { 
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  { 
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validSelectors = {
  formSelector: '.popup__form-container', //формы блоков popup
  inputSelector: '.popup__input', // инпуты блоков popup
  submitButtonSelector: '.popup__save-button', // кноки submit/type popup
  inactiveButtonClass: 'popup__button_disabled', //класс добавляемый в кнопку submit/type popup для того чтобы кнопка не работала
  inputErrorClass: 'popup__input-error_active', //класс добавляемый в input при ошибке валидации
  errorClass: 'popup__input-error' //класс добавляемый в span для вывода ошибки при валидации
}

export { initialCards, validSelectors };