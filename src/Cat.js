function Cat() {
    Cat.superclass.constructor.call(this);
    
    this.removeChild(this.sprite);
    var texture = new cc.Texture2D({ file: "/gfx/cat.png" });

    var animFrames = [ new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 0, 32 * 0, 32, 32) })
                     , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 1, 32 * 0, 32, 32) })
                     , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 2, 32 * 0, 32, 32) })
                     , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 1, 32 * 0, 32, 32) })
                     , new cc.SpriteFrame({ texture: texture, rect: new cc.Rect(32 * 0, 32 * 0, 32, 32) })
    ];

    this.sprite = new cc.Sprite({
        texture:texture,
        rect: animFrames[0].rect
    });
    
    var animation = new cc.Animation({ frames: animFrames, delay: 0.4 })
      , animate   = new cc.Animate({ animation: animation, restoreOriginalFrame: false });
    this.idleSeq  = new cc.Sequence({ actions: [animate] });

    this.sprite.anchorPoint = new cc.Point(0.5,0.5);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
    
    this.sprite.stopAllActions();
    this.sprite.runAction(new cc.RepeatForever(this.idleSeq));
}

Cat.inherit(Person, {
    type: "cat",
    specialSay: false,
    
    onDeathCallback: function() {

    },
    
    randomMeow: function() {
        if (this.specialSay) {
            return;
        }
        if (this.textLine && !this.specialSay) {
            this.textLine.timePassed = 9001;
            this.lineQueue = [];
        }
        
        var val = rrandom(0, 10000);
        if (val < 10) {
            var self = this;
            this.specialSay = true;
            this.say([new TextLine({string:"I'm an international cat!", delay:3}),
                      new TextLine({string:"Іллюмінати створили цю гру 200 років тому", delay:4}),
                      new TextLine({string:"יש לך גידול במוח", delay:4}),
                      new TextLine({string:"Schau mal unter deinen Stuhl.", delay:3,
                        onEndedCallback:function() {
                            self.specialSay = false;
                        }})
                      ]);
        } else if (val < 5000) {
            this.say([new TextLine({string:"meow!", delay:2})]);
        } else if (val < 7000) {
            this.say([new TextLine({string:"miau!", delay:2})]);
        } else {
            this.say([new TextLine({string:"nyan!", delay:1})]);
        }
    },
    
    createPhysics:function(world, opts) {
        opts.boundingBox = opts.boundingBox || new cc.Rect(0,0, 24,24);
        Cat.superclass.createPhysics.call(this, world, opts);
    },
    
    update:function(dt) {
        Cat.superclass.update.call(this, dt);
    },
});
