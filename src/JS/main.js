let { ipcRenderer, shell, BrowserWindow, screen } = require('electron');
const ytdl = require('ytdl-core');

let canvas = document.getElementById("canvas");
let input = document.getElementById("input");
let download_btn = document.getElementById("download_btn")

let video_url = document.getElementById("video_url")
let video_title = document.getElementById("video_title")
let channel = document.getElementById("channel")
let views = document.getElementById("views")
let pub_date = document.getElementById("pub_date")

let attr_buttons = document.getElementById("attr_buttons")
let location_section = document.getElementById("location")


// For Button Disable
setInterval(() => {
    if (input.value.length == 0) {
        download_btn.disabled = true
    } else {
        download_btn.disabled = false
    }
}, 250);

// For Dark Mode
let r = document.querySelector(':root');
setInterval(() => {

    let DarkMode = document.getElementById("DarkMode").checked;

    if (DarkMode == true) {
        r.style.setProperty('--theme-background', '#191919');
        r.style.setProperty('--theme-background-2', '#121212');
        r.style.setProperty('--editor-background', '#202020');
        r.style.setProperty('--theme-color', 'white');
        r.style.setProperty('--min-color', 'lightblue');
        r.style.setProperty('--max-color', 'lightgreen');
        r.style.setProperty('--shadow-color', '#191919');
    } else {
        r.style.setProperty('--theme-background', 'lightgray');
        r.style.setProperty('--theme-background-2', 'white');
        r.style.setProperty('--editor-background', '#F0F0F0');
        r.style.setProperty('--theme-color', 'black');
        r.style.setProperty('--min-color', 'blue');
        r.style.setProperty('--max-color', 'green');
        r.style.setProperty('--shadow-color', 'darkgray');
    }


}, 250);

// Video Download Code
download_btn.addEventListener("click", async () => {
    
    attr_buttons.innerHTML = ""
    canvas.innerHTML = ""
    video_url.innerHTML = ""
    video_title.innerHTML = ""
    channel.innerHTML = ""
    views.innerHTML = ""
    pub_date.innerHTML = ""


    location_section.innerText = "YouToX - Loading..."
    
    let a;
    
    try {
        a = await ytdl.getInfo(input.value)
    } catch (error) {
        location_section.innerText = "YouToX - Error Occured"
    }
    
    let format_array = a.formats
    format_array.forEach(element => {
        
        let lastIndexOfMimeType = element.mimeType.lastIndexOf(";")

        if (element.qualityLabel == null){
            attr_buttons.innerHTML += `<button onclick="openLink('${element.url}');">${String(element.mimeType).slice(0, lastIndexOfMimeType).replace("/", " / ")}</button>`
        } else {
            attr_buttons.innerHTML += `<button onclick="openLink('${element.url}');">${element.qualityLabel} / ${element.container}</button>`
        }


    });


    // Set Details
    canvas.innerHTML =
        `<iframe width="400" height="225" src="${a.videoDetails.embed.iframeUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

    video_url.innerHTML = `<strong>URL </strong>${a.videoDetails.video_url}`
    video_title.innerHTML = `<strong>Title </strong>${a.videoDetails.title}`
    channel.innerHTML = `<strong>Channel </strong>${a.videoDetails.author.name}`
    views.innerHTML = `<strong>Views </strong>${a.videoDetails.viewCount}`
    pub_date.innerHTML = `<strong>Published at </strong>${a.videoDetails.publishDate}`
    
    location_section.innerText = "YouToX"
    
})

let openLink = (url) => {
    shell.openExternal(url)
}



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

// document.getElementById("maximize-button").addEventListener("click", () => {
//     ipcRenderer.send('maximize-app')
//     ipcRenderer.on("maximizing-icon", (event, icon) => {
//         // if (icon == "Max") {
//         //     document.getElementById("maximize-button").innerHTML = `<i class="bi bi-app"></i>`
//         // } else if (icon == "UnMax") {
//         //     document.getElementById("maximize-button").innerHTML = `<i class="bi bi-app-indicator"></i>`
//         // }
//     })
// })

// ipcRenderer.on('asynchronous-message', function (evt, message) {
//     let icon = message.icon;
//     // console.log(icon)
//     // if (icon == "Max") {
//     //     document.getElementById("maximize-button").innerHTML = `<i class="bi bi-app-indicator"></i>`
//     // } else if (icon == "UnMax") {
//     //     document.getElementById("maximize-button").innerHTML = `<i class="bi bi-app"></i>`
//     // }
// });