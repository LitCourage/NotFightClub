import './styles/style.css';
import './styles/global.css';
import {handleRegistrationForm} from './modules/registryPage.js';
import {handleBattleEntry} from "./modules/mainPage.js";
import {handleBattleControls} from "./modules/battle.js";
import {setLocalStorageDefault, showPage, toggleElementVisibilityViaSelector} from "./modules/util.js";
import {handleCharacterPage} from "./modules/characterPage.js";
import {handleSettings} from "./modules/settingsPage.js";

handleRegistrationForm();
handleBattleEntry();
handleBattleControls();
handleCharacterPage();
handleSettings();

setLocalStorageDefault('playerCharacter', 'v1');
setLocalStorageDefault('wins', '0');
setLocalStorageDefault('loses', '0');

// localStorage.clear();

showPage(localStorage.getItem('playerName') ? '.main' : '.registry');