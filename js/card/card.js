export class Card {
    constructor(name, link, openFullSizeImage, template) {
        this._name = name;
        this._link = link;
        this._openFullSizeImage = openFullSizeImage;
        this._template = template;
    }

    createElementCard() {
        const newItem = this._template
        .content
        .querySelector('.template__card')
        .cloneNode(true); //клонируем элементы из  блока teamplate

        this._templatePic = newItem.querySelector('.element__image');
        this._templateTitle = newItem.querySelector('.element__quote');
        this._templateTitle.textContent = this._name;
        this._templatePic.alt = this._link;
        this._templatePic.src = this._link;
        this._deleteElementCard(newItem);
        this._addLike(newItem);
        this._openFullSizeImage(newItem);
                
        return newItem;
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

