var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Planet = require("/Planet"),
    Player = require("/Player"),
    Crate  = require("/Crate"),
    TextLine = require("/TextLine");
    StartScreenMap = require("/maps/StartScreen"),
    GameEngine = require("/GameEngine"),
    ContactListener = require("/ContactListener");

function PlanetGame(engine) {
    PlanetGame.superclass.constructor.call(this)
    
    this.engine = engine;
    this.player = new Player();
    this.player.game = this;
    this.planet = null;
    this.loadMap(new StartScreenMap());
}

PlanetGame.inherit(PhysicsNode, {
    
    reset: function() {
        this.loadMap(this.map);
    },
    
    loadMap: function(map) {
        this.unloadMap();
        map.setup(this);
        this.map = map;
    },
    
    unloadMap: function() {
        var gravity = new box2d.b2Vec2(0, 0);
        this.world = new box2d.b2World(gravity, true);
        this.world.SetContactListener(new ContactListener());
        this.removeChildren({cleanup:true});
        this.map = null;
        this.player.lineQueue = [];
        this.player.textLine = null;
        this.player.rotation = 0;
        this.player.sprite.stopAllActions();
        this.player.sprite.runAction(new cocos.actions.RepeatForever(this.player.idleSeq));
    },

    update: function() {
        
    }
});

module.exports = PlanetGame;
