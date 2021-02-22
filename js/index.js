
let openButton = document.querySelector('#popup__open-button'); //кнопка, вызывающая popup окно
let popup = document.querySelector('.popup'); // блок popup
let closeCross = document.querySelector('.close-button'); //закрывющая кнопка//крест блок popup
let addButton = document.querySelector('.popup__save-button'); //кнопка, сохраняющая информацию из input

// Ф-ция открытия/закрытия popup окна
function showPopup() {
    popup.classList.add('popup_is-opened');
}

openButton.addEventListener('click', showPopup); 

function closePopup() {
    popup.classList.remove('popup_is-opened');
}

closeCross.addEventListener('click', closePopup);


//Ф-ция добавления информации из input 
function addInformation(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('#input-name').value;
    document.querySelector('.profile__name').textContent = nameInput;

    let jobInput = document.querySelector('#input-job').value;
    document.querySelector('.profile__job').textContent = jobInput;
}

addButton.addEventListener('click', addInformation);
