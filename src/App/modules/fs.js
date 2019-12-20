const Store = require('electron-store');
const store = new Store();

export function read(key, def = defaultData) {
    if (store.has(key)) {
        return store.get(key);
    } else {
        return def;
    }
}

export function write(key, data) {
    store.set(key, data);
}