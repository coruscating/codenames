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
  var gameID = "default";

    return Games.findOne(gameID);
  
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
    var locationsarr=[];
    var totalnum=game.totalnum;
    var firstnum=Math.round((Math.sqrt(totalnum)-2)*3);

    $(".selection").each(function(){
      if($(this).is(":checked")){
        eval("locationsarr=locationsarr.concat(" + this.id + ")");
        Session.set(this.id, true);
      } else {
        Session.set(this.id, false);
      }
    });
    //locationsarr=wordlist_orig;
    if(locationsarr.length==0){
      locationsarr=wordlist_orig;
    }
    
    locationsarr.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })

    while (arr.length < totalnum){
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
        realarr[i]["displayname"]=realarr[i]["name"].replace("_"," ");
        realarr[i]["name"]=realarr[i]["name"].replace(" ","_");
        
        if(start==0){
          Games.update(game._id, {$set: {turn: "red", bluepaused: true, redpaused: false, statustext: "Red's turn", redtotal: firstnum, bluetotal: firstnum-1}});
          if (i <= firstnum-1){
            realarr[i]["type"]="red";
          } else if (i==firstnum){
            realarr[i]["type"]="assassin";
          } else if (i>=(totalnum-firstnum+1)) {
            realarr[i]["type"]="blue";
          } else {
            realarr[i]["type"]="neutral";
          }
          /*realarr[i]["red"]=i<=8 ? true : false;
          realarr[i]["assassin"]=i==9 ? true : false;
          realarr[i]["blue"]=i>=17 ? true : false;*/
        } else {
          Games.update(game._id, {$set: {turn: "blue", redpaused: true, bluepaused: false, statustext: "Blue's turn", redtotal: firstnum-1, bluetotal: firstnum}});
            if (i <= firstnum-2){
            realarr[i]["type"]="red";
          } else if (i==firstnum){
            realarr[i]["type"]="assassin";
          } else if (i>=(totalnum-firstnum)) {
            realarr[i]["type"]="blue";
          } else {
            realarr[i]["type"]="neutral";
          }

          /*realarr[i]["red"]=i<=7 ? true : false;
          realarr[i]["assassin"]=i==8 ? true : false;
          realarr[i]["blue"]=i>=16 ? true : false;*/  
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
    _id: "default",
    accessCode: generateAccessCode(),
    state: "waitingForPlayers",
    locationlist: null,
    lengthInMinutes: 10,
    totalnum: 25,
    endTime: null,
    blueendTime: null,
    redendTime: null,
    paused: false,
    bluepaused: false,
    redpaused: false,
    turn: "red",
    redscore: 0,
    bluescore: 0,
    firstplayer: "red",
    statustext: null,
    redpausedTime: null,
    bluepausedTime: null
  };

  var gameID = Games.insert(game);
  game = Games.findOne("default");

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

  //Session.set("playerID", null);
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

Template.startMenu.rendered = function(){
  if(Session.get("playerType")){

  }
}

Template.startMenu.helpers({

  playername : function(){
    return Session.get('playerName');
  }

  
});
Template.startMenu.events({
  'submit #join-game': function (event) {
    
    
    var game = getCurrentGame();

    if (!game){
        var game = generateNewGame();
        
        Session.set("gameID", game._id);


        var num = Session.get('locations');
        if(!num){
            Session.set("locations", 25);
            num=25;
        }
        Games.update(game._id, {$set: {totalnum: num}});

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
    var num = Session.get('length');
    var game = getCurrentGame();
    if(num){
        Games.update(game._id, {$set: {lengthInMinutes: num}});
      }

    num = Session.get('wordlist_orig');
    if(num){
      $('#wordlist_orig').prop("checked",true);
    }
    num = Session.get('wordlist_2');
    if(num){
      $('#wordlist_2').prop("checked",true);
    }
    num = Session.get('wordlist_starwars');
    if(num){
      $('#wordlist_starwars').prop("checked",true);
    }

    num = Session.get('totalnum');
    if(num){
      Games.update(game._id, {$set: {totalnum: num}});
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
  },
  wordlist_orig_len: function(){
    return wordlist_orig.length;
  },
  wordlist_2_len: function(){
    return wordlist_2.length;
  },
  wordlist_starwars_len: function(){
    return wordlist_starwars.length;
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
    'click .up2': function() {
        var game = getCurrentGame();
        var totalnum = game.totalnum;
        if (totalnum<100){
          totalnum=totalnum+5;
          Session.set('totalnum',totalnum);
          Games.update(game._id, {$set: {totalnum: totalnum}});
          generateLocations();
        }
    },
    'click .down2': function() {
        var game = getCurrentGame();
        var totalnum = game.totalnum;
        if(totalnum>10){
            totalnum=totalnum-5;
            Session.set('totalnum',totalnum);
            Games.update(game._id, {$set: {totalnum: totalnum}});
            generateLocations();
        }
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
    Games.update(game._id, {$set: {state: 'inProgress', redendTime: gameEndTime, blueendTime: gameEndTime, paused: false, bluepausedTime: TimeSync.serverTime(moment()), redpausedTime: TimeSync.serverTime(moment())}});
    //console.log(Games);
  },
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
  },
  'click .btn-edit-player': function (event) {
    var game = getCurrentGame();
    resetUserState();
    Session.set('urlAccessCode', game.accessCode);
    Session.set('currentView', 'joinGame');
  }
});


function switchPlayers(){
  var game=getCurrentGame();
  if(game.paused != true){
    
    var currentServerTime = TimeSync.serverTime(moment());
    if(game.turn=="red"){ // switching to blue's turn
      var newEndTime = game.blueendTime - game.bluepausedTime + currentServerTime;
      Games.update(game._id, {$set: {turn: "blue", statustext: "Blue's turn", blueendTime: newEndTime, bluepaused: false, redpaused: true, bluepausedTime: null, redpausedTime: currentServerTime}});
    } else if (game.turn=="blue"){
      var newEndTime = game.redendTime - game.redpausedTime + currentServerTime;
      Games.update(game._id, {$set: {turn: "red", statustext: "Red's turn",redendTime: newEndTime, bluepaused: true, redpaused: false, redpausedTime: null, bluepausedTime: currentServerTime}});
    }
  }
}


function getTimeRemaining(player){
  var game = getCurrentGame();
  var ctime=TimeSync.serverOffset();
  if (player==0){ //blue
    var localEndTime = game.blueendTime - ctime;
    if(game.bluepaused==true){
      var localPausedTime = game.bluepausedTime - ctime;
      var timeRemaining = localEndTime - localPausedTime;
    } else{
      var timeRemaining = localEndTime - Session.get('time');
    }
  } else {
    var localEndTime = game.redendTime - ctime;
    if(game.redpaused==true){
      var localPausedTime = game.redpausedTime - ctime;
      var timeRemaining = localEndTime - localPausedTime;
    } else{
      var timeRemaining = localEndTime - Session.get('time');
    }
  }

  if (timeRemaining < 0) {
    timeRemaining = 0;
  }

  return timeRemaining;
}

Template.gameView.rendered = function() {
  //console.log(getCurrentGame());
}

Template.gameView.helpers({
  game: getCurrentGame,
  pausetext: function(){
    var game=getCurrentGame();
    return game.paused;
  },
  statustext: function(){
    var game=getCurrentGame();
    return game.statustext;
  },
  redtotal: function(){
    var game=getCurrentGame();
    return game.redtotal;
  },
  bluetotal: function(){
    var game=getCurrentGame();
    return game.bluetotal;
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
  bluetimeRemaining: function () {
    var timeRemaining = getTimeRemaining(0);
    return moment(timeRemaining).format('mm[<span>:</span>]ss');
  },
  redtimeRemaining: function () {
    var timeRemaining = getTimeRemaining(1);
    return moment(timeRemaining).format('mm[<span>:</span>]ss');
  },
  redscore: function(){
    var game=getCurrentGame();
    return game.redscore;
  },
  bluescore: function(){
    var game=getCurrentGame();
    return game.bluescore;
  },
  redTurn: function(){
    var game=getCurrentGame();
    if (game.turn=="red"){
      return true;
    } else {
      return false;
    }
  },
  blueTurn: function(){
    var game=getCurrentGame();
    if (game.turn=="blue"){
      return true;
    } else {
      return false;
    }
  }
});

Template.gameView.events({
  'click .btn-leave': leaveGame,

  'click .btn-pass': switchPlayers,

  'click .btn-end': function () {

    var game = getCurrentGame();
    //Games.remove(game._id);
    Session.set("currentView", "lobby");
  },
  'click .location-unrevealed': function(event){
    var game=getCurrentGame();
    if(game.paused != true){
      var locationlist=game.locationlist;
      var id=event.currentTarget.id;
      id=id.split("-")[1];
      ptime=TimeSync.serverTime(moment());
     
      for (var i=0;i<locationlist.length;i++){
        if(locationlist[i].name==id){
          if(locationlist[i].type=="red"){
            var score=game.redscore+1;
            locationlist[i].reveal="red";
            Games.update(game._id, {$set: {redscore: score}});
            if (game.turn=="blue"){
              switchPlayers();
            }
            if(score==game.redtotal){
              if (game.turn=="red"){
                Games.update(game._id, {$set: {redpausedTime: ptime}});
              } else {
                Games.update(game._id, {$set: {bluepausedTime: ptime}});
              }
              Games.update(game._id, {$set: {statustext: "Red wins!",turn: "red", redpaused: true, bluepaused: true, pausedTime: ptime}});
            }
          } else if (locationlist[i].type=="blue"){
            var score=game.bluescore+1;
            locationlist[i].reveal="blue";
            Games.update(game._id, {$set: {bluescore: score}});
            if (game.turn=="red"){
              switchPlayers();
            }
            if(score==game.bluetotal){
              if (game.turn=="red"){
                Games.update(game._id, {$set: {redpausedTime: ptime}});
              } else {
                Games.update(game._id, {$set: {bluepausedTime: ptime}});
              }
              Games.update(game._id, {$set: {statustext: "Blue wins!",turn: "blue", redpaused: true, bluepaused: true, pausedTime: ptime}});
            }
          } else if(locationlist[i].type=="assassin"){
            locationlist[i].reveal="assassin";
              if (game.turn=="red"){
                Games.update(game._id, {$set: {statustext: "Blue wins!", turn: "blue", redpaused: true, bluepaused: true, pausedTime: ptime, redpausedTime: ptime}});
              } else {
                Games.update(game._id, {$set: {statustext: "Red wins!", turn: "red", redpaused: true, bluepaused: true, pausedTime: ptime, bluepausedTime: ptime}});
              }
          }
           else{
            locationlist[i].reveal="neutral";
            switchPlayers();
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
    $(".game-countdown").toggle();
  },
  'click .btn-pause': function () {
    var game = getCurrentGame();
    var currentServerTime = TimeSync.serverTime(moment());

    if(game.paused){
      var newblueEndTime = game.blueendTime - game.bluepausedTime + currentServerTime;
      var newredEndTime = game.redendTime - game.redpausedTime + currentServerTime;

      Games.update(game._id, {$set: {paused: false}});
      if(game.turn=="red"){ // blue was paused, red is now unpausing
        Games.update(game._id, {$set: {redpaused: false, bluepaused: true, redendTime: newredEndTime, redpausedTime: null}});
      } else { // red was paused, blue is now unpausing
        Games.update(game._id, {$set: {redpaused: true, bluepaused: false, blueendTime: newblueEndTime, bluepausedTime: null}});
      }
    } else { // pausing the game
      if(game.turn=="red"){
        Games.update(game._id, {$set: {paused: true, redpaused: true, bluepaused: true, redpausedTime: currentServerTime}});
      } else {
        Games.update(game._id, {$set: {paused: true, redpaused: true, bluepaused: true, bluepausedTime: currentServerTime}});
      }
    }
  }
});