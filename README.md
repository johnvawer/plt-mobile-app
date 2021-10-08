# plt-mobile-app

This is a `react-native` application that displays products and allows them to be viewed, added and removed from a basket.

### <b>Installation</b>

* `npm install`
* `cd ios`
* `pod install`

### <b>Running the Application</b>

* `npm run ios` - to run on an iOS emulator
* `npm run android` - to run on an Android emulator
  * if running this command you see an error for "Keystore file not found" run `cp ./node_modules/react-native/template/android/app/debug.keystore ./android/app/` and then rerun `npm run android`

### <b>Tests</b>

Unit tests are written using `Jest` and the `react-testing-library` to run:
 
* `npm run test`
* `npm run coverage`

### <b>Linting</b>

Linting is done via `ts-standard` to run lint against the project run:

* `npm run lint`
