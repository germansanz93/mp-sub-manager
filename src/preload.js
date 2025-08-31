const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    buscarSuscripciones: (params) => ipcRenderer.invoke('buscar-suscripciones', params),
    guardarToken: (token) => ipcRenderer.invoke('guardar-token', token),
    obtenerToken: () => ipcRenderer.invoke('obtener-token'),
    borrarToken: () => ipcRenderer.invoke('borrar-token')
});