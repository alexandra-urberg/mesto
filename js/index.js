import { Card } from './card/card.js'
import { FormValidator } from './formvalidator.js'
import { initialCards, validSelectors} from './utilites.js'

const popUps = document.querySelectorAll('.popup'); //блоки popup
/// Popup Profile ///
const openPopupProfileBtn = document.querySelector('#popup-profile__open-button'); //кнопка, вызывающая Popup Profile окно
const popupProfileBlock = document.querySelector('#popup-profile'); //блок Popup Profile
const profileName = document.querySelector('.profile__name'); // место ввода имени
const profileJob = document.querySelector('.profile__job'); // место вводы "работы"
const nameInput = document.querySelector('#input-name'); //input "name"
const jobInput = document.querySelector('#input-job'); // input "job"
const popupForm = document.querySelector('#popup__form'); //форма блока PopUp Profile
// Popup Image ///
const openPopupImageBtn = document.querySelector('#popup-image__open-button'); //кнопка открывающая блок Popup Image
const popupImage = document.querySelector('#popup-image'); // блок Popup Image
const popupInputTitle = document.querySelector('#popup__input-title'); // input для сохраниени описания картинки
const popupInputImage = document.querySelector('#popup__input-img'); // input для сохранения ссылки на картинку
const popupImageForm = document.querySelector('#popup__image-form'); // переменная куда будет вноиться информаци о картинках и ссылки
/// Template ///
const template = document.querySelector('#template'); //template 
const popupImageContainer = document.querySelector('#template__container'); // переменная в которую будем добавлять карточки
/// Full-size picture ///
const imagePopup = document.querySelector('#image'); // блок image (увеличение фотографий)
const image = imagePopup.querySelector('.image'); // увеличенная фотография
const imageTitle = imagePopup.querySelector('.image-tittle'); // подпись фотографии

// Вызывыем класс FormValidator с параметрами форм доя popupProfile и popupImage ///
const validNewCards = new FormValidator(validSelectors, popupImageForm); 
const validProfileBlock = new FormValidator(validSelectors, popupForm);
validNewCards.enableValidation();
validProfileBlock.enableValidation();

const showPopup = (block) => { // Ф-ция открытия popup окна ///
    block.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

const closePopup = (block) => { // Ф-ция закрытия popup окна ///
    block.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

popUps.forEach((popup) => { //Универсальная ф-ция для закртия popup по кнопке и overlay
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup_is-opened')) {
            closePopup(popup)
        }
        if(evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})

const closeByEsc = (event) => { /// Закрытие popup по нажатию кнопки Esc ///
    if(event.key === "Escape") {
        const deleteClass = document.querySelector('.popup_is-opened');
        closePopup(deleteClass);
    }   
}

const addInformation = (evt) => { /// Ф-ция добавления информации из input в Popup Profile ///
    evt.preventDefault(); ////отменяем отправку формы по умолчанию
    profileName.textContent = nameInput.value; //текст в profileName является значением, занесенным в nameInput
    profileJob.textContent = jobInput.value; //текст в profileJob является значением, занесенным в nameJob
    closePopup(popupProfileBlock); // проверяем параметр функцией popUpToggle
    validProfileBlock.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления 
}

const addElementCard = (element) => { /// Добавление карточки в DOM ///
    popupImageContainer.prepend(element);
}

const createImageCard = (title, image) => new Card(title, image, openFullSizeImage, template).createElementCard(); //переменная с присвоенным экземпляром класса Card

const createInitCards = () => { /// функция создающая карточки ///
    initialCards.forEach((item) => {
        const card = createImageCard(item.name, item.link);
        addElementCard(card); 
    });
}

createInitCards();

const addNewCards = (evt) => { /// Добавление новой карточки ///
    evt.preventDefault();
    const card = createImageCard(popupInputTitle.value, popupInputImage.value);
    addElementCard(card);
    closePopup(popupImage);
    popupImageForm.reset(); // обнуляем значения формы после добавления карточки
    validNewCards.disableSubmitButton(); //кнопка submit в состояние disabled после обнуления 
}

 function openFullSizeImage(link, title) {
    image.alt = title.textContent;
    image.src = link.src;
    imageTitle.textContent = title.textContent;
    this._showPopup(imagePopup);
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

