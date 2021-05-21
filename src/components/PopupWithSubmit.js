import Popup from './Popup.js';

export default class PopupWithSubmith extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;//функция удаления карточк
        this._button = this._popup.querySelector('.popup-card-delete__btn'); //кнопка для удаления карточки
    }
    
    setEventListeners() { //метод удаляющий карточку полсе нажатия на "да"
        super.setEventListeners();
        this._button.addEventListener("click", () =>
          this._handleFormSubmit(this.id, this.card)
        );
    }  

    open(id, card) { //метод открытия карточки 
        super.open();
        this.id = id;
        this.card = card;
    }
}