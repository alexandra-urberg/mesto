export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector; // ссылка на определенный попап
        this._closeEscEvent = this._handleEscClose.bind(this);
    }

    open() { // метод открытия popup окна 
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._closeEscEvent);
    }
    
    close() { // метод закрытия popup окна 
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._closeEscEvent);

        this._removeEventListeners();
    }

    _handleEscClose = (event) => { /// метод закрытие popup по нажатию кнопки Esc (почему нужно навешивать его на открытие и закрытие)
        if(event.key === "Escape") this.close();
    }

    setEventListeners() {//метод для закртия popup по кнопке и overlay 
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')) this.close();
        })  
    }
    _removeEventListeners() { //метод для снятия слушателей после закртия попапов
        this._popup.removeEventListener('click', this.setEventListeners);
        this._popup.removeEventListener('keydown', this._closeEscEvent);
    }
}