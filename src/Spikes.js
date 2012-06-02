var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input");

function Spikes() {
    Spikes.superclass.constructor.call(this)
    this.sprite = new cocos.nodes.Sprite({
        file: "/gfx/spikes.png",
        rect: new geom.Rect(0,0,64, 43)
    });
    this.sprite.anchorPoint = new geom.Point(0.5,0.5);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

Spikes.inherit(PhysicsNode, {
    type:"spikes",
    isDeadly: true,
    smallBox: new geom.Rect(0,0, 50, 40)
});

module.exports = Spikes;
