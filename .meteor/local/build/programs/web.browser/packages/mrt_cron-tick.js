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
var _ = Package.underscore._;

/* Package-scope variables */
var Cron;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/mrt:cron-tick/cron.js                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
// Veeeeeeery simple cron job singleton                              // 1
// ticks every 1 minute, set a job to go every X ticks.              // 2
                                                                     // 3
Cron = function(interval) {                                          // 4
  var self = this;                                                   // 5
                                                                     // 6
  interval = interval || 60 * 1000;                                  // 7
                                                                     // 8
  self._jobs = [];                                                   // 9
  self._schedules = [];                                              // 10
                                                                     // 11
  Meteor.setInterval(function() {                                    // 12
    self.tick();                                                     // 13
  }, interval)                                                       // 14
}                                                                    // 15
                                                                     // 16
_.extend(Cron.prototype, {                                           // 17
  addJob: function(every_x_ticks, fn) {                              // 18
    this._jobs.push({fn: fn, every: every_x_ticks, count: 0});       // 19
  },                                                                 // 20
                                                                     // 21
  addScheduleJob: function(unix_time, fn) {                          // 22
    this._schedules.push({fn: fn, unix_time: unix_time});            // 23
  },                                                                 // 24
                                                                     // 25
  tick: function() {                                                 // 26
    var self = this;                                                 // 27
                                                                     // 28
    _.each(self._jobs, function(job) {                               // 29
      job.count += 1;                                                // 30
      if (job.count === job.every) {                                 // 31
        job.fn();                                                    // 32
        job.count = 0;                                               // 33
      }                                                              // 34
    });                                                              // 35
                                                                     // 36
    _.each(self._schedules, function(job, index) {                   // 37
      var ts = Math.round((new Date()).getTime() / 1000);            // 38
                                                                     // 39
      if (ts >= job.unix_time) {                                     // 40
        job.fn();                                                    // 41
        delete self._schedules[index];                               // 42
      }                                                              // 43
    });                                                              // 44
  }                                                                  // 45
})                                                                   // 46
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:cron-tick'] = {
  Cron: Cron
};

})();
