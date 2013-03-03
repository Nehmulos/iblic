function UfoWelcomeMap() {
    UfoWelcomeMap.superclass.constructor.call(this)
    
}

UfoWelcomeMap.inherit(Map, {

    loadEffect: function() {
        
    },

    setup: function(game) {
        var _this = this;
        var s = cc.Director.sharedDirector.winSize;
        UfoWelcomeMap.superclass.constructor.call(this, game)
        this.game = game;
        
        game.player.position = new cc.Point(62, s.height/2+200);
        game.player.rotation = 0;
        game.player.createPhysics(game.world, {fixedRotation:true});
        game.player.body.SetAngle(cc.degreesToRadians(0));
        game.player.zOrder = 2;
        game.player.flipX = false;
        game.addChild(game.player);
        
        this.game.world.SetGravity(new b2Vec2(0,-55));
        var background = new cc.Sprite({
            file:"gfx/UfoWelcomeMap.png"
        });
        background.position = new cc.Point(s.width/2,s.height/2);
        game.addChild(background);
        
        var ground = new PhysicsNode();
        ground.position = new cc.Point(background.contentSize.width/2, (s.height/2)-45);
        ground.createPhysics(game.world, {isStatic:true, boundingBox:new cc.Rect(0,0,background.contentSize.width,10)});
        ground.isGround = true;
    
        this.playerFinishedTalking = false;
        game.player.say([new TextLine({string: "Hello?", delay:2, onEndedCallback: function() {
            _this.playerFinishedTalking = true;
        }
        })
        ]);
        
        var alien1 = new Alien();
        var alien2 = new Alien();
        alien1.position = new cc.Point(450, 310);
        alien2.position = new cc.Point(450+ alien1.contentSize.width, 310);
        game.addChild(alien1);
        game.addChild(alien2);
    },
    
    update:function(dt) {
    },
});

