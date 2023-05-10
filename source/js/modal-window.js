let modalWindow = document.querySelector('.modal-window');
let openButton = document.querySelector('.modal-button');
let closeButton = document.querySelector('.modal-window__close-button');

openButton.addEventListener('click', function () {
    modalWindow.classList.add('modal-window--opened');
  });

closeButton.addEventListener('click', function () {
  modalWindow.classList.remove('modal-window--opened');
});
