function Trapdoor() {
    Trapdoor.superclass.constructor.call(this);
    this.loadTexture();
}

Trapdoor.inherit(PhysicsNode, {
    type: "trapdoor",
    isGround: true,
    
    loadTexture: function() {
        var texture = new cc.Texture2D({ file: "gfx/trapdoor.png" });

        var animFrames = [ new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(100 * 0, 44 * 0, 100, 44) })
                         , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(100 * 1, 44 * 0, 100, 44) })
                         , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(100 * 2, 44 * 0, 100, 44) })
        ];

        this.sprite = new cc.Sprite({
            texture:texture,
            rect: animFrames[0].rect
        });
        this.addChild(this.sprite);
        
        var animation = new cc.Animation({ frames: animFrames, delay: 0.4 })
          , animate   = new cc.Animate({ animation: animation, restoreOriginalFrame: false });
        this.openSeq  = new cc.Sequence({ actions: [animate] });
        this.sprite.runAction(new cc.RepeatForever(this.openSeq));
    },
    
    update:function(dt) {
        Trapdoor.superclass.update.call(this, dt);
    },
});
