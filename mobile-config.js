// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.exampleApp.si',
  name: 'http_example NN',
  description: '...Http Example App...',
  author: 'Nejc Necemer - L-tek.si',
  email: 'nejc.necemer@gmail.si',
  version: "0.1.0"
});

// Set up resources such as icons and launch screens.
App.icons({
  // More screen sizes and platforms...
});

App.launchScreens({
});
// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff000000');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('StatusBarOverlaysWebView', 'true');
App.setPreference('StatusBarBackgroundColor', '#ffffff');
App.setPreference('Orientation', 'portrait');
App.setPreference('Orientation', 'all', 'ios');
// Pass preferences for a particular PhoneGap/Cordova plugin.
App.configurePlugin(/*'google maps', {
  APP_ID: 'API key',
  API_KEY: 'AIzaSyBHtzt9Ax7VgjuB4lmqdFMqaW8Gk1_0kik'}*/
);
// Add custom tags for a particular PhoneGap/Cordova plugin to the end of the
// generated config.xml. 'Universal Links' is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
`);
