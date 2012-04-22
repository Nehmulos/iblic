var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    Map = require("/Map"),
    Person = require("/Person"),
    Planet = require("/Planet"),
    Crate  = require("/Crate"),
    IceCream  = require("/IceCream"),
    MapPortal = require("/MapPortal"),
    Spikes = require("/Spikes");

function Icemap2() {
    Icemap2.superclass.constructor.call(this)
    
}

Icemap2.inherit(Map, {

    loadEffect: function() {
        
    },

    setup: function(game) {
        this.game = game;
        Icemap2.superclass.constructor.call(this, game)
        // Get size of canvas
        var s = cocos.Director.sharedDirector.winSize
    
        var planet = new Planet();
        planet.position = new geom.Point(s.width/2, s.height/2);
        planet.createPhysics(game.world, {isStatic:true, shapeType:"circle"});
        game.planet = planet;
        game.addChild({child:planet});
        
        game.player.position = new geom.Point(s.width/2, s.height);
        game.player.rotation = 0;
        game.player.createPhysics(game.world, {restitution:0, fixedRotation:true});
        game.addChild({child:game.player});

        var crate = new Crate();
        crate.position = new geom.Point(s.width/4 + crate.contentSize.width, s.height);
        crate.createPhysics(game.world, {});
        game.addChild({child:crate});
        
        
        var leftSpikes = new Spikes();
        leftSpikes.position = new geom.Point(planet.position.x - planet.contentSize.width/2,
                                             planet.position.y);
        leftSpikes.rotation = 90;
        leftSpikes.createPhysics(game.world, {isStatic:true, boundingBox:leftSpikes.smallBox});
        game.addChild({child:leftSpikes});
        
        var rightSpikes = new Spikes();
        rightSpikes.position = new geom.Point(planet.position.x + planet.contentSize.width/2,
                                             planet.position.y);
        rightSpikes.rotation = 270;
        rightSpikes.createPhysics(game.world, {isStatic:true, boundingBox:rightSpikes.smallBox});
        game.addChild({child:rightSpikes});
        
        var deadlySign = new cocos.nodes.Sprite({
            file: "/gfx/deadlyspikessign.png",
            rect: new geom.Rect(0,0, 72, 71)
        });
        deadlySign.position = new geom.Point(s.width/2, s.height/2);
        deadlySign.zOrder = -1;
        deadlySign.rotation = 45;
        
        var moveAction = new cocos.actions.MoveTo({ 
            position: new geom.Point(s.width/2 + 110, s.height/2 + 110),
            duration: 1
        })
        
        deadlySign.runAction(moveAction);
        game.addChild({child:deadlySign});
        
        var spawnIceCream = function() {
            var ice = new IceCream();
            ice.position = new geom.Point(s.width/2, 0);
            ice.rotation = 180;
            ice.createPhysics(game.world, {shapeType:"circle"});
            ice.map = "ParallelWorld1";
            game.addChild({child:ice});
        }
        // ps bar 400,135
        
        game.player.say([new TextLine({string: "I'm still hungry", delay:2, onEndedCallback: spawnIceCream})
        ]);
    },
    
    update:function(dt) {
    },
});

module.exports = Icemap2;
