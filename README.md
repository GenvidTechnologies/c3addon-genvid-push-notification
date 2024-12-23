==================================
PushNotification Construct 3 Addon
==================================

## To use

### Building

This plugin only work under Cordova.

#### Android

For building on Android, you must:

1. Have a icons named `push_icon.png`
2. Add the file google-services.json to the root folder of your Cordova project.

### In App

1. Call Initialize when you are ready.
2. On Registration will be called when the Registration ID is available.
3. On Notification will be called when new Notifications are received and the app is online.

See https://github.com/havesource/cordova-plugin-push/ for more details.

### TODO

1. Check for permissions
2. Support for channels.

## To develop

```bash
npm i
npm run build
npm run watch &
npm run devmode &
```

Because of the restricted CSP in Construct3, make sure to use http://localhost:8080/addon.json instead of 127.0.0.1.

## To build

```bash
cd dist
7z a -tzip -r ..\push-notification-addon.c3addon .
cd -
```
