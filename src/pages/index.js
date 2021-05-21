import "./index.css";
import Api from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/Formvalidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithSubmith from "../components/PopupWithSubmit.js";
import {
  validSelectors,
  openPopupProfileBtn,
  popupProfileBlock,
  nameInput,
  jobInput,
  popupForm,
  openPopupImageBtn,
  popupImage,
  template,
  popupImageForm,
  popupImageContainer,
  imagePopup,
  popupEditAvatar,
  openButtonPopupAatar,
  popupAvatarForm,
  popupDeleteCard,
} from "../utils/utilites.js";
// Вызываем класс UserInfo
const userInformation = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
  avatar: ".profile__avatar",
});
//Вызываем классы PopupWithImage и PopupWithForm для попап popupProfile и popupImage
const popupOnlyImage = new PopupWithImage(imagePopup);
// Вызывыем класс FormValidator с параметрами форм для popupProfile и popupImage ///
const validNewCards = new FormValidator(validSelectors, popupImageForm);
const validProfileBlock = new FormValidator(validSelectors, popupForm);
const validAvatarPopup = new FormValidator(validSelectors, popupAvatarForm);
// переменная в которую будем сохранять id user для удаления карточке
let myId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "7dfaf4c9-82d9-4096-b562-ec8631a23ab5",
    "Content-Type": "application/json",
  },
});

const card = new Section((item) => {
  const image = createCard(item);
  card.addItem(image);
}, popupImageContainer);

Promise.all([api.getPersonalInformation(), api.getInitialCards()])
.then(([userData, initialCards]) => {
    myId = userData;
    userInformation.setUserInfo(myId);
    card.renderItems(initialCards);
})
.catch((error) => console.log(error));

//изменение информации пользователя (добавление ее на сервер)
const formPopupProfile = new PopupWithForm({
  popupSelector: popupProfileBlock,
  submithFormHandler: (userData) => {
    api
      .editPersonalProfile(userData)
      .then((data) => {
        userInformation.setUserInfo(data);
        formPopupProfile.close();
      })
      .catch((error) => console.log(error))
      .finally(() => formPopupProfile.updateButtonText(false));
  },
});
//изменяем аватар пользователя(добавляем его на сервер)
const formPopupAvatar = new PopupWithForm({
  popupSelector: popupEditAvatar,
  submithFormHandler: ({ avatar }) => {
    api
      .editAvatar(avatar)
      .then((data) => {
        userInformation.changeAvatar(data);
        formPopupAvatar.close();
      })
      .catch((error) => console.log(error))
      .finally(() => formPopupProfile.updateButtonText(false));
  },
});

function createCard(data) {
  return new Card(
    data,
    myId,
    template,
    popupOnlyImage,
    addLikes,
    rejectLike,
    onDeleteBtnClick
  ).createElementCard();
}

//функция добавляет лайк
function addLikes(id, item) {
  api
    .addLike(id)
    .then((data) => {
      item.countLike(data);
    })
    .catch((err) => console.log(err));
}

//функиця убирает лайк
function rejectLike(id, item) {
  api
    .deleteLike(id)
    .then((data) => {
      item.countLike(data);
    })
    .catch((err) => console.log(err));
}

//добавляем карточку на сервер
const formPopupImage = new PopupWithForm({
  popupSelector: popupImage,
  submithFormHandler: (data) => {
    api
      .addNewCard(data)
      .then((data) => {
        card.addItem(createCard(data));
        formPopupImage.close();
      })
      .catch((error) => console.log(error))
      .finally(() => formPopupImage.updateButtonText(false));
  },
});

//удаление карточки с сервера
const onDeleteBtnClick = (id, card) => deleteCard.open(id, card); //передаем в card (сразу открывает попап удаления карточки)
const deleteCard = new PopupWithSubmith(popupDeleteCard, (id, card) => {
  api
    .deleteCard(id)
    .then(() => deleteCard.close())
    .catch((err) => console.log(err))
    .finally(() => setTimeout(card.remove(), 10000));
});

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
openPopupProfileBtn.addEventListener("click", () => {
  formPopupProfile.open();
  validProfileBlock.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
  validProfileBlock.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления
  const userInfoCollect = userInformation.getUserInfo();
  nameInput.value = userInfoCollect.name;
  jobInput.value = userInfoCollect.about;
});

openButtonPopupAatar.addEventListener("click", () => {
  formPopupAvatar.open();
  validAvatarPopup.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления
  validAvatarPopup.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
});

openPopupImageBtn.addEventListener("click", () => {
  formPopupImage.open();
  validNewCards.removeErrors(); //удаление выявленных ошибок при закрытие popup через esc, overlay и кнопку "крестик"
  validNewCards.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления
});