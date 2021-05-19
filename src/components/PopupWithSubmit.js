import Popup from './Popup.js';

export default class PopupWithSubmith extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;//функция удаления карточк
        this._button = this._popup.querySelector('.popup-card-delete__btn'); //кнопка для submith
    }
    
    setEventListeners() {
        super.setEventListeners();
        //this._button.addEventListener('click', () => this._handleFormSubmit());//метод удаляющий карточку полсе нажатия на "да"(он у меня не работает :C )
    }  
}