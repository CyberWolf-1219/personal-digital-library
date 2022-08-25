const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  scanForFiles: () => {
    ipcRenderer.send("scanForFiles");
  },
  getScanResults: (callback) => {
    ipcRenderer.on("scanResults", callback);
  },
});
