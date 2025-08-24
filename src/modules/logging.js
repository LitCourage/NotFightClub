import {querySelector} from "./util.js";

function logMessage(text) {
    const logContainer = querySelector('.log__container');
    const message = document.createElement('div');

    message.className = 'log__message';
    message.innerHTML = text;

    logContainer.appendChild(message);
}

export function logAttack(attacker, defender, damage, zone, isCritical=false, isDefended=false, attackerName=attacker.name, defenderName=defender.name) {
    let message;

    if (isCritical) {
        message = `${attackerName} <span class="log__highlight_red">attacks</span> ${defenderName} with a <span class="log__highlight_yellow">critical hit</span> to the <span class="log__highlight_white">${zone}</span> and deals <span class="log__highlight_red">${damage} damage</span>`;
    } else if (isDefended) {
        message = `${defenderName} <span class="log__highlight_blue">defends</span> ${attackerName}'s attack to the <span class="log__highlight_white">${zone}</span>`;
    } else {
        message = `${attackerName} <span class="log__highlight_red">attacks</span> ${defenderName} to the <span class="log__highlight_white">${zone}</span> and deals <span class="log__highlight_red">${damage} damage</span>`;
    }

    logMessage(message);
}