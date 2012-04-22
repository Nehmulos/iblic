var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    UseTrigger = require("/UseTrigger");

function MapPortal() {
    MapPortal.superclass.constructor.call(this)
}

MapPortal.inherit(UseTrigger, {
    map: null,
    
    trigger:function(person) {
        person.useTrigger = null;
        person.game.loadMapByName(this.map);
        person.game.engine.playerProfile.addPortalsTaken();
        MapPortal.superclass.trigger.call(this, person);
    },
});

module.exports = MapPortal;
