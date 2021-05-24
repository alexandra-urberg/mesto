export class Card {
  constructor(
    data, //data - это обьект в котором хранится вся информация о users
    myId,
    template,
    handleCardClick,
    addLikes,
    rejectLike,
    onDeleteBtnClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._template = template; // элемент DOM который содержит в себе элементы для добавления карточки на страничку
    this._myId = myId._id; // айди номер главного user
    this._handleCardClick = handleCardClick; // функция удаления карточки
    this._addLikes = addLikes; //функция открытия карточки full size
    this._rejectLike = rejectLike; // функция удаления лайка
    this._deletePopup = onDeleteBtnClick; // функция удаления карточки
  }

  _getTemplate() { //клонируем элементы из  блока teamplate
    const newItem = this._template.content
      .querySelector(".template__card")
      .cloneNode(true);
    return newItem;
  }

  createElementCard() {
    this._templateElement = this._getTemplate(); //метод добавления данных для карточки

    this._cardLikesPlace = this._templateElement.querySelector( //элемент-счетчик лайков
      ".element__counter-likes"
    ); 
    this._templateDeleteElement =
      this._templateElement.querySelector(".element__trash"); // кнопка для открытия попапа удаления карточки
    this._templatePic = this._templateElement.querySelector(".element__image"); //элемент хранения карточки
    this._templateTitle =
      this._templateElement.querySelector(".element__quote"); // элемент хранения записи для фотографии
    this._likeButtomTemplate = this._templateElement.querySelector( //элемент-кнопка лайка(сердечко)
      ".element__button-like"
    );
    this._templateTitle.textContent = this._name;
    this._templatePic.alt = this._name;
    this._templatePic.src = this._link;
    this._cardLikesPlace.textContent = this._likes.length; // показывает в элементе-счетчике колличество лайков

    if (this._owner._id != this._myId) this._templateDeleteElement.remove(); // убераем элементы-кнопки открытия попапа уделения карточки с чужих картинок

    this._likes.some((user) => {
      if (user._id === this._myId)
        this._likeButtomTemplate.classList.add("element__button-like_active"); // подсвечиваем элементы-лайки, если на них нажали
    });
    this._templatePic.addEventListener("click", () => //открываем фотографию на все окно
      this._handleCardClick.open(this._templatePic, this._templateTitle)
    );

    this._deleteElementCard();
    this._addRemoveLikes();

    return this._templateElement;
  }

  _addRemoveLikes() { //метод добавление/удаление лайка
    this._likeButtomTemplate.addEventListener("click", () => {
      if (
        !this._likeButtomTemplate.classList.contains(
          "element__button-like_active"
        )
      ) {
        this._addLikes(this._id, this)
      } else {
        this._rejectLike(this._id, this)//убираем свой лайк
      }
    });
  }

  addRemoveBlackHearts() {
      if (
        !this._likeButtomTemplate.classList.contains(
          "element__button-like_active"
        )
      ) {
        this._likeButtomTemplate.classList.add(// добаляем черное сердечко в лайк(сердечко)
          'element__button-like_active'
        );
      } else {
        this._likeButtomTemplate.classList.remove(// добаляем черное сердечко в лайк(сердечко)
          'element__button-like_active'
        );
      }
  }

  _deleteElementCard() {//метод удаления карточки
    this._templateDeleteElement.addEventListener("click", () => {
      this._deletePopup(this._id, this._templateElement);
    });
  }

  countLike(data) {
    this._cardLikesPlace.textContent = data.likes.length; //добавляем/удаляем свой лайк(+1/-1) в элемент-счетчик
  }
    
}
  
  