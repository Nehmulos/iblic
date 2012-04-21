var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    Person = require("/Person");

function CallbackSensor() {
    CallbackSensor.superclass.constructor.call(this)
}

CallbackSensor.inherit(PhysicsNode, {
    type: "callbackSensor",
    playerTouchCallback:null,
    crateTouchCallback:null,
    
    trigger:function(source) {
        if (source.type == "player" && this.playerTouchCallback) {
            this.playerTouchCallback(source, this);
        }
        if (source.type == "crate" && this.crateTouchCallback) {
            this.crateTouchCallback(source, this);
        }
    },
});

module.exports = CallbackSensor;
