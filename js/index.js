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

const popUps = document.querySelectorAll('.popup'); //блоки popup
/// Popup Profile ///
const openPopupProfileBtn = document.querySelector('#popup-profile__open-button'); //кнопка, вызывающая Popup Profile окно
const popupProfileBlock = document.querySelector('#popup-profile'); //блок Popup Profile
const closePopupBtn = popupProfileBlock.querySelector('.popup__button-cross'); //закрывющая кнопка/крест блок Popup Profile
const profileName = document.querySelector('.profile__name'); // место ввода имени
const profileJob = document.querySelector('.profile__job'); // место вводы "работы"
const nameInput = document.querySelector('#input-name'); //input "name"
const jobInput = document.querySelector('#input-job'); // input "job"
const popupForm = document.querySelector('#popup__form'); //форма блока PopUp Profile
const popupFormsubmitButton = popupProfileBlock.querySelector('.popup__submit-button'); //кнопка submith всех popup
// Popup Image ///
const openPopupImageBtn = document.querySelector('#popup-image__open-button'); //кнопка открывающая блок Popup Image
const popupImage = document.querySelector('#popup-image'); // блок Popup Image
const closePopupImageBtn = popupImage.querySelector('.popup__button-crossik'); // кнопка закрывающая блок Popup Image
const popupInputTitle = document.querySelector('#popup__input-title');
const popupInputImage = document.querySelector('#popup__input-img');
const popupImageForm = document.querySelector('#popup__image-form'); // переменная куда будет вноиться информаци о картинках и ссылки
const submitButton = popupImage.querySelector('#popup-image__submit-btn'); //кнопка submith всех popup
/// Template ///
const popupImageContainer = document.querySelector('#template__container'); // переменная в которую будем добавлять карточки
const templateImage = document.querySelector('#template'); // блок template
/// Popup image ///
const imagePopup = document.querySelector('#image'); // блок image (увеличение фотографий)
const image = imagePopup.querySelector('.image'); // увеличенная фотография
const imageTitle = imagePopup.querySelector('.image-tittle'); // подпись фотографии
const imageCloseButton = imagePopup.querySelector('.popup__image-button'); //кнопка закрывающая фотографию

/// Закрытие popup по нажатию кнопки Esc ///
const closeByEsc = (event) => {
    const deleteClass = document.querySelector('.popup_is-opened');
    if(event.key === "Escape") {
        closePopup(deleteClass);
    }   
}

// Ф-ция открытия/закрытия popup окна ///
function showPopup(block) {
    block.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(block) {
    block.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

//Универсальная ф-ция для закртия popup по кнопке и overlay
popUps.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup)
        }
        if(evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

/// Ф-ция добавления информации из input в Popup Profile ///
function addInformation (evt) {
    evt.preventDefault(); ////отменяем отправку формы по умолчанию
    profileName.textContent = nameInput.value; //текст в profileName является значением, занесенным в nameInput
    profileJob.textContent = jobInput.value; //текст в profileJob является значением, занесенным в nameJob
    closePopup(popupProfileBlock); // проверяем параметр функцией popUpToggle
    popupFormsubmitButton.classList.add('popup__button_disabled'); //вводим кнопку submit в состояние disabled после обнуления 
    popupFormsubmitButton.setAttribute('disabled', true); //вводим кнопку submit в состояние disabled после обнуления 
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
    evt.preventDefault()
    const card = createElementCard(popupInputTitle.value, popupInputImage.value);
    addElementCard(card);
    closePopup(popupImage);
    popupImageForm.reset()
    submitButton.classList.add('popup__button_disabled'); //вводим кнопку submit в состояние disabled после обнуления 
    submitButton.setAttribute('disabled', true); //вводим кнопку submit в состояние disabled после обнуления 
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

openPopupImageBtn.addEventListener('click', () => showPopup(popupImage)); 

/// Обработчики submit длая Popup-ов /// 
popupForm.addEventListener('submit', addInformation);

popupImageForm.addEventListener('submit', addNewCards);

