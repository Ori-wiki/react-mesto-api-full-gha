export const addLoading = (button) => {
  button.textContent = "Сохранение";
  button.classList.add("popup__button-save_loading");
};

export const removeLoading = (button) => {
  button.classList.remove("popup__button-save_loading");
  button.textContent = "Сохранить";
};

export const BASE_URL = 'http://api.backend-mesto.nomoredomains.rocks/'
// export const BASE_URL = 'https://mesto.nomoreparties.co/v1/cohort-54/'
