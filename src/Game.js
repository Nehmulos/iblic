var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode");

function Game(gravity) {
    
    gravity = gravity || new box2d.b2Vec2(0,0);
    this.world = new box2d.b2World(gravity, true)
}

Game.inherit(cocos.nodes.Node,{
    update: function() {
        //overwrite me!
    }
});


module.exports = Game;
