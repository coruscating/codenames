(function(){
Template.body.addContent((function() {
  var view = this;
  return "";
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("main");
Template["main"] = new Template("Template.main", (function() {
  var view = this;
  return HTML.DIV({
    "class": function() {
      return [ "container lang-", Spacebars.mustache(view.lookup("language")) ];
    }
  }, "\n    ", HTML.DIV({
    "class": "main-content"
  }, "\n      ", Blaze._TemplateWith(function() {
    return {
      template: Spacebars.call(view.lookup("whichView"))
    };
  }, function() {
    return Spacebars.include(function() {
      return Spacebars.call(Template.__dynamic);
    });
  }), "\n\n      ", Spacebars.include(view.lookupTemplate("footer")), "\n    "), "\n  ");
}));

Template.__checkName("startMenu");
Template["startMenu"] = new Template("Template.startMenu", (function() {
  var view = this;
  return HTML.DIV({
    "class": "main-menu",
    style: "padding: 8vw 0 8vw 0;"
  }, HTML.Raw('\n    <h3>Codenames</h3>\n\n    <hr>\n    <br>\nRoom: <select id="room">\n<option value="Amethyst">Amethyst</option>\n<option value="Beryl">Beryl</option>\n<option value="Coral">Coral</option>\n<option value="Diamond">Diamond</option>\n<option value="Emerald">Emerald</option>\n<option value="Garnet">Garnet</option>\n<option value="Jade">Jade</option>\n<option value="Lapis">Lapis Lazuli</option>\n<option value="Opal">Opal</option>\n<option value="Pearl">Pearl</option>\n<option value="Quartz">Quartz</option>\n<option value="Ruby">Ruby</option>\n<option value="Sapphire">Sapphire</option>\n<option value="Topaz">Topaz</option>\n<option value="Zircon">Zircon</option>\n</select>\n<br>'), Blaze.View(function() {
    return Spacebars.mustache(view.lookup("_"), view.lookup("occupied"));
  }), HTML.Raw('\n<br><br>\n    <div id="spymaster" class="join-game"></div>\n    <div id="operative" class="join-game"></div>\n'));
}));

Template.__checkName("lobby");
Template["lobby"] = new Template("Template.lobby", (function() {
  var view = this;
  return HTML.DIV({
    style: "padding: 3vw 0 3vw 0;"
  }, "\n\n", HTML.DIV({
    style: "width:25%;float: left;text-align:left;"
  }, "\n\n", HTML.Raw('<input type="button" value="New Game" class="btn-refresh-list">'), HTML.Raw("<br>"), "\n\n", HTML.Raw('<button id="down"><div style="font-size:1.5em;">-</div></button>'), HTML.Raw("&nbsp;"), HTML.Raw('<button id="up"><div style="font-size:1.5em;">+</div></button>'), HTML.Raw("&nbsp;"), HTML.Raw("&nbsp;"), Blaze.View(function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("game"), "lengthInMinutes"));
  }), " minutes\n", HTML.Raw("<br>"), HTML.Raw("<br>"), "\n\n", Blaze.View(function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("game"), "totalnum"));
  }), " names:\n", HTML.Raw("<br>"), HTML.Raw("<br>"), "\n\n    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("listofwordlists"));
  }, function() {
    return [ "\n    ", HTML.BUTTON({
      "class": "down",
      id: function() {
        return [ Spacebars.mustache(view.lookup("_"), view.lookup("name")), "down" ];
      }
    }, HTML.DIV({
      style: "font-size:1.5em;",
      id: function() {
        return [ Spacebars.mustache(view.lookup("_"), view.lookup("name")), "down2" ];
      }
    }, "-")), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.BUTTON({
      "class": "up",
      id: function() {
        return [ Spacebars.mustache(view.lookup("_"), view.lookup("name")), "up" ];
      }
    }, HTML.DIV({
      style: "font-size:1.5em;",
      id: function() {
        return [ Spacebars.mustache(view.lookup("_"), view.lookup("name")), "up2" ];
      }
    }, "+")), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.LABEL({
      "for": function() {
        return Spacebars.mustache(view.lookup("_"), view.lookup("name"));
      }
    }, Blaze.View(function() {
      return Spacebars.mustache(view.lookup("_"), view.lookup("num"));
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("_"), view.lookup("label"));
    }), " (", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("_"), view.lookup("len"));
    }), ")"), HTML.BR(), "\n", HTML.DIV({
      id: function() {
        return [ "slider-", Spacebars.mustache(view.lookup("_"), view.lookup("name")) ];
      },
      "class": "sliders"
    }), "\n" ];
  }), "\n", HTML.Raw("<!-- checked={{isChecked name}} -->"), "\n"), HTML.DIV({
    "class": "status-container"
  }, "  \n", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("test"));
  }), "\n  ", HTML.UL({
    "class": "location-list lobby"
  }, "\n    ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("game"), "locationlist"));
  }, function() {
    return [ "\n\n      ", HTML.LI({
      "class": "location-unrevealed",
      style: function() {
        return [ "height: ", Spacebars.mustache(view.lookup("_"), view.lookup("height")), "vw;" ];
      }
    }, "\n        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isImage"), view.lookup("displayname"));
    }, function() {
      return [ " ", HTML.DIV({
        "class": "location-name"
      }, HTML.IMG({
        src: function() {
          return Spacebars.mustache(view.lookup("_"), view.lookup("displayname"));
        }
      })), "\n        " ];
    }, function() {
      return [ "\n          ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("isSymbol"), view.lookup("displayname"));
      }, function() {
        return [ "\n          ", HTML.DIV({
          "class": "location-name"
        }, HTML.SPAN({
          "class": "location-inner",
          style: "font-size:180%;"
        }, Blaze.View(function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("_"), view.lookup("displayname")));
        }))), "\n          " ];
      }, function() {
        return [ " ", HTML.DIV({
          "class": "location-name"
        }, HTML.SPAN({
          "class": "location-inner"
        }, Blaze.View(function() {
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("_"), view.lookup("displayname")));
        }))), " " ];
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  "), "\n\n\n\n\n\n\n  ", HTML.Raw('<div class="button-container">\n    <button class="btn-start">Start Game</button>\n    <button class="btn-leave">Back</button>\n  </div>')), "\n");
}));

Template.__checkName("gameView");
Template["gameView"] = new Template("Template.gameView", (function() {
  var view = this;
  return HTML.DIV({
    style: "padding: 3vw 0 3vw 0;"
  }, "\n", HTML.DIV({
    style: "width:20%;float: left;"
  }, " ", HTML.CENTER(HTML.H5("\n", HTML.DIV({
    style: "width:8vw;float:left;"
  }, HTML.A({
    href: "#",
    "class": function() {
      return [ "blue ", Blaze.If(function() {
        return Spacebars.call(view.lookup("gameFinished"));
      }, function() {
        return "finished";
      }), " ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("game"), "bluepaused"));
      }, function() {
        return "paused";
      }) ];
    }
  }, Blaze.View(function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("bluetimeRemaining")));
  }))), "\n\n\n", HTML.DIV(HTML.A({
    href: "#",
    "class": function() {
      return [ "red ", Blaze.If(function() {
        return Spacebars.call(view.lookup("gameFinished"));
      }, function() {
        return "finished";
      }), " ", Blaze.If(function() {
        return Spacebars.call(Spacebars.dot(view.lookup("game"), "redpaused"));
      }, function() {
        return "paused";
      }) ];
    }
  }, Blaze.View(function() {
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("redtimeRemaining")));
  })))), "\n\n", HTML.H5(HTML.DIV({
    style: "width:8vw;float:left;",
    "class": "blue"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("bluescore"));
  }), "/", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("bluetotal"));
  })), "\n", HTML.DIV({
    "class": "red"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("redscore"));
  }), "/", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("redtotal"));
  })), "\n"), "\n"), "\n", HTML.Raw("<hr>"), "\n\n ", HTML.Raw('<!-- <button class="btn-toggle-status">{{_ "ui.show hide" }}</button>-->'), "\n", Blaze.If(function() {
    return Spacebars.call(view.lookup("isBlue"));
  }, function() {
    return [ "\n        ", HTML.H5("Spymaster"), "\n      " ];
  }), "\n\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isRed"));
  }, function() {
    return [ "\n        ", HTML.H5("Spymaster"), "\n      " ];
  }), "\n\n\n", HTML.H5(HTML.SPAN({
    "class": function() {
      return [ Blaze.If(function() {
        return Spacebars.call(view.lookup("redTurn"));
      }, function() {
        return "red";
      }), " ", Blaze.If(function() {
        return Spacebars.call(view.lookup("blueTurn"));
      }, function() {
        return "blue";
      }) ];
    }
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("statustext"));
  }))), HTML.Raw("<br>"), "\n\n", Blaze.If(function() {
    return Spacebars.call(view.lookup("isRed"));
  }, function() {
    return [ "\n", HTML.INPUT({
      type: "text",
      name: "clue",
      id: "clue",
      style: "width:70%;"
    }), "\n", HTML.SELECT({
      id: "cluenum",
      style: "width:20%;"
    }, "\n ", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("game"), "cluenums"));
    }, function() {
      return [ "\n  ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("."));
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("."));
      })), "\n  " ];
    }), "-->\n"), "\n", HTML.CENTER(HTML.DIV({
      "class": "select-button select-button-red"
    }, "clue!")), "\n" ];
  }), "\n\n", Blaze.If(function() {
    return Spacebars.call(view.lookup("isBlue"));
  }, function() {
    return [ "\n", HTML.INPUT({
      type: "text",
      name: "clue",
      id: "clue",
      style: "width:70%;"
    }), "\n", HTML.SELECT({
      id: "cluenum",
      style: "width:20%;"
    }, "\n ", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("game"), "cluenums"));
    }, function() {
      return [ "\n  ", HTML.OPTION({
        value: function() {
          return Spacebars.mustache(view.lookup("."));
        }
      }, Blaze.View(function() {
        return Spacebars.mustache(view.lookup("."));
      })), "\n  " ];
    }), "-->\n"), "\n", HTML.CENTER(HTML.DIV({
      "class": "select-button select-button-blue"
    }, "clue!")), "\n" ];
  }), "\n\n\n", HTML.Raw("<br>"), HTML.Raw("<br>"), "\n\n", HTML.Raw("<!--\n<h5><span class=blue>Blue: {{ bluescore }}/{{ bluetotal }}</span><br>\n<span class=red>Red: {{ redscore }}/{{ redtotal }}</span></h5><br>-->"), "\n", HTML.Raw("<br>"), "\n", HTML.Raw('<button class="btn-pass">Pass turn</button>'), "\n", HTML.Raw("<br>"), HTML.Raw("<br>"), "\n", HTML.BUTTON({
    "class": "btn-pause"
  }, Blaze.If(function() {
    return Spacebars.call(view.lookup("pausetext"));
  }, function() {
    return "un";
  }), "pause"), "\n", HTML.Raw("<br>"), "\n", HTML.Raw('<button class="btn-reset">Reset timers</button>'), "\n"), "\n  ", HTML.DIV({
    "class": "status-container"
  }, "\n \n\n\n\n  ", HTML.Raw('<div class="u-cf"></div>'), "\n\n", Blaze.If(function() {
    return Spacebars.call(view.lookup("isNeutral"));
  }, function() {
    return [ "\n\n", HTML.UL({
      "class": "location-list"
    }, "\n    ", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("game"), "locationlist"));
    }, function() {
      return [ "\n      ", HTML.LI({
        "class": function() {
          return [ "location-", Spacebars.mustache(view.lookup("_"), view.lookup("reveal")) ];
        },
        id: function() {
          return [ "location-", Spacebars.mustache(view.lookup("_"), view.lookup("name")) ];
        },
        style: function() {
          return [ "height: ", Spacebars.mustache(view.lookup("_"), view.lookup("height")), "vw;" ];
        }
      }, "\n        ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("isImage"), view.lookup("displayname"));
      }, function() {
        return [ " ", HTML.DIV({
          "class": "location-name",
          style: function() {
            return [ "padding: 0;min-height: ", Spacebars.mustache(view.lookup("_"), view.lookup("height")), "vw;" ];
          }
        }, HTML.IMG({
          src: function() {
            return Spacebars.mustache(view.lookup("_"), view.lookup("displayname"));
          }
        })), "\n        " ];
      }, function() {
        return [ "\n          ", Blaze.If(function() {
          return Spacebars.dataMustache(view.lookup("isSymbol"), view.lookup("displayname"));
        }, function() {
          return [ "\n          ", HTML.DIV({
            "class": "location-name"
          }, HTML.SPAN({
            "class": "location-inner",
            style: "font-size:180%;"
          }, Blaze.View(function() {
            return Spacebars.makeRaw(Spacebars.mustache(view.lookup("_"), view.lookup("displayname")));
          }))), "\n          " ];
        }, function() {
          return [ " ", HTML.DIV({
            "class": "location-name"
          }, " ", HTML.SPAN({
            "class": "location-inner"
          }, Blaze.View(function() {
            return Spacebars.makeRaw(Spacebars.mustache(view.lookup("_"), view.lookup("displayname")));
          }))), " " ];
        }), "\n        " ];
      }), "\n      "), "\n    " ];
    }), "\n  "), "\n\n  " ];
  }, function() {
    return [ "\n  ", HTML.UL({
      "class": "location-list"
    }, "\n    ", Blaze.Each(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("game"), "locationlist"));
    }, function() {
      return [ "\n    ", HTML.LI({
        "class": function() {
          return [ "location-", Spacebars.mustache(view.lookup("_"), view.lookup("type")), " spymaster-", Spacebars.mustache(view.lookup("_"), view.lookup("reveal")) ];
        },
        style: function() {
          return [ "height: ", Spacebars.mustache(view.lookup("_"), view.lookup("height")), "vw;" ];
        }
      }, "\n        ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("isImage"), view.lookup("displayname"));
      }, function() {
        return [ " ", HTML.DIV({
          "class": "location-name",
          style: "padding: 0; height:100%"
        }, HTML.IMG({
          src: function() {
            return Spacebars.mustache(view.lookup("_"), view.lookup("displayname"));
          }
        })), "\n        " ];
      }, function() {
        return [ "\n          ", Blaze.If(function() {
          return Spacebars.dataMustache(view.lookup("isSymbol"), view.lookup("displayname"));
        }, function() {
          return [ "\n          ", HTML.DIV({
            "class": "location-name"
          }, HTML.SPAN({
            "class": "location-inner",
            style: "font-size:180%;"
          }, Blaze.View(function() {
            return Spacebars.makeRaw(Spacebars.mustache(view.lookup("_"), view.lookup("displayname")));
          }))), "\n          " ];
        }, function() {
          return [ " ", HTML.DIV({
            "class": "location-name"
          }, " ", HTML.SPAN({
            "class": "location-inner"
          }, Blaze.View(function() {
            return Spacebars.makeRaw(Spacebars.mustache(view.lookup("_"), view.lookup("displayname")));
          }))), " " ];
        }), "\n        " ];
      }), "\n    "), "\n    " ];
    }), "\n  "), "\n\n  " ];
  }), "\n  \n\n  ", HTML.Raw('<div class="button-container">\n\n    <button class="btn-end">Back</button>\n  \n  </div>'), "\n  "), "\n  ");
}));

Template.__checkName("footer");
Template["footer"] = new Template("Template.footer", (function() {
  var view = this;
  return HTML.DIV({
    "class": "footer",
    style: "clear:both;"
  }, "\n    ", HTML.SPAN({
    "class": function() {
      return [ "room-", Spacebars.mustache(view.lookup("room")) ];
    }
  }, HTML.Raw('<i class="fa fa-diamond" aria-hidden="true"></i>'), " ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("room"));
  })), HTML.Raw(' \n    <br>\n    <a href="/rules.pdf" target="_blank">Rules</a>\n  '));
}));

})();
