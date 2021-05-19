export class Card {
    constructor(data, myId, template, handleCardClick, addLikes, rejectLike, handleFormSubmit, popupDeleteButton) {
        //data - это обьект в котором хранится вся информация о users 
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._owner = data.owner;
        this._template = template; // элемент DOM который содержит в себе элементы для добавления карточки на страничку
        this._myId = myId; // айди номер главного user
        this._handleCardClick = handleCardClick; // функция удаления карточки
        this._addLikes = addLikes; //функция открытия карточки full size
        this._rejectLike = rejectLike; // функция удаления лайка
        this._deletePopup = handleFormSubmit; // функция удаления карточки
        this._popupDeleteButton = popupDeleteButton;// кнопка для удаления карточки
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
        
        this._cardLikesPlace = this._templateElement.querySelector('.element__counter-likes'); // элемент-счетчик лайков
        this._templateDeleteElement = this._templateElement.querySelector('.element__trash'); // кнопка для открытия попапа удаления карточки
        this._templatePic = this._templateElement.querySelector('.element__image'); //элемент хранения карточки
        this._templateTitle = this._templateElement.querySelector('.element__quote'); // элемент хранения записи для фотографии
        this._likeButtomTemplate = this._templateElement.querySelector('.element__button-like'); //элемент-кнопка лайка(сердечко)
        this._templateTitle.textContent = this._name;
        this._templatePic.alt = this._name;
        this._templatePic.src = this._link;
        this._cardLikesPlace.textContent = this._likes.length; // показывает в элементе-счетчике колличество лайков
        if(this._owner._id != this._myId) this._templateDeleteElement.remove(); // убераем элементы-кнопки открытия попапа уделения карточки с чужих картинок
        this._likes.some((user) => {
            if(user._id === this._myId) this._likeButtomTemplate.classList.add('element__button-like_active');// подсвечиваем элементы-лайки, если на них нажали
        });
        this._templatePic.addEventListener('click', () => this._handleCardClick.open(this._templatePic, this._templateTitle)); //открываем фотографию на все окно

        this._deleteElementCard();
        this._addRemoveLikes();

        return this._templateElement;         
    }

    _addRemoveLikes() {
        this._likeButtomTemplate.addEventListener('click', () => { //  добавление/удаление лайка
            if (!this._likeButtomTemplate.classList.contains('element__button-like_active')) {
                this._addLikes(this._id, this); //добавляем свой лайк
                this._likeButtomTemplate.classList.add('element__button-like_active'); // добаляем черное сердечко в лайк(сердечко)
            } else {
                this._rejectLike(this._id, this); //убираем свой лайк
                this._likeButtomTemplate.classList.remove('element__button-like_active');// убираем черное сердечко из лайк(сердечко)
            }
        });
    }

    _deleteElementCard() {//метод удаления карточки 
        this._templateDeleteElement.addEventListener('click', () => {
            document.querySelector('#popup-card-delete').classList.add('popup_is-opened'); // открываем попап удаленя карточки(я не знала как лучше передать)
            this._popupDeleteButton.addEventListener('click', () => {// так как у меня не срабатывал метод setEventListeners() из PopupWithSubmith я переписала его сюда(знаю, что слушать в слушателе - это плохая практика). 
                this._deletePopup(this._id, this._templateElement); 
            })
        });
    }

    countLike(data) {
        this._cardLikesPlace.textContent = data.likes.length;// добавляем/удаляем свой лайк(+1/-1) в элемент-счетчик
    }
}