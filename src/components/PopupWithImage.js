import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.image'); // увеличенная фотография
        this._imageTitle = this._popup.querySelector('.image-tittle'); // подпись фотографии
    }

    open(link, title) { // метод втавки картинки с подписью в попап с полноразмерной фотографией
        super.open();
        this._image.alt = title.textContent;
        this._image.src = link.src;
        this._imageTitle.textContent = title.textContent; 
    }

    close() {
        super.close();
    }
}