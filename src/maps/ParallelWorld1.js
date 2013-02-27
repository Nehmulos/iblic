function ParallelWorld1() {
    ParallelWorld1.superclass.constructor.call(this)
    
}

ParallelWorld1.inherit(Map, {
    ufoTime:false,

    loadEffect: function() {
        
    },

    setup: function(game) {
        this.game = game;
        ParallelWorld1.superclass.constructor.call(this, game)
        
        this.ufoTime = false;
        
        // Get size of canvas
        var s = cc.Director.sharedDirector.winSize
    
        var planet = new Planet();
        planet.position = new cc.Point(s.width/2, s.height/2);
        planet.createPhysics(game.world, {isStatic:true, shapeType:"circle"});
        game.planet = planet;
        game.addChild({child:planet});
        
        for (var i=0; i < 1; ++i) {
            var crate = new Crate();
            crate.position = new cc.Point(s.width/4 + (crate.contentSize.width*(i+1)), 0);
            crate.createPhysics(game.world, {});
            game.addChild({child:crate});
        }
        var spawnPh0toshop = function(fadeType) {
        
        
            var ph0toshop = new cc.Sprite({
                file: "gfx/ph0toshop.png",
                rect: new cc.Rect(0,0, 188, 149)
            });
            ph0toshop.position = new cc.Point(s.width/2, s.height/2);
            ph0toshop.zOrder = -1;
            ph0toshop.rotation = 180;
            
            if (fadeType === "instant") {
                ph0toshop.position = new cc.Point(s.width/2, s.height/2 - 165);
            } else {
                var moveAction = new cc.MoveTo({ 
                    position: new cc.Point(s.width/2, s.height/2 - 165),
                    duration: 2
                })
            
                ph0toshop.runAction(moveAction);
            }
            game.addChild({child:ph0toshop});
            
            var cbs = new MapPortal({
            
            });
            cbs.position = new cc.Point(s.width/2, s.height/2 - 128);
            cbs.contentSize = new cc.Size(20,20);
            cbs.map = "Ph0toshop";
            cbs.createPhysics(game.world, {isSensor:true, isStatic:true});
            cbs.playerTouchCallback = function(player) {
                player.say([new TextLine({string: 'press "S" to enter buildins', delay:0})]);
            }
        }
        // ps bar 400,135
        
        if (!game.engine.playerProfile.getDecision("pw1.dizzyEnter")) {
            game.engine.playerProfile.setDecision("pw1.dizzyEnter", true);
            
            game.player.position = new cc.Point(s.width/2, s.height);
            game.player.rotation = 0;
            
            game.player.say([new TextLine({string: 'WOW, what happend!?!', delay:1.3}),
                         new TextLine({string: 'Everything looks so different.', delay:2}),
                         new TextLine({string: 'Like some crazy paralell world.', delay:2}),
                         new TextLine({string: 'I should investigate further.', delay:1.3, onEndedCallback: spawnPh0toshop})
            ]);
        } else {
            spawnPh0toshop("instant");
            game.player.position = new cc.Point(s.width/2 + 40, s.height/2 - 165);
            game.player.rotation = 160;
            
            var cat = new Cat();
            cat.position = new cc.Point(s.width/2 + 90, s.height/2 - 140);
            cat.createPhysics(game.world, {fixedRotation:true});
            cat.textColor = "yellow";
            cat.game = game;
            cat.say([new TextLine({string: 'meow!', delay:2})
            ]);
            game.addChild({child:cat});
            
            if (game.engine.playerProfile.getDecision("ps.talkedWithShopkeeper1")) {
                var ironbar = new Ironbar();
                ironbar.position = new cc.Point(s.width/2, s.height-60);
                ironbar.createPhysics(game.world, {isStatic:true});
                ironbar.isGround = false;
                game.addChild({child:ironbar});
                
                var ice = new IceCream();
                ice.position = new cc.Point(s.width/2, s.height);
                ice.createPhysics(game.world, {});
                ice.map = "Ep1-Credits";
                ice.eatDelay = 5;
                var self = this;
                ice.onEatCallback = function() {
                    console.log("ufo time!");
                    self.ufoTime = true;
                    var ufo = new cc.Sprite({
                        file: "gfx/ufo.png",
                        rect: new cc.Rect(0,0, 128, 88)
                    });
                    ufo.position = new cc.Point(0 - ufo.contentSize.width/2, s.height - ufo.contentSize.height/2);
                    ufo.zOrder = 10;
                    
                    var seq = new cc.Sequence({ actions:[
                        new cc.MoveTo({
                            position: new cc.Point(s.width/2, ufo.position.y),
                            duration: 1.5
                        }),
                        new cc.MoveTo({
                            position: new cc.Point(s.width/2, ufo.position.y),
                            duration: 2
                        }),
                        new cc.MoveTo({
                            position: new cc.Point(s.width+ ufo.contentSize.width, ufo.position.y),
                            duration: 1.5
                        }),
                    ]});
                
                    ufo.runAction(seq);
                    game.addChild({child:ufo});
                    
                    game.player.body.SetLinearVelocity(new b2Vec2(0,0));
                    game.player.body.ApplyTorque(90);
                    game.player.canMove = false;
                }
                game.addChild({child:ice});
            }
        }
        
        game.player.createPhysics(game.world, {restitution:0, fixedRotation:true});
        game.addChild({child:game.player});
    },
    
    update:function(dt) {
        if (this.ufoTime && this.game.player.sprite.opacity >= 2) {
            console.log("decline");
            this.game.player.sprite.opacity -= 2;
        }
    },
});

