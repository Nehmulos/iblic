function Ironbar() {
    type:"ironbar",
    Ironbar.superclass.constructor.call(this)
    this.sprite = new cc.Sprite({
        file: "gfx/ironbar.png",
        rect: new cc.Rect(0,0,224, 20)
    });
    this.sprite.anchorPoint = new cc.Point(0.5,0.5);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

Ironbar.inherit(PhysicsNode, {
    isGround:true
});

