function Ph0toshop() {
    Ph0toshop.superclass.constructor.call(this)
    
}

Ph0toshop.inherit(Map, {

    loadEffect: function() {
        
    },

    setup: function(game) {
        this.game = game;
        Ph0toshop.superclass.constructor.call(this, game)
        // Get size of canvas
        var s = cc.Director.sharedDirector.winSize
        
        this.game.world.SetGravity(new b2Vec2(0,-40));
    /*
        var planet = new Planet();
        planet.position = new geom.Point(s.width/2, s.height/2);
        planet.createPhysics(game.world, {isStatic:true, shapeType:"circle"});
        game.planet = planet;
        game.addChild({child:planet});
    */
        var background = new cc.Sprite({
            file:"/gfx/insideph0toshop.png",
            rect: new geom.Rect(0,0, 592, 210)
        });
        background.anchorPoint = new geom.Point(0,1);
        background.position = new geom.Point(0, s.height/2 + background.contentSize.height/2);
        game.addChild({child:background});
        
        var bar = new cc.Sprite({
            file:"/gfx/insideph0toshopbar.png",
            rect: new geom.Rect(0,0, 149, 56)
        });
        bar.anchorPoint = new geom.Point(0,1);
        bar.position = new geom.Point(background.position.x + 330, background.position.y - 120);
        bar.zOrder = 1;
        game.addChild({child:bar});
        
        game.player.position = new geom.Point(62, s.height/2-41);
        game.player.rotation = 0;
        game.player.createPhysics(game.world, {fixedRotation:true});
        game.player.body.SetAngle(geom.degreesToRadians(0));
        game.player.zOrder = 2;
        game.player.flipX = false;
        game.addChild({child:game.player});

        /*
        var crate = new Crate();
        crate.position = new geom.Point(s.width/4 + (crate.contentSize.width), 0);
        crate.createPhysics(game.world, {});
        game.addChild({child:crate});
        */
        
        var door = new MapPortal({});
        door.position = new geom.Point(20, s.height/2);
        door.contentSize = new geom.Size(40,60);
        door.map = "ParallelWorld1";
        door.createPhysics(game.world, {isSensor:true, isStatic:true});
        
        var ground = new PhysicsNode();
        ground.position = new geom.Point(background.contentSize.width/2, (s.height/2)-80);
        ground.createPhysics(game.world, {isStatic:true, boundingBox:new geom.Rect(0,0,background.contentSize.width,10)});
        ground.isGround = true;
        
        var leftWall = new PhysicsNode();
        leftWall.position = new geom.Point(0, s.height/2);
        leftWall.createPhysics(game.world, {isStatic:true, boundingBox:new geom.Rect(0,0,30,s.height)});
        
        var rightWall = new PhysicsNode();
        rightWall.position = new geom.Point(background.contentSize.width-35, s.height/2);
        rightWall.createPhysics(game.world, {isStatic:true, boundingBox:new geom.Rect(0,0,30,s.height)});
        
        var barman = new Person();
        barman.sprite.flipX = true;
        barman.position = new geom.Point(bar.position.x + (bar.contentSize.width/4)*3, bar.position.y);
        game.addChild({child:barman});
        barman.createPhysics(game.world, {isStatic:true, isSensor:true});
        barman.textColor = "lightgreen";
        barman.say([new TextLine({string: 'Customers!', delay:2})]);
        
        var talkRegion = new UseTrigger();
        talkRegion.position = bar.position;
        talkRegion.contentSize = new geom.Size(bar.contentSize.width + 80,300);
        talkRegion.createPhysics(game.world, {isSensor:true, isStatic:true});
        talkRegion.onUseCallback = function() {
            
            if (!game.engine.playerProfile.getDecision("ps.talkedWithShopkeeper1")) {
                
                if (!game.player.textLine && !barman.textLine) {
    
                    // oh no the horror
                    game.player.say([new TextLine({string: 'Hi, do you have icecream?',delay:3, 
                        onEndedCallback:function() {
                            barman.say([new TextLine({string: "We're a photomarket! we develop your photos!",delay:4,
                                onEndedCallback:function() {
                                    game.engine.playerProfile.setDecision("ps.talkedWithShopkeeper1", true);
                                }}),
                                        new TextLine({string: "but I think that I sill have some outside.",delay:4}),
                                        new TextLine({string: "If you find it you can keep it.",delay:3}),
                                        new TextLine({string: "and that's cutting me own throat.",delay:3,
                                onEndedCallback:function() {
                                    game.player.say([new TextLine({string: 'Uhm... thanks!',delay:2})]);
                                }                        
                            })]);                
                        }
                    })]);
                }
            } else {
                if (!barman.textLine) {
                    barman.say([new TextLine({string: "Buy something, or go away.",delay:2})]);
                }
            }
        }
    },
    
    update:function(dt) {
    },
});
