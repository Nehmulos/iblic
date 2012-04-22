var cocos = require("cocos2d"),
    ParallelWorld1 = require("/maps/ParallelWorld1"),
    Ph0toshop = require("/maps/Ph0toshop"),
    StartScreen = require("/maps/StartScreen"),
    Icemap2 = require("/maps/Icemap2"),
    Credits = require("/maps/Credits")

function Maplist() {
    Maplist.superclass.constructor.call(this)
    this.maps["Startmap"] = this.maps["StartScreen"];
}

Maplist.inherit(Object, {
    maps: {"ParallelWorld1": new ParallelWorld1(),
           "Ph0toshop":      new Ph0toshop(),
           "StartScreen":    new StartScreen(),
           "Icemap2":        new Icemap2(),
           "Credits":        new Credits()
    }
});

module.exports = Maplist;
