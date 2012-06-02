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
    this.sprite.anchorPoint = new geom.Point(0.5,0.5);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

IceCream.inherit(MapPortal, {
    type: "icecream",
    eatDelay: 2,
    onEatCallback:null,
    
    trigger:function(player) {
        var self = this;
        var loadMap = function() {
            IceCream.superclass.trigger.call(self, player)
        }
        player.say([new TextLine({string:"yummie!", delay:this.eatDelay, onEndedCallback:loadMap})]);
        player.game.engine.playerProfile.addIceCream();
        
        if (this.onEatCallback) {
            this.onEatCallback();
        }
        this.destroyed = true;
    },
});

module.exports = IceCream;
