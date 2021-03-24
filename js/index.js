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
const popUp = document.querySelectorAll('.popup'); //блоки popup
const openPopupProfileBtn = document.querySelector('#popup-profile__open-button'); //кнопка, вызывающая Popup Profile окно
const popupProfileBlock = document.querySelector('#popup-profile'); //блок Popup Profile
const closePopupBtn = popupProfileBlock.querySelector('.popup__button-cross'); //закрывющая кнопка/крест блок Popup Profile
const profileName = document.querySelector('.profile__name'); // место ввода имени
const profileJob = document.querySelector('.profile__job'); // место вводы "работы"
const nameInput = document.querySelector('#input-name'); //input "name"
const jobInput = document.querySelector('#input-job'); // input "job"
const popupForm = document.querySelector('#popup__form'); //форма блока PopUp Profile
// Popup Image ///
const openPopupImageBtn = document.querySelector('#popup-image__open-button'); //кнопка открывающая блок Popup Image
const popupImage = document.querySelector('#popup-image'); // блок Popup Image
const closePopupImageBtn = popupImage.querySelector('.popup__button-crossik'); // кнопка закрывающая блок Popup Image
const popupInputTitle = document.querySelector('#popup__input-title');
const popupInputImage = document.querySelector('#popup__input-img');
const popupImageForm = document.querySelector('#popup__image-form'); // переменная куда будет вноиться информаци о картинках и ссылки
/// Template ///
const popupImageContainer = document.querySelector('#template__container'); // переменная в которую будем добавлять карточки
const templateImage = document.querySelector('#template'); // блок template
/// Popup image ///
const imagePopup = document.querySelector('#image'); // блок image (увеличение фотографий)
const image = imagePopup.querySelector('.image'); // увеличенная фотография
const imageTitle = imagePopup.querySelector('.image-tittle'); // подпись фотографии
const imageCloseButton = imagePopup.querySelector('.popup__image-button'); //кнопка закрывающая фотографию

// Ф-ция открытия/закрытия popup окна
function showPopup(block) {
    block.classList.add('popup_is-opened');
}

function closePopup(block) {
    block.classList.remove('popup_is-opened');
}

//Ф-ция добавления информации из input в Popup Profile
function addInformation (evt) { //отменяем отправку формы по умолчанию
    evt.preventDefault();
    profileName.textContent = nameInput.value; //текст в profileName является значением, занесенным в nameInput
    profileJob.textContent = jobInput.value; //текст в profileJob является значением, занесенным в nameJob
    showPopup(popupProfileBlock); // проверяем параметр функцией popUpToggle
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
    templateImg.alt = title;
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
    const templateTitle = popupInputTitle.value;
    const templateImageElement = popupInputImage.value;

    const card = createElementCard(templateTitle, templateImageElement);
    showPopup(popupImage);
    closePopup(popupImage);
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
        image.alt = templateTitle.textContent;
        imageTitle.textContent = templateTitle.textContent;
        showPopup(imagePopup);
    });
}

/// Обработчкики закрытия/открытия Popup-ов ///
openPopupProfileBtn.addEventListener('click', function() {
    showPopup(popupProfileBlock);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

/// Обработчкики закрытия/открытия Popup-ов через кнопку Esc///
document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
        closePopup(popupImage);
        closePopup(popupProfileBlock);
        closePopup(imagePopup);
    }
})

closePopupBtn.addEventListener('click', () => {
    closePopup(popupProfileBlock);
    popupForm.reset();
});

openPopupImageBtn.addEventListener('click', () => showPopup(popupImage)); 

imageCloseButton.addEventListener(('click'), () => closePopup(imagePopup));

closePopupImageBtn.addEventListener('click', () => {
    closePopup(popupImage);
    popupImageForm.reset();
}); 

//закрытие popup через overlay
popUp.forEach((block) => block.addEventListener('click', (evt) => closePopup(evt.target)));

/// Обработчики submit длая Popup-ов /// 
popupForm.addEventListener('submit', addInformation);

popupImageForm.addEventListener('submit', addNewCards);

