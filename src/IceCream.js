var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    MapPortal = require("/MapPortal");

function IceCream() {
    IceCream.superclass.constructor.call(this)
    this.sprite = new cocos.nodes.Sprite({
        file: "/gfx/icecream.png",
        rect: new geom.Rect(0,0,64, 64)
    });
    this.sprite.anchorPoint = new geom.Point(0,0);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

IceCream.inherit(MapPortal, {
    type: "icecream",
    trigger:function() {
        IceCream.superclass.trigger.call(this)
        GameEngine.instance.playerProfile.icecream++;
    },
});

module.exports = IceCream;
