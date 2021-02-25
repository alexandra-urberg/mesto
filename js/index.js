let openButton = document.querySelector('#popup__open-button'); //кнопка, вызывающая popup окно
let popup = document.querySelector('.popup'); // блок popup
let closeCross = document.querySelector('.popup__close-button'); //закрывющая кнопка//крест блок popup
let profileName = document.querySelector('.profile__name'); // место ввода имени
let profileJob = document.querySelector('.profile__job'); // место вводы "работы"
let nameInput = document.querySelector('#input-name'); //input "name"
let jobInput = document.querySelector('#input-job'); // input "job"
let popupForm = document.querySelector('.popup__form-container'); //форма блока PopUp

// Ф-ция открытия/закрытия popup окна
function showPopup() {
    popup.classList.add('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

openButton.addEventListener('click', showPopup); 

function closePopup() {
    popup.classList.remove('popup_is-opened');
}

closeCross.addEventListener('click', closePopup);


//Ф-ция добавления информации из input 
function addInformation (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}

popupForm.addEventListener('submit', addInformation);
