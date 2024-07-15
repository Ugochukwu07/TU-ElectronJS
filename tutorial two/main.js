const { app, BrowserWindow, Menu, shell, ipcMain, Notification } = require('electron')
const { type } = require('node:os')
const path = require('node:path')
const { electron } = require('node:process')

const isMac = process.platform === 'darwin'
const isDev = !app.isPackaged

const menuItems = [
  ...(isMac
    ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: "Open Camera",
        click: async () => {
          const win2 = new BrowserWindow({
            height: 800,
            width: 900,
            show: false,
            backgroundColor: '#234355',
            webPreferences: {
              preload: path.join(__dirname, 'cameraPreload.js')
            }
          })

          ipcMain.on('close-camera-window', () => win2.close())

          win2.loadFile('camera.html')
          // win2.webContents.openDevTools();
          win2.once('ready-to-show', () => win2.show())
        }
      },
      {
        label: "New",
        click: async () => {
          const win2 = new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
            backgroundColor: '#234355',
          })

          // win2.loadURL('https://github.com')
          win2.loadFile('index2.html')
          win2.once('ready-to-show', () => win2.show())
        }
      },
      {
        label: "New Web Page",
        click: async () => {
          const win3 = new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
            backgroundColor: '#234355',
            // parent: win,
            // modal: true
          })

          win3.loadURL('https://github.com')
          // win3.loadFile('index2.html')
          win3.once('ready-to-show', () => win2.show())
        }
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ]
        : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ]
        : [
            { role: 'close' }
          ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(menuItems)
Menu.setApplicationMenu(menu)

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1000,
      height: 600,
      backgroundColor: "white",
      webPreferences: {
        nodeIntegration: false,
        worldSafeExecuteJavaScript: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
    // win.loadURL('https://github.com')

    ipcMain.on('set-image', (event, data) => {
      win.webContents.send('get-image', data)
    })

    win.loadFile('index.html')
}
if(isDev){
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

ipcMain.on('notify', (_, message) => {
  new Notification({title: "Notification", body: message}).show()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})