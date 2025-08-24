import {querySelector, toggleElementVisibility} from "./util.js";
import {stats} from "./characters.js";
import {enemy, player} from "./battle.js";

function createFighter(fighter, character, elementQuery) {
    fighter.character = character;
    fighter.element = querySelector(elementQuery);
    for (const stat in stats[character]) {
        fighter[stat] = stats[character][stat];
    }
}

function enterBattle() {
    toggleElementVisibility('.battle', 'flex');
    toggleElementVisibility('.main');

    createFighter(player, 'v1', '.fighter_player');
    createFighter(enemy, 'gabriel', '.fighter_enemy');

    document.body.style.setProperty('--image-player', `url(src/assets/images/characters/${player.character}.png)`)
    document.body.style.setProperty('--image-enemy', `url(src/assets/images/characters/${enemy.character}.png)`)
}

export function handleBattleEntry() {
    const button = querySelector('.main__start-button');
    button.addEventListener('click', enterBattle);

    // TEST
    enterBattle()
}