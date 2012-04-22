var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Planet = require("/Planet"),
    Player = require("/Player"),
    Crate  = require("/Crate"),
    TextLine = require("/TextLine");
    Maplist = require("/maps/Maplist"),
    GameEngine = require("/GameEngine"),
    ContactListener = require("/ContactListener");

function PlanetGame(engine) {
    PlanetGame.superclass.constructor.call(this)
    
    this.engine = engine;
    this.player = new Player();
    this.player.game = this;
    this.planet = null;
    this.maplist = new Maplist();
    
    var startMap = this.engine.playerProfile.getDecision("lastMap") || "Startmap";
    this.loadMapByName(startMap);
}

PlanetGame.inherit(PhysicsNode, {
    
    reset: function() {
        this.loadMap(this.map);
    },
    
    loadMapByName: function(name) {
        this.engine.playerProfile.setDecision("lastMap", name);
        this.loadMap(this.maplist.maps[name]);
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
        this.planet = null;
        this.player.reset();
    },

    update: function() {
        
    }
});

module.exports = PlanetGame;
