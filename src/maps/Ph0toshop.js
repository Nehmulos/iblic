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
        var s = cocos.Director.sharedDirector.winSize
        
        this.game.world.SetGravity(new box2d.b2Vec2(0,-10));
    /*
        var planet = new Planet();
        planet.position = new geom.Point(s.width/2, s.height/2);
        planet.createPhysics(game.world, {isStatic:true, shapeType:"circle"});
        game.planet = planet;
        game.addChild({child:planet});
    */
        var background = new cocos.nodes.Sprite({
            file:"/gfx/insideph0toshop.png",
            rect: new geom.Rect(0,0, 592, 210)
        });
        background.anchorPoint = new geom.Point(0,1);
        background.position = new geom.Point(0, s.height/2 + background.contentSize.height/2);
        game.addChild({child:background});
        
        var bar = new cocos.nodes.Sprite({
            file:"/gfx/insideph0toshopbar.png",
            rect: new geom.Rect(0,0, 149, 56)
        });
        bar.anchorPoint = new geom.Point(0,1);
        bar.position = new geom.Point(background.position.x + 330, background.position.y - 120);
        game.addChild({child:bar});
        
        game.player.position = new geom.Point(62, s.height/2-41);
        game.player.rotation = 0;
        game.player.createPhysics(game.world, {fixedRotation:true});
        game.addChild({child:game.player});

        /*
        var crate = new Crate();
        crate.position = new geom.Point(s.width/4 + (crate.contentSize.width), 0);
        crate.createPhysics(game.world, {});
        game.addChild({child:crate});
        */
        
        var door = new MapPortal({});
        door.position = new geom.Point(s.width/2, s.height/2 - 128);
        door.contentSize = new geom.Size(20,20);
        door.map = new ParallelWorld1();
        door.createPhysics(game.world, {isSensor:true, isStatic:true});
        
        var ground = new PhysicsNode();
        ground.position = new geom.Point(background.contentSize.width/2, (s.height/2)-80);
        ground.createPhysics(game.world, {isStatic:true, boundingBox:new geom.Rect(0,0,background.contentSize.width,10)});
        
        // ps bar 400,135
    },
    
    update:function(dt) {
    },
});

module.exports = Ph0toshop;
