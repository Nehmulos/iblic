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
        
        // open
        var animationOpen = new cc.Animation({ 
            frames: animFrames,
            delay: 0.4 
        });
        var animateOpen   = new cc.Animate({
            animation: animationOpen, 
            restoreOriginalFrame: false
        });
        this.openSeq = new cc.Sequence({ 
            actions: [animateOpen] 
        });
        // close
        var animationClose = new cc.Animation({ 
            frames: animFrames.splice().reverse(),
            delay: 0.4 
        });
        var animateClose   = new cc.Animate({
            animation: animationClose, 
            restoreOriginalFrame: false
        });
        this.closeSeq = new cc.Sequence({ 
            actions: [animateClose] 
        });
    },
    
    open: function() {
        var _this = this;
        this.sprite.runAction(this.openSeq);
        //TODO ask if there is some thing like onAnimationEnded; didn't find it
        var interval = window.setInterval(function() {
            if (_this.openSeq.isDone) {
                console.log("DONE");
                window.clearInterval(interval);
            }
        }, 10);
    },
    
    close: function() {
        var _this = this;
        this.sprite.runAction(this.closeSeq);
        var interval = window.setInterval(function() {
            if (_this.openSeq.isDone) {
                console.log("DONE");
                window.clearInterval(interval);
            }
        }, 10);
    },
    
    update:function(dt) {
        Trapdoor.superclass.update.call(this, dt);
    },
});
