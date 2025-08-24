import './styles/style.css';
import './styles/global.css';
import {handleRegistrationForm} from './modules/registryPage.js';
import {handleBattleEntry} from "./modules/mainPage.js";
import {handleBattleControls} from "./modules/battle.js";
import {toggleElementVisibility} from "./modules/util.js";

handleRegistrationForm();
handleBattleEntry();
handleBattleControls();

toggleElementVisibility('.registry');
toggleElementVisibility('.main', 'flex');
// toggleElementVisibility('.battle', 'flex');