// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points
  , PhysicsNode = require("/PhysicsNode")
  , PlayerProfile = require("/PlayerProfile")
  , Planet = require("/Planet")
  , box2d  = require("box2d")
  , Player = require("/Player")
  , Crate  = require("/Crate")
  , Input = require("/Input")
  , PlanetGame = require("/PlanetGame")


// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function GameEngine () {
    // You must always call the super class constructor
    GameEngine.superclass.constructor.call(this)
    
    this.playerProfile = new PlayerProfile();
    this.playerProfile.restore();

    this.isKeyboardEnabled = true;
    this.game = new PlanetGame(this);
    this.addChild({child:this.game});
    this.scheduleUpdate();
    GameEngine.instance = this;
}

// Inherit from cocos.nodes.Layer
GameEngine.inherit(Layer, {
    paused: false,
    
    update: function(dt) {

        // max out on 1 second
        dt > 1.0 ? dt = 1.0 : 0;
        this.game.world.Step(dt, 3);
        this.game.world.ClearForces();
        
        if (this.paused) {
            return;
        }
        
        var body = this.game.world.GetBodyList();
        while(body) {
        
            // update userdata
            var userData = body.GetUserData();
            
            if (userData) {
                if (userData.update) {
                    userData.update(dt);
                }
                if (userData.destroyed) {
                    userData.destroy();
                }
            }
            body = body.GetNext();
        }
        
        this.game.update(dt);
    },
    
    keyDown: function(event) {
        Input.instance.keysDown[event.keyCode] = true;
        
        if (event.keyCode == 13) {
            this.game.reset();
        }
        
        if (event.keyCode == 8) {
            var okay = confirm("delete savegame, progress and statistics?");
            if (okay) {
                this.removeChild(this.game);
                this.playerProfile = new PlayerProfile();
                this.playerProfile.store();
                this.game = new PlanetGame(this);
                this.addChild({child:this.game});
            }
        }
        
        if (event.keyCode == 78) {
            var name = this.playerProfile.name;
            name = prompt("Enter your name", name);
            if (name != null) {
                name = name.replace(/^\s*/, "").replace(/\s*$/, "");
                if (name != "") {
                    this.playerProfile.name = name;
                }
            }
        }
    },
    
    keyUp: function(event) {
        Input.instance.keysDown[event.keyCode] = false;
    }
});

module.exports = GameEngine;
