export class Card {
    constructor(data, template, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;

    }

    _getTemplate() {  //клонируем элементы из  блока teamplate
        const newItem = this._template
        .content
        .querySelector('.template__card')
        .cloneNode(true);
        return newItem;
    }

    createElementCard() { //метод добавления данных для карточки
        this._templateElement = this._getTemplate();

        this._templatePic = this._templateElement.querySelector('.element__image');
        this._templateTitle = this._templateElement.querySelector('.element__quote');
        this._templateTitle.textContent = this._name;
        this._templatePic.alt = this._name;
        this._templatePic.src = this._link;
        this._templatePic.addEventListener('click', () => this._handleCardClick.open(this._templatePic, this._templateTitle)); //открываем фотографию на все окно
        this._deleteElementCard(this._templateElement);
        this._addLike(this._templateElement);

        return this._templateElement;         
    }

    _deleteElementCard(element) {  /// метод удаления карточек ///
        const deleteButton = element.querySelector('.element__trash');
        deleteButton.addEventListener('click', () => element.remove());
    }
    
    _addLike(element) {  /// метод для like-button ///
        const likeButtomTemplate = element.querySelector('.element__button-like');
        likeButtomTemplate.addEventListener('click', () => likeButtomTemplate.classList.toggle('element__button-like_active'));
    }
}

