function Icemap2() {
    Icemap2.superclass.constructor.call(this)
    
}

Icemap2.inherit(Map, {

    loadEffect: function() {
        
    },

    setup: function(game) {
        this.game = game;
        
        this.waitToShowCredits = true;
        this.creditsTimer = 0;
        
        Icemap2.superclass.constructor.call(this, game)
        // Get size of canvas
        var s = cc.Director.sharedDirector.winSize
    
        var planet = new Planet();
        planet.position = new cc.Point(s.width/2, s.height/2);
        planet.createPhysics(game.world, {isStatic:true, shapeType:"circle"});
        game.planet = planet;
        game.addChild({child:planet});
        
        game.player.position = new cc.Point(s.width/2, s.height);
        game.player.rotation = 0;
        game.player.createPhysics(game.world, {restitution:0, fixedRotation:true});
        game.addChild({child:game.player});

        var crate = new Crate();
        crate.position = new cc.Point(s.width/4 + crate.contentSize.width, s.height);
        crate.createPhysics(game.world, {});
        game.addChild({child:crate});
        
        
        var leftSpikes = new Spikes();
        leftSpikes.position = new cc.Point(planet.position.x - planet.contentSize.width/2,
                                             planet.position.y);
        leftSpikes.rotation = 90;
        leftSpikes.createPhysics(game.world, {isStatic:true, boundingBox:leftSpikes.smallBox});
        game.addChild({child:leftSpikes});
        
        var rightSpikes = new Spikes();
        rightSpikes.position = new cc.Point(planet.position.x + planet.contentSize.width/2,
                                             planet.position.y);
        rightSpikes.rotation = 270;
        rightSpikes.createPhysics(game.world, {isStatic:true, boundingBox:rightSpikes.smallBox});
        game.addChild({child:rightSpikes});
        
        var deadlySign = new cc.Sprite({
            file: "gfx/deadlyspikessign.png",
            rect: new cc.Rect(0,0, 72, 71)
        });
        deadlySign.position = new cc.Point(s.width/2, s.height/2);
        deadlySign.zOrder = -1;
        deadlySign.rotation = 45;
        
        var moveAction = new cc.MoveTo({ 
            position: new cc.Point(s.width/2 + 110, s.height/2 + 110),
            duration: 1
        })
        
        deadlySign.runAction(moveAction);
        game.addChild({child:deadlySign});
        
        var spawnIceCream = function() {
            var ice = new IceCream();
            ice.position = new cc.Point(s.width/2, 0);
            ice.rotation = 180;
            ice.createPhysics(game.world, {shapeType:"circle"});
            ice.map = "ParallelWorld1";
            game.addChild({child:ice});
        }
        // ps bar 400,135
        
        game.player.say([new TextLine({string: "I'm still hungry", delay:2, onEndedCallback: spawnIceCream})
        ]);
    },
    
    
    showCredits: function() {
        var s = cc.Director.sharedDirector.winSize
        var credits = new cc.Sprite({
            file: "gfx/credits.png",
            rect: new cc.Rect(0,0, 133, 45)
        });
        credits.anchorPoint = new cc.Point(1,1);
        credits.position = new cc.Point(s.width, 0);
        credits.zOrder = 10;
        
        var moveAction = new cc.MoveTo({ 
            position: new cc.Point(s.width, 45),
            duration: 2
        })
        
        credits.runAction(moveAction);
        this.game.addChild({child:credits});            
    },
    
    update:function(dt) {
        if (this.waitToShowCredits) {
            if (this.creditsTimer > 0) {
                this.creditsTimer -= dt;
            } else {
                this.showCredits();
                this.waitToShowCredits = false;
            }
        }
    },
});

