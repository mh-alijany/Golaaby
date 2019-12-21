const Store = require('electron-store');
const store = new Store();

export function read(key, defaultData = false) {
    if (store.has(key)) {
        return store.get(key);
    } else {
        return defaultData;
    }
}

export function write(key, data) {
    store.set(key, data);
}