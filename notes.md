A basic Electron application needs just these files:

- package.json` - Points to the app's main file and lists its details and dependencies.
- main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

# To Use

Bash

# Go into the repository
cd electron-quick-start

# Install dependencies
npm install

# Run the app
npm start


# Settings

# Change icon in main.js, createWindow()
icon: __dirname + '/images/theater.ico',


# Electron Packager

# for use in npm scripts
npm install electron-packager --save-dev

# for use from cli
npm install electron-packager -g

electron-packager <sourcedir> <appname> --platform=win32 --arch=x86_64

electron-packager D:\Programs\Electron\Theater Theater --platform=win32 --arch=x64

electron-packager /Users/chris/Documents/programs/Electron/Theater Theater --platform=win32 --arch=x64

# Chrome Developer's Bar
ctrl-shift-i