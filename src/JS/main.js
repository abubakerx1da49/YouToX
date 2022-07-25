let { ipcRenderer, shell, BrowserWindow, screen } = require('electron');

// Title Bar JS
document.getElementById("quit-button").addEventListener("click", () => {
    ipcRenderer.send('quit-app')
})

document.getElementById("refresh_btn").addEventListener("click", () => {
    ipcRenderer.send('reload-app')
})

document.getElementById("minimize-button").addEventListener("click", () => {
    ipcRenderer.send('minimize-app')
})