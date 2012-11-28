function Game(gravity) {
    
    gravity = gravity || new b2Vec2(0,0);
    this.world = new b2World(gravity, true)
}

Game.inherit(cc.Node,{
    update: function() {
        //overwrite me!
    }
});

