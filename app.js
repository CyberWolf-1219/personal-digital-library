const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

var window = null;

const CreateMainWindow = () => {
  window = new BrowserWindow({
    width: 800,
    height: 900,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
    },
  });
  window.loadFile("./HTML/index.html");
  window.removeMenu();
  //window.webContents.openDevTools();
};

let scanForFiles = (event) => {
  fs.readdir("./PDFs", (err, files) => {
    if (err) {
      fs.mkdir("./PDFs", () => {});
    } else {
      event.reply("scanResults", files);
    }
  });
};

app.whenReady().then(() => {
  CreateMainWindow();
  ipcMain.on("scanForFiles", (event, data) => {
    scanForFiles(event);
  });
});
