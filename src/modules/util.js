Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

const pages = ['registry', 'main', 'battle', 'character', 'settings']

export function querySelector(selector) {
    return document.querySelector(selector);
}

export function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}

export function toggleElementVisibilityViaSelector(selector, displayDefault='unset') {
    const element = querySelector(selector);
    const display = element.style.display;
    element.style.display = display === 'none' ? displayDefault : 'none';
}

export function setElementVisibilityViaSelector(selector, display) {
    element.style.display = display;
}

export function disableAllPagesVisibility() {
    pages.forEach(page => {
        querySelector(`.${page}`).style.display = 'none';
    })
}

export function showPage(selector, display = 'flex') {
    disableAllPagesVisibility();
    toggleElementVisibilityViaSelector(selector, display);
}

export function setLocalStorageDefault(key, value) {
    const item = localStorage.getItem(key);
    if (!item) {
        localStorage.setItem(key, value);
    }
}