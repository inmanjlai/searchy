const informationButton = document.querySelector('form i#info');
const dialog = document.querySelector('dialog')

informationButton.addEventListener('click', (e) => {
    dialog.showModal();
})