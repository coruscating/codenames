function initUserLanguage() {
  var language = amplify.store("language");

  if (language){
    Session.set("language", language);
  }

  setUserLanguage(getUserLanguage());
}

function getUserLanguage() {
  var language = Session.get("language");

  if (language){
    return language;
  } else {
    return "en";
  }
};

function setUserLanguage(language) {
  TAPi18n.setLanguage(language).done(function () {
    Session.set("language", language);
    amplify.store("language", language);
  });
}

function getLanguageList() {
  var languages = TAPi18n.getLanguages();
  var languageList = _.map(languages, function(value, key) { return {code: key, languageDetails: value}; });
  
  if (languageList.length <= 1){
    return null;
  }
  
  return languageList;
}

function getCurrentGame(){
  var gameID = Session.get("gameID");

  if (gameID) {
    return Games.findOne(gameID);
  }
}

function getAccessLink(){
  var game = getCurrentGame();

  if (!game){
    return;
  }

  return Meteor.settings.public.url + game.accessCode + "/";
}


function getCurrentPlayer(){
  var playerID = Session.get("playerID");

  if (playerID) {
    return Players.findOne(playerID);
  }
}

function generateAccessCode(){
  var code = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

    for(var i=0; i < 6; i++){
      code += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return code;
}

function generateLocations(){
    var arr = [];
    var realarr = [];
    var realarr2 =[];
    var found;
    var start=Math.floor(Math.random() * (2)); // starting player
    var game=getCurrentGame();
    var locationsarr=locations;

    if($('#location2').is(":checked")){
      locationsarr=locations.concat(locations2);
    }
    
    while (arr.length < 25){
      var randomnumber=Math.floor(Math.random() * locationsarr.length);
      found=false;
      for(var i=0;i<arr.length;i++){
        if(arr[i]==randomnumber){
        found=true;
        break;
        }
      }
      if(!found){
      arr[arr.length]=randomnumber;
      }
    }

    for (var i=0;i<arr.length;i++){
        realarr[i]=locationsarr[arr[i]];
        realarr[i]["reveal"]="unrevealed";
        realarr[i]["displayname"]=realarr[i]["name"];
        realarr[i]["name"]=realarr[i]["name"].replace(" ","_");
        if(start==0){
          Games.update(game._id, {$set: {firstplayer: "Red starts!"}});
          if (i <= 8){
            realarr[i]["type"]="red";
          } else if (i==9){
            realarr[i]["type"]="assassin";
          } else if (i>=17) {
            realarr[i]["type"]="blue";
          } else {
            realarr[i]["type"]="neutral";
          }
          realarr[i]["red"]=i<=8 ? true : false;
          realarr[i]["assassin"]=i==9 ? true : false;
          realarr[i]["blue"]=i>=17 ? true : false;
        } else {
          Games.update(game._id, {$set: {firstplayer: "Blue starts!"}});
            if (i <= 7){
            realarr[i]["type"]="red";
          } else if (i==8){
            realarr[i]["type"]="assassin";
          } else if (i>=16) {
            realarr[i]["type"]="blue";
          } else {
            realarr[i]["type"]="neutral";
          }

          realarr[i]["red"]=i<=7 ? true : false;
          realarr[i]["assassin"]=i==8 ? true : false;
          realarr[i]["blue"]=i>=16 ? true : false;     
        }
    }

    for (var i = realarr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = realarr[i];
        realarr[i] = realarr[j];
        realarr[j] = temp;
    }
  Games.update(game._id, {$set: {bluescore: 0, redscore: 0}});

    
    return realarr;
}

function generateNewGame(){
  var game = {
    accessCode: generateAccessCode(),
    state: "waitingForPlayers",
    locationlist: null,
    lengthInMinutes: 20,
    numberOfLocations: 25,
    endTime: null,
    paused: false,
    redscore: 0,
    bluescore: 0,
    firstplayer: "Red starts!",
    pausedTime: null
  };

  var gameID = Games.insert(game);
  game = Games.findOne(gameID);

  return game;
}

function generateNewPlayer(game, name){
  var player = {
    gameID: game._id,
    name: name,
    role: null,
    isBlue: false,
    isRed: false,
    isNeutral: true
  };

  var playerID = Players.insert(player);

  return Players.findOne(playerID);
}

function getRandomLocation(locationarr){
  var locationIndex = Math.floor(Math.random() * locationarr.length);
  return locationarr[locationIndex];
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function assignRoles(players, location){
  var default_role = location.roles[location.roles.length - 1];
  var roles = location.roles.slice();
  var shuffled_roles = shuffleArray(roles);
  var role = null;

  players.forEach(function(player){
    if (!player.isSpy){
      role = shuffled_roles.pop();

      if (role === undefined){
        role = default_role;
      }

      Players.update(player._id, {$set: {role: role}});
    }
  });
}

function resetUserState(){
  var player = getCurrentPlayer();

  if (player){
    Players.remove(player._id);
  }

  Session.set("gameID", null);
  Session.set("playerID", null);
}

function trackGameState () {
  var gameID = Session.get("gameID");
  var playerID = Session.get("playerID");

  if (!gameID || !playerID){
    return;
  }

  var game = Games.findOne(gameID);
  var player = Players.findOne(playerID);

  if (!game || !player){
    Session.set("gameID", null);
    Session.set("playerID", null);
    Session.set("currentView", "startMenu");
    return;
  }

  if(game.state === "inProgress"){
    Session.set("currentView", "gameView");
  } else if (game.state === "waitingForPlayers") {
    Session.set("currentView", "lobby");
  }
}

function leaveGame () {  
  //var player = getCurrentPlayer();

  Session.set("currentView", "startMenu");
  //Players.remove(player._id);

  Session.set("playerID", null);
}

initUserLanguage();

Meteor.setInterval(function () {
  Session.set('time', new Date());
}, 1000);

Tracker.autorun(trackGameState);

FlashMessages.configure({
  autoHide: true,
  autoScroll: false
});

Template.main.helpers({
  whichView: function() {
    return Session.get('currentView')
  },
  language: function() {
    return getUserLanguage();
  }
});

Template.footer.helpers({
  languages: getLanguageList
})

Template.footer.events({
  'click .btn-set-language': function (event) {
    var language = $(event.target).data('language');
    setUserLanguage(language);
  }
})


Template.startMenu.rendered = function () {

  resetUserState();
};


Template.startMenu.helpers({

  playername : function(){
    return Session.get('playerName');
  }

  
});
Template.startMenu.events({
  'submit #join-game': function (event) {
    
    
    var game = Games.findOne();

    if (!game){
        var game = generateNewGame();
        
        Session.set("gameID", game._id);


        var num = Session.get('locations');
        if(!num){
            Session.set("locations", 25);
            num=25;
        }
        Games.update(game._id, {$set: {numberOfLocations: num}});

        var newlocationlist = generateLocations();
        Games.update(game._id, {$set: {locationlist: newlocationlist}});
    }
    if(!Session.get("gameID")){
      Session.set("gameID", game._id);
    }

    if (!game.locationlist){
        var newlocationlist = generateLocations();
        Games.update(game._id, {$set: {locationlist: newlocationlist}});
    }

      
      Session.set("playerType", event.target.playerType.value);

      Session.set("currentView", "lobby");

    return false;
  }
});


Template.lobby.rendered = function(){
    var min = Session.get('length');
    var game = getCurrentGame();
    if(min){
        Games.update(game._id, {$set: {lengthInMinutes: min}});
      }

    num = Session.get('spies');
    if(num){
        Games.update(game._id, {$set: {numberOfSpies: num}});
      }
}

Template.lobby.helpers({
  game: function () {
    return getCurrentGame();
  },
  player: function () {
    return getCurrentPlayer();
  },
  locations: function () {
    return game.locationlist;
  },  

  
  players: function () {
    var game = getCurrentGame();
    var currentPlayer = getCurrentPlayer();

    if (!game) {
      return null;
    }

    var players = Players.find({'gameID': game._id}).fetch();

    players.forEach(function(player){
      if (player._id === currentPlayer._id){
        player.isCurrent = true;
      }
    });

    return players;
  }
});

Template.lobby.events({
    'click .up': function() {
        var game = getCurrentGame();
        var length = game.lengthInMinutes;
        if(length<200){
            length=length+1;
        }
        Session.set('length',length);
        Games.update(game._id, {$set: {lengthInMinutes: length}});
    },
    'click .down': function() {
        var game = getCurrentGame();
        var length = game.lengthInMinutes;
        if(length>0){
            length=length-1;
        }
        Session.set('length',length);
        Games.update(game._id, {$set: {lengthInMinutes: length}});
    },

  'click .btn-leave': leaveGame,
  'click .btn-start': function () {
      
    var game = getCurrentGame();
    var location = game.location;
    var length = game.lengthInMinutes;
    var localEndTime = moment().add(length, 'minutes');
    var gameEndTime = TimeSync.serverTime(localEndTime);
    var arrSpies=[];


    //assignRoles(players, location);
    Session.set('currentView', 'gameView');
    Games.update(game._id, {$set: {state: 'inProgress', endTime: gameEndTime, paused: false, pausedTime: null}});
  },
  /*location2length: function(){
    console.log("hi");
    console.log(locations2);
    return locations2.length;
  },*/
  'click #location2': function(event){
    var game=getCurrentGame();
    var newlocationlist=generateLocations();
    Games.update(game._id, {$set: {locationlist: newlocationlist}})
  },
  'click .btn-remove-player': function (event) {
    var playerID = $(event.currentTarget).data('player-id');
    Players.remove(playerID);
  },
  'click .btn-refresh-list': function (event) {
      var game = getCurrentGame();
      var newlocationlist = generateLocations();
      var newlocation = getRandomLocation(newlocationlist);
      Games.update(game._id, {$set: {locationlist: newlocationlist, location: newlocation}});
      //console.log("here");
  },
  'click .btn-edit-player': function (event) {
    var game = getCurrentGame();
    resetUserState();
    Session.set('urlAccessCode', game.accessCode);
    Session.set('currentView', 'joinGame');
  }
});



function getTimeRemaining(){
  var game = getCurrentGame();
  var localEndTime = game.endTime - TimeSync.serverOffset();

  if (game.paused){
    var localPausedTime = game.pausedTime - TimeSync.serverOffset();
    var timeRemaining = localEndTime - localPausedTime;
  } else {
    var timeRemaining = localEndTime - Session.get('time');
  }

  if (timeRemaining < 0) {
    timeRemaining = 0;
  }

  return timeRemaining;
}


Template.gameView.helpers({
  game: getCurrentGame,
  firstplayer: function(){
    var game=getCurrentGame();
    return game.firstplayer;
  },
  isRed: function(){
    if (Session.get('playerType')=="red"){
    return true;
    } else {
    return false;
    }
  },
  isNeutral: function(){
    if (Session.get('playerType')=="neutral"){
    return true;
    } else {
    return false;
    }
  },
  isBlue: function(){
    if (Session.get('playerType')=="blue"){
    return true;
    } else {
    return false;
    }
  },
  player: getCurrentPlayer,
  players: function () {
    var game = getCurrentGame();
    
    if (!game){
      return null;
    }

    var players = Players.find({
      'gameID': game._id
    });

    return players;
  },
  locations: function () {
    return game.locationlist;
  },
  gameFinished: function () {
    var timeRemaining = getTimeRemaining();

    return timeRemaining === 0;
  },
  timeRemaining: function () {
    var timeRemaining = getTimeRemaining();

    return moment(timeRemaining).format('mm[<span>:</span>]ss');
  },
  redscore: function(){
    var game=getCurrentGame();
    return game.redscore;
  },
  bluescore: function(){
    var game=getCurrentGame();
    return game.bluescore;
  }
});

Template.gameView.events({
  'click .btn-leave': leaveGame,
  'click .btn-end': function () {

    var game = getCurrentGame();
    //Games.remove(game._id);
    Session.set("currentView", "startMenu");
  },
  'click .location-unrevealed': function(event){
    var game=getCurrentGame();
    if(game.paused != true){
      var locationlist=game.locationlist;
      var id=event.currentTarget.id;
      id=id.split("-")[1];

     
      for (var i=0;i<locationlist.length;i++){
        if(locationlist[i].name==id){
          if(locationlist[i].red==true){
            var score=game.redscore+1;
            locationlist[i].reveal="red";
            Games.update(game._id, {$set: {redscore: score}});
            if((score==8 && game.firstplayer=="Blue starts!") || score==9){
              Games.update(game._id, {$set: {firstplayer: "Red wins!",paused: true, pausedTime: TimeSync.serverTime(moment())}});
            }
          } else if (locationlist[i].blue==true){
            var score=game.bluescore+1;
            locationlist[i].reveal="blue";
            Games.update(game._id, {$set: {bluescore: score}});
            if((score==8 && game.firstplayer=="Red starts!") || score==9){
              Games.update(game._id, {$set: {firstplayer: "Blue wins!",paused: true, pausedTime: TimeSync.serverTime(moment())}});
            }
          } else if(locationlist[i].assassin==true){
            locationlist[i].reveal="assassin";
            Games.update(game._id, {$set: {firstplayer: "Game over!",paused: true, pausedTime: TimeSync.serverTime(moment())}});
            //$('#location-' + id).removeClass("location-unrevealed").addClass("location-assassin");
          }
           else{
            locationlist[i].reveal="neutral";
            //$('#location-' + id).removeClass("location-unrevealed").addClass("location-neutral");
          }
          Games.update(game._id, {$set: {locationlist: locationlist}});
          break;
        }
      }
    }
    //if(locationlist[id])
    //this.addClass(locationlist[id]);
  },
  'click .btn-toggle-status': function () {
    $(".status-container-content").toggle();
  },
  'click .game-countdown': function () {
    var game = getCurrentGame();
    var currentServerTime = TimeSync.serverTime(moment());

    if(game.paused){
      var newEndTime = game.endTime - game.pausedTime + currentServerTime;
      Games.update(game._id, {$set: {paused: false, pausedTime: null, endTime: newEndTime}});
    } else {
      Games.update(game._id, {$set: {paused: true, pausedTime: currentServerTime}});
    }
  }
});
