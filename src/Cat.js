var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    Person = require("/Person");

function Cat() {
    Cat.superclass.constructor.call(this);
    
    this.removeChild(this.sprite);
    var texture = new cocos.Texture2D({ file: "/gfx/cat.png" });

    var animFrames = [ new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 0, 32 * 0, 32, 32) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 1, 32 * 0, 32, 32) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 2, 32 * 0, 32, 32) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 1, 32 * 0, 32, 32) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 0, 32 * 0, 32, 32) })
    ];

    this.sprite = new cocos.nodes.Sprite({
        texture:texture,
        rect: animFrames[0].rect
    });
    
    var animation = new cocos.Animation({ frames: animFrames, delay: 0.4 })
      , animate   = new cocos.actions.Animate({ animation: animation, restoreOriginalFrame: false });
    this.idleSeq  = new cocos.actions.Sequence({ actions: [animate] });

    this.sprite.anchorPoint = new geom.Point(0,0);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
    
    this.sprite.stopAllActions();
    this.sprite.runAction(new cocos.actions.RepeatForever(this.idleSeq));
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
        opts.boundingBox = opts.boundingBox || new geom.Rect(0,0, 24,24);
        Cat.superclass.createPhysics.call(this, world, opts);
    },
    
    update:function(dt) {
        Cat.superclass.update.call(this, dt);
    },
});

module.exports = Cat;
