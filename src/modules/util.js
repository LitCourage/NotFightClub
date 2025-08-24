Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

export function querySelector(selector) {
    return document.querySelector(selector);
}

export function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}

export function toggleElementVisibility(selector, displayDefault='unset') {
    const element = querySelector(selector);
    const display = element.style.display;
    element.style.display = display === 'none' ? displayDefault : 'none';
}