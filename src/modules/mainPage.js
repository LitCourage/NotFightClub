import {querySelector, showPage, toggleElementVisibilityViaSelector} from "./util.js";
import {stats} from "./characters.js";
import {enemy, player} from "./battle.js";
import {handleSettings} from "./settingsPage.js";
import {handleCharacterPage, updateStats} from "./characterPage.js";

function createFighter(fighter, character, elementQuery) {
    fighter.character = character;
    fighter.element = querySelector(elementQuery);
    for (const stat in stats[character]) {
        fighter[stat] = stats[character][stat];
    }
}

function enterBattle() {
    showPage('.battle')

    const playerCharacter = localStorage.getItem('playerCharacter');
    const enemyCharacter = Object.keys(stats).random();

    createFighter(player, playerCharacter, '.fighter_player');
    createFighter(enemy, enemyCharacter, '.fighter_enemy');

    document.body.style.setProperty('--image-player', `url(src/assets/images/characters/${player.character}.png)`)
    document.body.style.setProperty('--image-enemy', `url(src/assets/images/characters/${enemy.character}.png)`)
    querySelector('.battle-menu__title').innerText = `Choose ${player.attackQuantity} attack zone('s) and ${player.zonesQuantity} defense zone('s)`;
}

export function handleBattleEntry() {
    const startButton = querySelector('.main__start-button');
    const characterButton = querySelector('.main__character-button');
    const settingsButton = querySelector('.main__settings-button');

    startButton.addEventListener('click', enterBattle);
    characterButton.addEventListener('click', () => {
        updateStats()
        showPage('.character')
    });
    settingsButton.addEventListener('click', () => {
        handleSettings();
        showPage('.settings')
    });
}