const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } 
  else {
    hideInputError(formElement, inputElement, config);
  }
};

function hasInvalidInput(inputList) {
  return (
    inputList.some((itm)=>{
      return (!itm.validity.valid)
    })
  )
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) 
    buttonElement.classList.add(config.inactiveButtonClass)
  else 
    buttonElement.classList.remove(config.inactiveButtonClass)
  
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

export function clearValidation(dialog, config) {
  const form = dialog.querySelector(config.formSelector);
  form.querySelector(config.submitButtonSelector).classList.add(config.inactiveButtonClass);
  const errors = dialog.querySelectorAll(config.errorSelector);
  errors.forEach(element => {element.textContent = ''});  
}
  
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config)
  });
}