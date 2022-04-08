cordova.define("cordova-plugin-ios-aswebauthenticationsession-api.ASWebAuthSession", function(require, exports, module) { 
var PLUGIN_NAME = 'ASWebAuthSession';
function ASWebAuthSession() {}

ASWebAuthSession.prototype.start = function(redirectScheme, requestURL, callback, errorCallback) {
  cordova.exec(callback, errorCallback, PLUGIN_NAME, 'start', [redirectScheme, requestURL]);
};

ASWebAuthSession.install = function () {
  if (!window.plugins) {
    window.plugins = {};
  }

  window.plugins.ASWebAuthSession = new ASWebAuthSession();
  return window.plugins.ASWebAuthSession;
};
cordova.addConstructor(ASWebAuthSession.install);
});