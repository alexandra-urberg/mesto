import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submithFormHandler}) {
        super(popupSelector);
        this._submithFormHandler = submithFormHandler; //ссылка на обработчик сабмита формы
        this._form = this._popup.querySelector('.popup__form-container'); //ссылка на форму определенного попапа
        this._sbmtButton = this._form.querySelector('.popup__save-button'); //кнопка сабмита/сохранения/подтверждения в любом попапе
        this._button = this._sbmtButton.textContent;
    }

    _getInputValues() {//метод получения данных из input 
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {}; // создаём пустой объект
        this._inputList.forEach(input => this._formValues[input.name] = input.value); // добавляем в этот объект значения всех полей
        
        return this._formValues;
    }

    apploadInformation(isLoading) { //метод изменения текста на кнопках "создать/сохранить" при загрузке фотографий и информации
        if(isLoading) this._sbmtButton.textContent = 'Сохранение...';
        else this._sbmtButton.textContent = this._button;
    }

    setEventListeners() { // теперь еще добавляет обработчик сабмита формы.
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.apploadInformation(true);
            this._submithFormHandler(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset(); // сбрасывание формы
    }
}
