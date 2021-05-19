export default class Section {
    constructor(renderer, popupImageContainer) {
        this._renderer = renderer;
        this._container = popupImageContainer; //ссылка на переменную в которую будем добавлять карточки
    }
    
    addItem(element) { //метод добавления карточку в начало списка
        this._container.prepend(element);
    }

    renderItems(cards) {
        cards.forEach(item => this._renderer(item));
    };
}