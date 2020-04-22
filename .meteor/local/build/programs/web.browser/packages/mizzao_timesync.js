//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var HTTP = Package.http.HTTP;

/* Package-scope variables */
var TimeSync, SyncInternals;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/mizzao:timesync/timesync-client.js                                                       //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
//IE8 doesn't have Date.now()                                                                        // 1
Date.now = Date.now || function() { return +new Date; };                                             // 2
                                                                                                     // 3
TimeSync = {};                                                                                       // 4
                                                                                                     // 5
// Internal values, exported for testing                                                             // 6
SyncInternals = {                                                                                    // 7
  offset: undefined,                                                                                 // 8
  roundTripTime: undefined,                                                                          // 9
  offsetDep: new Deps.Dependency(),                                                                  // 10
  timeTick: new Deps.Dependency(),                                                                   // 11
                                                                                                     // 12
  timeCheck: function (lastTime, currentTime, interval, tolerance) {                                 // 13
    if (Math.abs(currentTime - lastTime - interval) < tolerance) {                                   // 14
      // Everything is A-OK                                                                          // 15
      return true;                                                                                   // 16
    }                                                                                                // 17
    // We're no longer in sync.                                                                      // 18
    return false;                                                                                    // 19
  }                                                                                                  // 20
};                                                                                                   // 21
                                                                                                     // 22
var maxAttempts = 5;                                                                                 // 23
var attempts = 0;                                                                                    // 24
                                                                                                     // 25
/*                                                                                                   // 26
  This is an approximation of                                                                        // 27
  http://en.wikipedia.org/wiki/Network_Time_Protocol                                                 // 28
                                                                                                     // 29
  If this turns out to be more accurate under the connect handlers,                                  // 30
  we should try taking multiple measurements.                                                        // 31
 */                                                                                                  // 32
var updateOffset = function() {                                                                      // 33
  var t0;                                                                                            // 34
  t0 = Date.now();                                                                                   // 35
  HTTP.get("/_timesync", function(err, response) {                                                   // 36
    var t3 = Date.now(); // Grab this now                                                            // 37
    if (err) {                                                                                       // 38
      //  We'll still use our last computed offset if is defined                                     // 39
      Meteor._debug("Error syncing to server time: ", err);                                          // 40
      if (++attempts <= maxAttempts)                                                                 // 41
        Meteor.setTimeout(TimeSync.resync, 1000);                                                    // 42
      else                                                                                           // 43
        Meteor._debug("Max number of time sync attempts reached. Giving up.");                       // 44
      return;                                                                                        // 45
    }                                                                                                // 46
                                                                                                     // 47
    attempts = 0; // It worked                                                                       // 48
                                                                                                     // 49
    var ts = parseInt(response.content);                                                             // 50
    SyncInternals.offset = Math.round(((ts - t0) + (ts - t3)) / 2);                                  // 51
    SyncInternals.roundTripTime = t3 - t0; // - (ts - ts) which is 0                                 // 52
    SyncInternals.offsetDep.changed();                                                               // 53
  });                                                                                                // 54
};                                                                                                   // 55
                                                                                                     // 56
// Reactive variable for server time that updates every second.                                      // 57
TimeSync.serverTime = function(clientTime) {                                                         // 58
  // If we don't know the offset, we can't provide the server time.                                  // 59
  if ( !TimeSync.isSynced() ) return undefined;                                                      // 60
  // If a client time is provided, we don't need to depend on the tick.                              // 61
  if ( !clientTime ) SyncInternals.timeTick.depend();                                                // 62
                                                                                                     // 63
  // SyncInternals.offsetDep.depend(); implicit as we call isSynced()                                // 64
  return (clientTime || Date.now()) + SyncInternals.offset;                                          // 65
};                                                                                                   // 66
                                                                                                     // 67
// Reactive variable for the difference between server and client time.                              // 68
TimeSync.serverOffset = function() {                                                                 // 69
  SyncInternals.offsetDep.depend();                                                                  // 70
  return SyncInternals.offset;                                                                       // 71
};                                                                                                   // 72
                                                                                                     // 73
TimeSync.roundTripTime = function() {                                                                // 74
  SyncInternals.offsetDep.depend();                                                                  // 75
  return SyncInternals.roundTripTime;                                                                // 76
};                                                                                                   // 77
                                                                                                     // 78
TimeSync.isSynced = function() {                                                                     // 79
  SyncInternals.offsetDep.depend();                                                                  // 80
  return SyncInternals.offset !== undefined;                                                         // 81
};                                                                                                   // 82
                                                                                                     // 83
var resyncIntervalId = null;                                                                         // 84
                                                                                                     // 85
TimeSync.resync = function() {                                                                       // 86
  if (resyncIntervalId !== null) Meteor.clearInterval(resyncIntervalId);                             // 87
  updateOffset();                                                                                    // 88
  resyncIntervalId = Meteor.setInterval(updateOffset, 600000);                                       // 89
};                                                                                                   // 90
                                                                                                     // 91
TimeSync.watchClockChanges = function () {                                                           // 92
  Meteor._debug("TimeSync.watchClockChanges() is deprecated; clock watching is now on by default."); // 93
};                                                                                                   // 94
                                                                                                     // 95
// Run this as soon as we load, even before Meteor.startup()                                         // 96
// Run again whenever we reconnect after losing connection                                           // 97
var wasConnected = false;                                                                            // 98
                                                                                                     // 99
Deps.autorun(function() {                                                                            // 100
  var connected = Meteor.status().connected;                                                         // 101
  if ( connected && !wasConnected ) TimeSync.resync();                                               // 102
  wasConnected = connected;                                                                          // 103
});                                                                                                  // 104
                                                                                                     // 105
// resync on major client clock changes                                                              // 106
// based on http://stackoverflow.com/a/3367542/1656818                                               // 107
var updateInterval = 1000;                                                                           // 108
                                                                                                     // 109
// Resync if unexpected change by more than a few seconds. This needs to be                          // 110
// somewhat lenient, or a CPU-intensive operation can trigger a re-sync even                         // 111
// when the offset is still accurate. In any case, we're not going to be able to                     // 112
// catch very small system-initiated NTP adjustments with this, anyway.                              // 113
var tickCheckTolerance = 5000;                                                                       // 114
                                                                                                     // 115
var lastClientTime = Date.now();                                                                     // 116
                                                                                                     // 117
Meteor.setInterval(function() {                                                                      // 118
  var currentClientTime = Date.now();                                                                // 119
                                                                                                     // 120
  if ( SyncInternals.timeCheck(                                                                      // 121
    lastClientTime, currentClientTime, updateInterval, tickCheckTolerance) ) {                       // 122
    // No problem here, just keep ticking along                                                      // 123
    SyncInternals.timeTick.changed();                                                                // 124
  }                                                                                                  // 125
  else {                                                                                             // 126
    Meteor._debug("Clock discrepancy detected. Attempting re-sync.");                                // 127
    // Refuse to compute server time.                                                                // 128
    SyncInternals.offset = undefined;                                                                // 129
    SyncInternals.offsetDep.changed();                                                               // 130
    TimeSync.resync();                                                                               // 131
  }                                                                                                  // 132
                                                                                                     // 133
  lastClientTime = currentClientTime;                                                                // 134
}, updateInterval);                                                                                  // 135
                                                                                                     // 136
                                                                                                     // 137
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mizzao:timesync'] = {
  TimeSync: TimeSync,
  SyncInternals: SyncInternals
};

})();
