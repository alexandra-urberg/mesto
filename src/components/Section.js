export default class Section {
    constructor({items, renderer}, popupImageContainer) {
        this._items = items; // ссылка на обьект
        this._renderer = renderer; //ссылка на функцию, которая отвечает за создание и отрисовку данных на странице
        this._сontainer = popupImageContainer; //ссылка на переменную в которую будем добавлять карточки
    }

    addItem(element) { //метод добавляющий карточки в DOM
        this._сontainer.prepend(element);
    }

    renderItems() { //метод добавляющий карточки на страничку
        this._items.forEach(item => this._renderer(item));
    }
}