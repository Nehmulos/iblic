"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points
  , PhysicsNode = require("/PhysicsNode")
  , Planet = require("/Planet")
  , box2d  = require("box2d")
  , Player = require("/Player")
  , Crate  = require("/Crate")
  , Input = require("/Input")
  , GameEngine = require("/GameEngine")


// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director



var scene;
/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = Director.sharedDirector

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var layer = new GameEngine()
        GameEngine.instance = layer;

        // Add our layer to the scene
        scene = new Scene()
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
        director.backgroundColor = "rgb(255, 255,255)"
    })

    // Preload our assets
    director.runPreloadScene()
}


window.getResourcePath = function(cocosPath) {
    return __jah__.assetURL + cocosPath;
}

exports.main = main
