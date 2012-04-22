var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    Person = require("/Person");

function UseTrigger() {
    UseTrigger.superclass.constructor.call(this)
}

UseTrigger.inherit(PhysicsNode, {
    isUseTrigger: true,
    onUseCallback: null,
    
    trigger:function(person) {
        if (this.onUseCallback) {
            this.onUseCallback(person, this);
        }
    },
});

module.exports = UseTrigger;
