import {stats} from "./characters.js";
import {querySelector, showPage} from "./util.js";

function changePlayerCharacter(character) {
    localStorage.setItem('playerCharacter', character);
    querySelector('.character__current-character-image').style.backgroundImage = `url(src/assets/images/characters/${character}.png)`;
}

export function updateStats() {
    const wins = querySelector('.character__stats-item_wins');
    const loses = querySelector('.character__stats-item_loses');
    const name = querySelector('.character__stats-item_name');

    wins.innerText = `wins: ${localStorage.getItem('wins')}`;
    loses.innerText = `loses: ${localStorage.getItem('loses')}`;
    name.innerText = localStorage.getItem('playerName');
}

export function handleCharacterPage() {
    const characterSelect = querySelector('.character__select');
    const characters = Object.keys(stats)
    const exitButton = querySelector('.character__exit-button');


    characters.forEach(character => {
        const characterSelectItem = document.createElement('div');
        const characterSelectImage = document.createElement('div');

        characterSelectItem.classList.add('character__character-box');
        characterSelectItem.classList.add('character__select-item');
        characterSelectItem.classList.add('ui-element');
        characterSelectItem.setAttribute('character', character);
        characterSelectImage.className = 'character__character-image';
        characterSelectImage.style.backgroundImage = `url(src/assets/images/characters/${character}.png)`;

        characterSelectItem.addEventListener('click', (event) => {
            changePlayerCharacter(event.currentTarget.getAttribute('character'));
        });

        characterSelectItem.appendChild(characterSelectImage);
        characterSelect.appendChild(characterSelectItem);
    })

    querySelector('.character__stats-item_name').innerText = localStorage.getItem('playerName');
    querySelector('.character__current-character-image').style.backgroundImage = `url(src/assets/images/characters/${localStorage.getItem('playerCharacter')}.png)`

    exitButton.addEventListener('click', () => {showPage('.main')})

    updateStats();
}