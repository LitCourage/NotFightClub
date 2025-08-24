import {disableAllPagesVisibility, querySelector, showPage, toggleElementVisibilityViaSelector} from "./util.js";

export function handleRegistrationForm() {
    const input = querySelector('.registry__name-input');
    const button = querySelector('.registry__submit');

    function enterMainPage(event) {
        event.preventDefault();
        const name = input.value;

        localStorage.setItem('playerName', name);

        showPage('.main');
    }

    button.addEventListener('click', event => enterMainPage(event));
}