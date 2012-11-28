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
        this.loadMap(this.maplist.maps[name]);
        if (this.maplist.maps[name].storeAsLastMap) {
            this.engine.playerProfile.setDecision("lastMap", name);
        }
    },
    
    loadMap: function(map) {
        this.unloadMap();
        map.setup(this);
        this.map = map;
    },
    
    unloadMap: function() {
        var gravity = new b2Vec2(0, 0);
        this.world = new b2World(gravity, true);
        this.world.SetContactListener(new ContactListener());
        this.removeChildren({cleanup:true});
        this.map = null;
        this.planet = null;
        this.player.reset();
        cc.Director.sharedDirector.backgroundColor = "rgb(255,255,255)"
    },

    update: function(dt) {
        if (this.map && this.map.update) {
            this.map.update(dt);
        }
    }
});

