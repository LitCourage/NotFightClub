import {querySelector, showPage} from "./util.js";

export function handleSettings() {
    const nameInput = querySelector('.settings__name-input')
    const saveButton = querySelector('.settings__save-button')

    nameInput.placeholder = localStorage.getItem('playerName');

    saveButton.addEventListener('click', () => {
        localStorage.setItem('playerName', nameInput.value);
        showPage('.main')
    })
}