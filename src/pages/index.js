import './index.css'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/Formvalidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { initialCards, validSelectors, openPopupProfileBtn, popupProfileBlock, nameInput,
    jobInput, popupForm, openPopupImageBtn, popupImage, popupImageForm, template,
    popupImageContainer, imagePopup } from '../utils/utilites.js'

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
    const userInfoCollect = userInformation.getUserInfo();
    nameInput.value = userInfoCollect.name;
    jobInput.value = userInfoCollect.job;
});

openPopupImageBtn.addEventListener('click', () => {
    formPopupImage.open();
    validNewCards.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления 
    validNewCards.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
}); 
