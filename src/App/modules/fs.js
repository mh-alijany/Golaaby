const Store = require('electron-store');
const defaultData = require("./default.json");
const store = new Store();

export function read() {
    if (store.has("data")) {
        return store.get("data");
    } else {
        return defaultData;
    }
}

export function write(data) {
    store.set("data", data);
}