const { app, BrowserWindow, Menu } = require('electron');

import open from 'open';

// var icon = nativeImage.createFromDataURL("data:image/png;base64,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")

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // hide application menubar
  Menu.setApplicationMenu(null);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/icon.ico",

    // frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // open new links in OS default browser
  mainWindow.webContents.on('new-window', function (event, url) {
    event.preventDefault();
    open(url);
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
