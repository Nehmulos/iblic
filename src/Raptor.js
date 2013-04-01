function Raptor() {
    Raptor.superclass.constructor.call(this)
}

Raptor.inherit(Person, {
    type: "raptor",
    
    loadTexture: function() {
        var texture = new cc.Texture2D({ file: "gfx/raptor.png" });

        var animFrames = [
            new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(130 * 0, 70 * 0, 130, 70) }),
            new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(130 * 1, 70 * 0, 130, 70) })
        ];

        this.sprite = new cc.Sprite({
            texture:texture,
            rect: animFrames[0].rect
        });
        
        var animation = new cc.Animation({ frames: animFrames, delay: 1.05 });
        var animate   = new cc.Animate({ animation: animation, restoreOriginalFrame: false });
        this.idleSeq  = new cc.Sequence({ actions: [animate] });
    },
    
    update:function(dt) {
    },
});
