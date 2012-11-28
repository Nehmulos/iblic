function Crate() {
    type:"crate",
    Crate.superclass.constructor.call(this)
    this.sprite = new cc.Sprite({
        file: "/gfx/crate.png",
        rect: new cc.Rect(0,0,32, 32)
    });
    this.sprite.anchorPoint = new cc.Point(0.5,0.5);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

Crate.inherit(PhysicsNode, {
    isGround:true
});
