import {querySelector, toggleElementVisibility} from "./util.js";

export function handleRegistrationForm() {
    const input = querySelector('.registry__name-input');
    const button = querySelector('.registry__submit');

    function enterMainPage(event) {
        event.preventDefault();
        const name = input.value;

        localStorage.setItem('playerName', name);

        toggleElementVisibility('.main', 'flex');
        toggleElementVisibility('.registry');
    }

    button.addEventListener('click', event => enterMainPage(event));
}