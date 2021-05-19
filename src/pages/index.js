import './index.css'
import Api from '../components/Api.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/Formvalidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithSubmith from '../components/PopupWithSubmit.js'
import { validSelectors, openPopupProfileBtn, popupProfileBlock, nameInput,
    jobInput, popupForm, openPopupImageBtn, popupImage, template, popupImageForm,
    popupImageContainer, imagePopup, popupEditAvatar, openButtonPopupAatar, popupDeleteCard, popupDeleteButton } 
from '../utils/utilites.js' 

// Вызываем класс UserInfo
const userInformation = new UserInfo({name: '.profile__name', about: '.profile__job', avatar: '.profile__avatar'});

//Вызываем классы PopupWithImage и PopupWithForm для попап popupProfile и popupImage
const popupOnlyImage = new PopupWithImage(imagePopup);
const deleteCard = new PopupWithSubmith(popupDeleteCard, handleFormSubmit);

// Вызывыем класс FormValidator с параметрами форм для popupProfile и popupImage ///
const validNewCards = new FormValidator(validSelectors, popupImageForm); 
const validProfileBlock = new FormValidator(validSelectors, popupForm);
const validAvatarPopup = new FormValidator(validSelectors, popupEditAvatar);

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
      authorization: '7dfaf4c9-82d9-4096-b562-ec8631a23ab5',
      'Content-Type': 'application/json'
    }
});

let myId; // переменная в которую будем сохранять id user для удаления карточке 
api.getPersonalInformation() //втаскиваем игформацию о user с сервера 
.then(user => {
    myId = user._id; // передавем id пользователя 
    userInformation.setUserInfo(user);
})
.catch(error => console.log(error));

api.getInitialCards() //вытаскиваем карточки с сервера
.then(initialCards => {
    card.renderItems(initialCards);
})
.catch(error => console.log(error));

const formPopupProfile = new PopupWithForm({//изменение информации пользователя (добавление ее на сервер)
    popupSelector: popupProfileBlock, 
    submithFormHandler: (userData) => {
        api.editPersonalProfile(userData)
        .then(data => {
            userInformation.setUserInfo(data);
            formPopupProfile.close();
        })
        .catch(error => console.log(error))
        .finally(() => formPopupProfile.apploadInformation(false));
    }
});

const formPopupAvatar = new PopupWithForm({//изменяем аватар пользователя(добавляем его на сервер)
    popupSelector: popupEditAvatar,
    submithFormHandler: ({avatar}) => {
        api.editAvatar(avatar)
        .then(data => {
            userInformation.changeAvatar(data);
            formPopupAvatar.close();
        })
        .catch(error => console.log(error))
        .finally(() => formPopupProfile.apploadInformation(false));
    }
});

function  createCard(data) {
    return new Card(data, myId, template, popupOnlyImage, addLikes, rejectLike, handleFormSubmit, popupDeleteButton).createElementCard();
};

function addLikes(id, item) {//функция добавляет лайк
    api.addLike(id)
    .then(data => {
      item.updateLike(data);
    })
    .catch((err) => console.log(err));
}
  
function rejectLike(id, item) {//функиця убирает лайк
    api.deleteLike(id)
    .then(data => {
        item.updateLike(data);
    })
    .catch((err) => console.log(err));
}

const card = new Section((item) => {
      const image = createCard(item);
      card.addItem(image);
    },
    popupImageContainer
);

const formPopupImage = new PopupWithForm({ //добавляем карточку на сервер
    popupSelector: popupImage,
    submithFormHandler: (data) => {
        api.addNewCard(data)
        .then((data) =>{ 
            card.addItem(createCard(data));
            formPopupImage.close();
        })
        .catch(error => console.log(error))
        .finally(() => formPopupImage.apploadInformation(false));
    }
})

function handleFormSubmit(id,card) { //удаление карточки с сервера
    api.deleteCard(id)
    .then(() => deleteCard.close())
    .catch(err => console.log(err))
    .finally(() => setTimeout(card.remove(), 10000))
}

//проверяем валидность форм
validNewCards.enableValidation();
validProfileBlock.enableValidation(); 
validAvatarPopup.enableValidation();

//Обработчики событий
popupOnlyImage.setEventListeners();
formPopupProfile.setEventListeners();
formPopupAvatar.setEventListeners();
formPopupImage.setEventListeners();
deleteCard.setEventListeners();

/// Обработчкики закрытия/открытия Popup-ов ///
openPopupProfileBtn.addEventListener('click', () => {
    formPopupProfile.open();
    validProfileBlock.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
    validProfileBlock.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления 
    const userInfoCollect = userInformation.getUserInfo();
    nameInput.value = userInfoCollect.name; 
    jobInput.value = userInfoCollect.job;
});

openButtonPopupAatar.addEventListener('click', () => {
    formPopupAvatar.open();
    validAvatarPopup.removeErrors();//удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
    validAvatarPopup.disableSubmitButton();//кнопка submit в состояние disabled после обнуления
});

openPopupImageBtn.addEventListener('click', () => {
    formPopupImage.open();
    validNewCards.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления 
    validNewCards.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
}); 