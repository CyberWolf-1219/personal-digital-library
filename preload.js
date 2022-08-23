const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getFiles: () => ipcRenderer.invoke("scanFiles"),
});
