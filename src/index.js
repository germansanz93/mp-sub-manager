// En tu archivo index.js (COMPLETO)
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const keytar = require('keytar');

const KEYTAR_SERVICE = 'MiAppElectron';
const KEYTAR_ACCOUNT = 'MercadoPagoUser';
const RESULTS_PER_PAGE = 20; // Definimos cuántos resultados queremos por página

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('guardar-token', async (event, token) => {
    try {
        await keytar.setPassword(KEYTAR_SERVICE, KEYTAR_ACCOUNT, token);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
});

ipcMain.handle('obtener-token', async () => {
    return await keytar.getPassword(KEYTAR_SERVICE, KEYTAR_ACCOUNT);
});

ipcMain.handle('borrar-token', async () => {
    return await keytar.deletePassword(KEYTAR_SERVICE, KEYTAR_ACCOUNT);
});

ipcMain.handle('buscar-suscripciones', async (event, params) => {
    const token = await keytar.getPassword(KEYTAR_SERVICE, KEYTAR_ACCOUNT);
    if (!token) {
        return { error: true, message: 'Error: El token de acceso no ha sido configurado.' };
    }

    try {
        const apiParams = {
            limit: RESULTS_PER_PAGE,
            offset: params.offset || 0,
        };
        if (params.status) {
            apiParams.status = params.status;
        }

        const response = await axios.get('https://api.mercadopago.com/preapproval/search', {
            headers: { 'Authorization': `Bearer ${token}` },
            params: apiParams
        });
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: 'No se pudo obtener la respuesta de la API. Verifica que el token sea correcto.',
            details: error.response ? error.response.data : 'Error de conexión'
        };
    }
});