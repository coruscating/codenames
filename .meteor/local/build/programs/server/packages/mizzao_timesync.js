(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;

(function () {

//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
// packages/mizzao:timesync/timesync-server.js                                  //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////
                                                                                //
// Use rawConnectHandlers so we get a response as quickly as possible           // 1
// https://github.com/meteor/meteor/blob/devel/packages/webapp/webapp_server.js // 2
                                                                                // 3
WebApp.rawConnectHandlers.use("/_timesync",                                     // 4
  function(req, res, next) {                                                    // 5
    // Never ever cache this, otherwise weird times are shown on reload         // 6
    // http://stackoverflow.com/q/18811286/586086                               // 7
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");      // 8
    res.setHeader("Pragma", "no-cache");                                        // 9
    res.setHeader("Expires", 0);                                                // 10
                                                                                // 11
    res.end(Date.now().toString());                                             // 12
  }                                                                             // 13
);                                                                              // 14
                                                                                // 15
//////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mizzao:timesync'] = {};

})();

//# sourceMappingURL=mizzao_timesync.js.map
