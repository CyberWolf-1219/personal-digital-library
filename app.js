const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { pbkdf2Sync } = require("crypto");

const CreateMainWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 1200,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
    },
  });

  window.loadFile("./HTML/index.html");
  window.removeMenu();
  window.webContents.openDevTools();
};

const scanForFiles = () => {
  fs.readdir("./", (error, fileNames) => {
    if (!fileNames.includes("PDFs")) {
      fs.mkdir("./PDFs");
    } else {
      fs.readdir("./PDFs", (err, files) => {
        if (err) {
          dialog.showMessageBox({ detail: err });
        }
        if (files) {
          console.log(files);
          return files;
        } else {
          return [];
        }
      });
    }
  });
};

app.on("ready", () => {
  CreateMainWindow();
  ipcMain.handle("scanFiles", scanForFiles);
});
