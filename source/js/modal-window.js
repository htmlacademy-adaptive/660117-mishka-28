const modalWindow = document.querySelector('.modal-window');
const openButton = document.querySelector('.modal-button');

openButton.addEventListener('click', () => modalWindow.classList.add('modal-window--opened'));

modalWindow.addEventListener('click', (evt) => {
  if (!evt.target.closest('.modal-window__container')) {
    modalWindow.classList.remove('modal-window--opened');
  }
});
