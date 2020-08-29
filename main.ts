import { app, BrowserWindow, screen, net } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

function createSplashScreen(): BrowserWindow {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {

    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200/splash');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/splash.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
  return win;
}

function wakeUpServer(numberTry: number, onSuccess: () => any, onError: () => any) {
  if(numberTry >= 5) {
    onError();
  } else {
    const innerNumberTry = numberTry+1;
    const request = net.request({
      protocol: 'http:',
      hostname: 'localhost:8080',
      path: '/'
    })
    request.on('response', response => {
      console.log('wakeup success : ' + JSON.stringify(response));
      onSuccess();
    })
    request.on('error', error => {
      console.error('wakeup error : ' + JSON.stringify(error))
      setTimeout(_ => wakeUpServer(innerNumberTry, onSuccess, onError), 2000);
    })
    request.end();
  }
}
try {

  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(args1 => {
    const splashScreen = createSplashScreen();
    wakeUpServer(0, () => {
      console.log("onsuccess");

      createWindow().show();
      splashScreen.destroy();
    }, () => {
      console.log("onerror");
      createWindow().show();
      splashScreen.destroy();
    })
  }, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
