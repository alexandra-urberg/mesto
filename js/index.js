const openPopupProfileBtn = document.querySelector('#popup-profile__open-button'); //кнопка, вызывающая popup окно
const popupProfileBlock = document.querySelector('#popup-profile'); //блок popup
const closePopupBtn = popupProfileBlock.querySelector('.popup__button-cross'); //закрывющая кнопка/крест блок popup
const openPopupImageBtn = document.querySelector('#popup-image__open-button'); //кнопка открывающая блок popup для добавления фотографий
const popupImage = document.querySelector('#popup-image'); // блок popup для добавления фотографий
const closePopupImageBtn = popupImage.querySelector('.popup__button-crossik'); // кнопка закрывающая блок popup для добавления фотографий
const profileName = document.querySelector('.profile__name'); // место ввода имени
const profileJob = document.querySelector('.profile__job'); // место вводы "работы"
const nameInput = document.querySelector('#input-name'); //input "name"
const jobInput = document.querySelector('#input-job'); // input "job"
const popupForm = document.querySelector('.popup-profile__form'); //форма блока PopUp

// Ф-ция открытия/закрытия popup окна
function popUpToggle(cucember) {
    if (cucember.classList.contains('popup_is-opened') === false) { //проверяем наличие класса 'popup_is-opened'
        if (cucember === popupProfileBlock) { //проверяем является ли параметр переменной popupProfileBlock
            cucember.classList.add('popup_is-opened'); //добавляем класс 'popup_is-opened' если его нет
            nameInput.value = profileName.textContent; //значения по умолчанию input-name являются текстом из profileName
            jobInput.value = profileJob.textContent; //значения по умолчанию input-job являются текстом из profileJob
        } else {
            cucember.classList.add('popup_is-opened');
        }

    } else {
        cucember.classList.remove('popup_is-opened'); // удаляем класс 'popup_is-opened' если он есть
    }
}

openPopupProfileBtn.addEventListener('click', function () {
    popUpToggle(popupProfileBlock);
});

closePopupBtn.addEventListener('click', function () {
    popUpToggle(popupProfileBlock);
});

openPopupImageBtn.addEventListener('click', function () {
    popUpToggle(popupImage);
});

closePopupImageBtn.addEventListener('click', function () {
    popUpToggle(popupImage);
});

//Ф-ция добавления информации из input 
function addInformation (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value; //текст в profileName является значением, занесенным в nameInput
    profileJob.textContent = jobInput.value; //текст в profileJob является значением, занесенным в nameJob
    popUpToggle(popupProfileBlock); // проверяем параметр функцией popUpToggle
}

popupForm.addEventListener('submit', addInformation);

const initialCards = [
    { name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    { name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    { name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    { name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    { name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    { name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; // вводные данные для elements

const popupImageContainer = document.querySelector('.elements__container'); // переменная в которую будем добавлять карточки
const popupImageForm = document.querySelector('.popup-image__form'); // переменная куда будет вноиться информаци о картинках и ссылки
const templateImage = document.querySelector('.element__template'); // блок template

//Ф-ция создающиая карты с фотографиями
function createElementCard(item) {
    const newItem = templateImage.content.cloneNode(true); //клонируем элементы из  блока teamplate
    const titleTeamplate = newItem.querySelector('.element__quote'); //находим в template элемент где будем сохранять имена названий фотографий
    //const imageTeamplate = newItem.querySelector('.element__image'); //находим в template элемент где будем сохранять фотографии

    titleTeamplate.textContent = item.titleTeamplate; //заносим в title содержимое  item
    //imageTeamplate.src = item.imageTeamplate; // заносим линк из Item  в src image

    return newItem;    
}


function renderList() {
    const result = initialCards.map(createElementCard);

    popupImageContainer.append(...result);
}

//function addTaskFormListener(evt) {
    //evt.preventDefault();
    //const popupInputTitle = popupImageForm.querySelector('.popup__input-title');
    //const popupInputImage = popupImageForm.querySelector('.popup__input-img');
   // const popupImgTitle = popupInputTitle.value;
    //const imgInput = popupInputImage.valur;

   // const newTask = createElementCard({name: popupImgTitle});
    //popupImageContainer.prepend(newTask);

    //const newImg = createElementCard({link: imgInput});
    //popupImageContainer.prepend(newImg);

    //popupInputTitle.value = '';
    //popupInputImage.value = '';   
//}

renderList();
//popupImageForm.addEventListener('submit', addTaskFormListener);

