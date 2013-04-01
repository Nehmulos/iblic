function Alien() {
    Alien.superclass.constructor.call(this)
}

Alien.inherit(Person, {
    type: "alien",
    
    loadTexture: function() {
        var texture = new cc.Texture2D({ file: "gfx/alien.png" });

        var animFrames = [ new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 0, 64 * 0, 32, 64) })
                         , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 1, 64 * 0, 32, 64) })
                         , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 2, 64 * 0, 32, 64) })
                         , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 1, 64 * 0, 32, 64) })
        ];

        this.sprite = new cc.Sprite({
            texture:texture,
            rect: animFrames[0].rect
        });
        
        var animation = new cc.Animation({ frames: animFrames, delay: 0.2 })
          , animate   = new cc.Animate({ animation: animation, restoreOriginalFrame: false });
        this.idleSeq  = new cc.Sequence({ actions: [animate] });
    },
    
    update:function(dt) {
        Alien.superclass.update.call(this, dt);
        
        // w pressed
        if (Input.instance.keysDown[87]) {
            this.jump();
        }
        
        // s pressed
        if (Input.instance.keysDown[83]) {
            this.useAction();
        }
        
        // a pressed
        if (Input.instance.keysDown[65]) {
            this.goRight();
        }

        // d pressed
        if (Input.instance.keysDown[68]) {
            this.goLeft();
        }
    },
});
