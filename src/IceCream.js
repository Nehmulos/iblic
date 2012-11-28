function IceCream() {
    IceCream.superclass.constructor.call(this)
    this.sprite = new cc.Sprite({
        file: "gfx/icecream.png",
        rect: new cc.Rect(0,0,64, 64)
    });
    this.sprite.anchorPoint = new cc.Point(0.5,0.5);
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
