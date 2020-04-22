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
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var Template = Package.templating.Template;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var FlashMessages, flashMessages, sendMessage, $alert;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/mrt:flash-messages/messages.js                                                               //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
/**                                                                                                      // 1
 * flashMessages                                                                                         // 2
 * { message: String,                                                                                    // 3
 *   style: String,                                                                                      // 4
 *   seen: Boolean }                                                                                     // 5
 */                                                                                                      // 6
flashMessages = new Mongo.Collection(null);                                                              // 7
                                                                                                         // 8
FlashMessages = {                                                                                        // 9
  // Deprecated, use sendWarning instead. sendWarning is more consistent with Boostrap classes.          // 10
  sendAlert: function(message, options) {                                                                // 11
    sendMessage(message, '', options);                                                                   // 12
    console.log('Deprecated, use sendWarning instead of sendAlert');                                     // 13
  },                                                                                                     // 14
  sendWarning: function(message, options) {                                                              // 15
    sendMessage(message, 'alert-warning', options);                                                      // 16
  },                                                                                                     // 17
  sendError: function(message, options) {                                                                // 18
    sendMessage(message, 'alert-error alert-danger', options);                                           // 19
  },                                                                                                     // 20
  sendSuccess: function(message, options) {                                                              // 21
    sendMessage(message, 'alert-success', options);                                                      // 22
  },                                                                                                     // 23
  sendInfo: function(message, options) {                                                                 // 24
    sendMessage(message, 'alert-info', options);                                                         // 25
  },                                                                                                     // 26
  clear: function() {                                                                                    // 27
    flashMessages.remove({seen: true});                                                                  // 28
  },                                                                                                     // 29
  configure: function(options) {                                                                         // 30
    this.options = this.options || {};                                                                   // 31
    _.extend(this.options, options);                                                                     // 32
  },                                                                                                     // 33
  options: {                                                                                             // 34
    autoHide: true,                                                                                      // 35
    hideDelay: 5000,                                                                                     // 36
    autoScroll: true                                                                                     // 37
  }                                                                                                      // 38
}                                                                                                        // 39
                                                                                                         // 40
sendMessage = function(message, style, options) {                                                        // 41
  options = options || {};                                                                               // 42
  options.autoHide = options.autoHide === undefined ? FlashMessages.options.autoHide : options.autoHide; // 43
  options.hideDelay = options.hideDelay || FlashMessages.options.hideDelay;                              // 44
  flashMessages.insert({ message: message, style: style, seen: false, options: options});                // 45
}                                                                                                        // 46
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/mrt:flash-messages/template.messages_list.js                                                 //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
                                                                                                         // 1
Template.__checkName("flashMessages");                                                                   // 2
Template["flashMessages"] = new Template("Template.flashMessages", (function() {                         // 3
  var view = this;                                                                                       // 4
  return Blaze.Each(function() {                                                                         // 5
    return Spacebars.call(view.lookup("messages"));                                                      // 6
  }, function() {                                                                                        // 7
    return [ " \n    ", Spacebars.include(view.lookupTemplate("flashMessageItem")), "\n  " ];            // 8
  });                                                                                                    // 9
}));                                                                                                     // 10
                                                                                                         // 11
Template.__checkName("flashMessageItem");                                                                // 12
Template["flashMessageItem"] = new Template("Template.flashMessageItem", (function() {                   // 13
  var view = this;                                                                                       // 14
  return HTML.DIV({                                                                                      // 15
    "class": function() {                                                                                // 16
      return [ "alert ", Spacebars.mustache(view.lookup("style")), " alert-dismissable" ];               // 17
    },                                                                                                   // 18
    role: "alert"                                                                                        // 19
  }, HTML.Raw('\n    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\n    '), Blaze.If(function() {
    return Spacebars.call(view.lookup("group"));                                                         // 21
  }, function() {                                                                                        // 22
    return [ "\n      ", HTML.UL("\n        ", Blaze.Each(function() {                                   // 23
      return Spacebars.call(view.lookup("message"));                                                     // 24
    }, function() {                                                                                      // 25
      return [ "\n          ", HTML.LI(Blaze.View(function() {                                           // 26
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup(".")));                                  // 27
      })), "\n        " ];                                                                               // 28
    }), "\n      "), "\n    " ];                                                                         // 29
  }, function() {                                                                                        // 30
    return [ "\n      ", Blaze.View(function() {                                                         // 31
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("message")));                              // 32
    }), "\n    " ];                                                                                      // 33
  }), "\n  ");                                                                                           // 34
}));                                                                                                     // 35
                                                                                                         // 36
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/mrt:flash-messages/messages_list.js                                                          //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
Template.flashMessages.helpers({                                                                         // 1
  messages: function () {                                                                                // 2
    if (flashMessages.find().count() && FlashMessages.options.autoScroll)                                // 3
      $('html, body').animate({                                                                          // 4
        scrollTop: 0                                                                                     // 5
      }, 200);                                                                                           // 6
    var messages = flashMessages.find().fetch();                                                         // 7
    $.each(messages, function(index, value) {                                                            // 8
      value.group = value.message instanceof Array;                                                      // 9
    });                                                                                                  // 10
    return messages;                                                                                     // 11
  }                                                                                                      // 12
});                                                                                                      // 13
                                                                                                         // 14
Template.flashMessageItem.rendered = function () {                                                       // 15
  var message = this.data;                                                                               // 16
  Meteor.defer(function() {                                                                              // 17
    flashMessages.update(message._id, {$set: {seen: true}});                                             // 18
  });                                                                                                    // 19
  if (message.options && message.options.autoHide) {                                                     // 20
    $alert = $(this.find('.alert'));                                                                     // 21
    Meteor.setTimeout(function() {                                                                       // 22
        $alert.fadeOut(400, function() {                                                                 // 23
          flashMessages.remove({_id: message._id});                                                      // 24
        });                                                                                              // 25
      },                                                                                                 // 26
      message.options.hideDelay);                                                                        // 27
  }                                                                                                      // 28
};                                                                                                       // 29
                                                                                                         // 30
Template.flashMessageItem.events({                                                                       // 31
  "click .close": function (e, tmpl) {                                                                   // 32
    e.preventDefault();                                                                                  // 33
    flashMessages.remove(tmpl.data._id);                                                                 // 34
  }                                                                                                      // 35
});                                                                                                      // 36
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:flash-messages'] = {
  FlashMessages: FlashMessages,
  flashMessages: flashMessages
};

})();
