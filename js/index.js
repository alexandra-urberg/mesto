// Вводные данные для elements ///
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

/// Popup Profile ///
const openPopupProfileBtn = document.querySelector('#popup-profile__open-button'); //кнопка, вызывающая Popup Profile окно
const popupProfileBlock = document.querySelector('#popup-profile'); //блок Popup Profile
const closePopupBtn = popupProfileBlock.querySelector('.popup__button-cross'); //закрывющая кнопка/крест блок Popup Profile
const profileName = document.querySelector('.profile__name'); // место ввода имени
const profileJob = document.querySelector('.profile__job'); // место вводы "работы"
const nameInput = document.querySelector('#input-name'); //input "name"
const jobInput = document.querySelector('#input-job'); // input "job"
const popupForm = document.querySelector('.popup__form'); //форма блока PopUp Profile
// Popup Image ///
const openPopupImageBtn = document.querySelector('#popup-image__open-button'); //кнопка открывающая блок Popup Image
const popupImage = document.querySelector('#popup-image'); // блок Popup Image
const closePopupImageBtn = popupImage.querySelector('.popup__button-crossik'); // кнопка закрывающая блок Popup Image
/// Template ///
const popupImageContainer = document.querySelector('#template__container'); // переменная в которую будем добавлять карточки
const popupImageForm = document.querySelector('.popup__image-form'); // переменная куда будет вноиться информаци о картинках и ссылки
const templateImage = document.querySelector('#template'); // блок template
/// Popup image ///
const imagePopup = document.querySelector('#image'); // блок image (увеличение фотографий)
const image = imagePopup.querySelector('.image'); // увеличенная фотография
const imageTitle = imagePopup.querySelector('.image__tittle'); // подпись фотографии
const imageCloseButton = imagePopup.querySelector('.popup__image-button'); //кнопка закрывающая фотографию


/// Ф-ция открытия/закрытия popup окна ///
function popUpToggle(block) {
    block.classList.toggle('popup_is-opened');
}

//Ф-ция добавления информации из input 
//отменяем отправку формы по умолчанию
function addInformation (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value; //текст в profileName является значением, занесенным в nameInput
    profileJob.textContent = jobInput.value; //текст в profileJob является значением, занесенным в nameJob
    popUpToggle(popupProfileBlock); // проверяем параметр функцией popUpToggle
}

/// Ф-ция удаления карточек ///
function deleteElementCard(element) {
    const deleteButton = element.querySelector('.element__trash');
    deleteButton.addEventListener('click', () => element.remove());
}

/// Функция для like-button ///
function addLike(element) {
    const likeButtomTemplate = element.querySelector('.element__button-like');
    likeButtomTemplate.addEventListener('click', () => likeButtomTemplate.classList.toggle('element__button-like_active'));
}

/// Добавление карточки в DOM ///
function addElementCard(element) {
    popupImageContainer.prepend(element);
}

/// Ф-ция создающиая новые карточки с фотографиями ///
function createElementCard(title, image) {
    const newItem = templateImage.content.querySelector('.template__card').cloneNode(true); //клонируем элементы из  блока teamplate
    const templateImg = newItem.querySelector('.element__image');
    const templateTitle = newItem.querySelector('.element__quote');
    templateTitle.textContent = title;
    templateImg.src = image;
    deleteElementCard(newItem);
    addLike(newItem);
    openFullSizeImage(newItem);
    return newItem;
}

/// Рендер на страницу ///
function createInitCards() {
    initialCards.forEach((item) => {
        const card = createElementCard(item.name, item.link);
        addElementCard(card); 
    });
}

createInitCards();

/// Добавление новой карточки /// 
function addNewCards(evt) {
    evt.preventDefault();
    const popupInputTitle = popupImageForm.querySelector('#popup__input-title');
    const popupInputImage = popupImageForm.querySelector('#popup__input-img');

    const templateTitle = popupInputTitle.value;
    const templateImageElement = popupInputImage.value;

    const card = createElementCard(templateTitle, templateImageElement);
    popUpToggle(popupImage);
    addElementCard(card);
    templateImageElement.value = '';
    templateTitle.value = '';
}

/// Функция увеличения картинки при клике на нее ///
function openFullSizeImage(block) {
    const templateImg = block.querySelector('.element__image');
    const templateTitle = block.querySelector('.element__quote');

    templateImg.addEventListener(('click'), function() {
        image.src = templateImg.src;
        imageTitle.textContent = templateTitle.textContent;
        popUpToggle(imagePopup);
    });
}

/// Обработчкики закрытия/открытия Popup-ов ///
openPopupProfileBtn.addEventListener('click', function() {
    popUpToggle(popupProfileBlock);
});

closePopupBtn.addEventListener('click', function() {
    popUpToggle(popupProfileBlock);
});

openPopupImageBtn.addEventListener('click',function() {
    popUpToggle(popupImage);
});

closePopupImageBtn.addEventListener('click', function() {
    popUpToggle(popupImage);
}); 

imageCloseButton.addEventListener(('click'), function() {
    popUpToggle(imagePopup);
});

/// Обработчики submit длая Popup-ов /// 
popupForm.addEventListener('submit', addInformation);

popupImageForm.addEventListener('submit', addNewCards);

