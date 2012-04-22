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
    MapPortal = require("/MapPortal");

function ParallelWorld1() {
    ParallelWorld1.superclass.constructor.call(this)
    
}

ParallelWorld1.inherit(Map, {

    loadEffect: function() {
        
    },

    setup: function(game) {
        this.game = game;
        ParallelWorld1.superclass.constructor.call(this, game)
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
        for (var i=0; i < 1; ++i) {
            var crate = new Crate();
            crate.position = new geom.Point(s.width/4 + (crate.contentSize.width*(i+1)), 0);
            crate.createPhysics(game.world, {});
            game.addChild({child:crate});
        }
        
        var spawnPh0toshop = function() {
            var ph0toshop = new cocos.nodes.Sprite({
                file: "/gfx/ph0toshop.png",
                rect: new geom.Rect(0,0, 188, 149)
            });
            ph0toshop.position = new geom.Point(s.width/2, s.height/2);
            ph0toshop.zOrder = -1;
            ph0toshop.rotation = 180;
            
            var moveAction = new cocos.actions.MoveTo({ 
                position: new geom.Point(s.width/2, s.height/2 - 165),
                duration: 2
            })
            
            ph0toshop.runAction(moveAction);
            game.addChild({child:ph0toshop});
            
            var cbs = new MapPortal({
            
            });
            cbs.position = new geom.Point(s.width/2, s.height/2 - 128);
            cbs.contentSize = new geom.Size(20,20);
            cbs.map = new ParallelWorld1();
            cbs.createPhysics(game.world, {isSensor:true, isStatic:true});
            cbs.playerTouchCallback = function(player) {
                player.say([new TextLine({string: 'press "S" to enter buildins', delay:0})]);
            }
        }
        // ps bar 400,135
        
        game.player.say([new TextLine({string: 'WOW, what happend!?!', delay:2}),
                         new TextLine({string: 'Everything looks so different.', delay:3}),
                         new TextLine({string: 'Like some crazy paralell world.', delay:3}),
                         new TextLine({string: 'I should investigate further.', delay:2, onEndedCallback: spawnPh0toshop})
        ]);
    },
    
    update:function(dt) {
    },
});

module.exports = ParallelWorld1;
