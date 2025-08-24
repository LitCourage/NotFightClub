import {querySelector, querySelectorAll} from "./util.js";
import {logAttack, logMessage} from "./logging.js";
import {zones} from "./characters.js";

export const player = {}
export const enemy = {}
let canAttack = true;

function attack(attacker, defender, attackZones, defendZones, attackerName=attacker.name, defenderName=defender.name) {
    for (const attackZone of attackZones) {
        const isCritical = Math.random() < 0.25;
        const isDefended =defendZones.includes(attackZone)

        if (isCritical) {
            changeHealth(defender, attacker.attack * 1.5);
        } else if (!isDefended) {
            changeHealth(defender, attacker.attack);
        }

        logAttack(attacker, defender, attacker.attack, attackZone, isCritical, isDefended, attackerName, defenderName);
    }
}

function attackNPC(zonesAttackChecked) {
    const attackZones = [...zonesAttackChecked].reduce((acc, el) => {
        acc.push(el.value)
        return acc
    }, [])

    const defendZones = []
    const zonesDefense = [...zones]

    for (let i = 0; i < enemy.zonesQuantity; i++) {
        const zone = zonesDefense.random()
        zonesDefense.splice(zonesDefense.indexOf(zone), 1)
        defendZones.push(zone)
    }

    const name = localStorage.getItem('playerName')

    attack(player, enemy, attackZones, defendZones, name);
}

function attackPlayer(zonesDefenseChecked) {
    const attackZones = []
    const zonesAttack = [...zones]

    for (let i = 0; i < enemy.attackQuantity; i++) {
        const zone = zonesAttack.random()
        zonesAttack.splice(zonesAttack.indexOf(zone), 1)
        attackZones.push(zone)
    }

    const defendZones = [...zonesDefenseChecked].reduce((acc, el) => {
        acc.push(el.value)
        return acc
    }, [])

    const name = localStorage.getItem('playerName')

    attack(enemy, player, attackZones, defendZones, enemy.name, name);
}

function changeHealth(fighter, attack) {
    const healthbar = fighter.element.querySelector('.fighter__healthbar');

    fighter.health -= attack;

    const percent = fighter.health / fighter.maxHealth * 100;

    healthbar.style.background = `linear-gradient(to right, var(--color-healthbar-red) ${percent}%, transparent ${percent}%)`
}

export function handleBattleControls() {
    const zonesAttack = querySelectorAll('.battle-menu__zones_attack .battle-menu__zone-input')
    const zonesDefense = querySelectorAll('.battle-menu__zones_defense .battle-menu__zone-input')
    const attackButton = querySelector('.battle-menu__attack-button')

    const zonesAttackChecked = [];
    const zonesDefenseChecked = [];

    function checkIfCanAttack() {
        if (canAttack && zonesAttackChecked.length === player.attackQuantity && zonesDefenseChecked.length === player.zonesQuantity) {
            document.body.style.setProperty('--color-attack-button', '#ff6060')
            document.body.style.setProperty('--color-attack-button-transparent', 'rgba(255, 96, 96, 0.1)')
            return true;
        }
        document.body.style.setProperty('--color-attack-button', '#767676')
        document.body.style.setProperty('--color-attack-button-transparent', 'rgba(118,118,118,0.1)')
        return false;
    }

    function chooseZone(event, zonesChecked, max=1) {
        const input = event.target;

        if (input.checked) {
            if (zonesChecked.length > max - 1) {
                zonesChecked[0].checked = false;
                zonesChecked.splice(0, 1);
            }
            zonesChecked.push(input)
        } else {
            zonesChecked.splice(zonesChecked.indexOf(input), 1);
        }

        checkIfCanAttack()
    }

    function handleAttack() {
        if (checkIfCanAttack()) {
            attackNPC(zonesAttackChecked)
            canAttack = false;
            checkIfCanAttack()
            if (enemy.health <= 0) {
                canAttack = false
                checkIfCanAttack()
                logMessage('You won!')
                const wins = parseInt(localStorage.getItem('wins'))
                localStorage.setItem('wins', `${wins + 1}`)
                return
            }
            setTimeout(() => {
                attackPlayer(zonesDefenseChecked)
                if (player.health <= 0) {
                    canAttack = false
                    checkIfCanAttack()
                    logMessage('You lost!')
                    const loses = parseInt(localStorage.getItem('loses'))
                    localStorage.setItem('loses', `${loses + 1}`)
                    return
                }
                setTimeout(() => {
                    canAttack = true
                    checkIfCanAttack()
                }, 500)
            }, 1500)
        }
    }

    zonesAttack.forEach(zone => zone.addEventListener('change', event => {chooseZone(event, zonesAttackChecked, player.attackQuantity)}))
    zonesDefense.forEach(zone => zone.addEventListener('change', event => {chooseZone(event, zonesDefenseChecked, player.zonesQuantity)}))
    attackButton.addEventListener('click', handleAttack)

    checkIfCanAttack()
}