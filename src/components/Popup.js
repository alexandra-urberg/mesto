export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector; // ссылка на определенный попап
    }

    open() { // метод открытия popup окна 
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    close() { // метод закрытия popup окна 
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //_handleEscClose = (event) => { /// метод закрытие popup по нажатию кнопки Esc (почему нужно навешивать его на открытие и закрытие)
       // if(event.key === "Escape") {
           // const deleteClass = document.querySelector('.popup_is-opened');
            //this.close(deleteClass);
        //}
   // }

    setEventListeners() {//метод для закртия popup по кнопке и overlay 
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            } 
            if(evt.key === "Escape") {
                const deleteClass = document.querySelector('.popup_is-opened');
                this.close(deleteClass);
            }
        })  
    }
}