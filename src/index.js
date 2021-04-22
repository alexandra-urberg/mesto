import './pages/index.css'
import { Card } from '../src/components/Card.js'
import { FormValidator } from '../src/components/Formvalidator.js'
import Section from '../src/components/Section.js'
import PopupWithImage from '../src/components/PopupWithImage.js'
import PopupWithForm from '../src/components/PopupWithForm.js'
import UserInfo from '../src/components/UserInfo.js'
import { initialCards, validSelectors, openPopupProfileBtn, popupProfileBlock, nameInput,
    jobInput, popupForm, openPopupImageBtn, popupImage, popupImageForm, template,
    popupImageContainer, imagePopup } from '../src/components/utilites.js'

// Вызываем класс UserInfo
const userInformation = new UserInfo({name: '.profile__name', job: '.profile__job'});

//Вызываем классы PopupWithImage и PopupWithForm для попап popupProfile и popupImage
const popupOnlyImage = new PopupWithImage(imagePopup);

// Вызывыем класс FormValidator с параметрами форм для popupProfile и popupImage ///
const validNewCards = new FormValidator(validSelectors, popupImageForm); 
const validProfileBlock = new FormValidator(validSelectors, popupForm);

const cardList = new Section ({
    items: initialCards,
    renderer: (items) => {
        const newCard = new Card(items, template, popupOnlyImage).createElementCard();
        cardList.addItem(newCard);
    }
  }, 
  popupImageContainer
);

cardList.renderItems();

const formPopupProfile = new PopupWithForm({
    popupSelector: popupProfileBlock, 
    submithFormHandler: (items) => {
        userInformation.setUserInfo(items);
        formPopupProfile.close();  
    }
});

const formPopupImage = new PopupWithForm({
    popupSelector: popupImage, 
    submithFormHandler: (items) => {
        const newCard = new Card(items, template, popupOnlyImage).createElementCard();
        formPopupImage.close();
        cardList.addItem(newCard);
    }
});

//проверяем валидность форм
validNewCards.enableValidation();
validProfileBlock.enableValidation(); 

//Обработчики событий
popupOnlyImage.setEventListeners();
formPopupProfile.setEventListeners();
formPopupImage.setEventListeners();

/// Обработчкики закрытия/открытия Popup-ов ///
openPopupProfileBtn.addEventListener('click', function() {
    formPopupProfile.open();
    validProfileBlock.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
    validProfileBlock.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления 
    nameInput.value = userInformation.getUserInfo().name;
    jobInput.value = userInformation.getUserInfo().job;
});

openPopupImageBtn.addEventListener('click', () => {
    formPopupImage.open();
    validNewCards.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления 
    validNewCards.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
}); 
