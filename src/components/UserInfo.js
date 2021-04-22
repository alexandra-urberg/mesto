export default class UserInfo {
    constructor({name, job}) {
        this._elementname = document.querySelector(name);
        this._elementinformation = document.querySelector(job);
    }

    getUserInfo() { //метод получает информацию о пользователе
        return {
            name: this._elementname.textContent,
            job: this._elementinformation.textContent
        }
    }

    setUserInfo(data) { //метод принимает новые данные пользователя и добавляет их на страницу
        this._elementname.textContent = data.name;
        this._elementinformation.textContent = data.job;
    }
}
