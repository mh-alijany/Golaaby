import './main.scss';

import ReactDOM from 'react-dom';
import App from './App/App'

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


// $(".status-non").show();
// $(".status-set").hide();
// addDNSToTable();
// updateLatencies();


// const { remote } = require('electron');
// const { BrowserWindow } = remote;
// document.querySelector(".green").addEventListener("click", function (e) {
//     var window = BrowserWindow.getFocusedWindow();
//     window.minimize();
// });
// document.querySelector(".yellow").addEventListener("click", function (e) {
//     var window = BrowserWindow.getFocusedWindow();
//     window.isMaximized() ? window.unmaximize() : window.maximize();
// });
// document.querySelector(".red").addEventListener("click", function (e) {
//     var window = BrowserWindow.getFocusedWindow();
//     window.close();
// });  