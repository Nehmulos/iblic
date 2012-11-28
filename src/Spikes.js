function Spikes() {
    Spikes.superclass.constructor.call(this)
    this.sprite = new cc.Sprite({
        file: "gfx/spikes.png",
        rect: new cc.Rect(0,0,64, 43)
    });
    this.sprite.anchorPoint = new cc.Point(0.5,0.5);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

Spikes.inherit(PhysicsNode, {
    type:"spikes",
    isDeadly: true,
    smallBox: new cc.Rect(0,0, 50, 40)
});
