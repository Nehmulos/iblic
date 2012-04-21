var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input");

function Crate() {
    type:"crate",
    Crate.superclass.constructor.call(this)
    this.sprite = new cocos.nodes.Sprite({
        file: "/gfx/crate.png",
        rect: new geom.Rect(0,0,32, 32)
    });
    this.sprite.anchorPoint = new geom.Point(0,0);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

Crate.inherit(PhysicsNode, {

});

module.exports = Crate;
