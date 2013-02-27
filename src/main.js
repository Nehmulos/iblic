// Convenient access to some constructors
var Layer    = cc.Layer
  , Scene    = cc.Scene
  , Label    = cc.Label
  , Director = cc.Director

var scene;
/**
 * Entry point for the application
 */
$(function() {
    // Initialise application

    // Get director singleton
    var director = cc.Director.sharedDirector;
    //director.backgroundColor = "rgb(200,200,200)";
    director.attachInView(document.getElementById('cocos2d-app'));
    director.displayFPS = false;

    
    // I modified lib/cocos2d-beta2.js to make this work!
    // this function does not work with the official release
    function registerResource(path, mimetype, alias) {
        alias = alias || path;
        cc.jah.resources[alias] = {data: path, mimetype: mimetype, remote:true};
        director.preloader().addToQueue(path);
    };
    
    // here you can add a block of resources
    // they will be loaded with the loadingscreen before your game starts
    registerResource("gfx/player.png", "image/png");
    registerResource("gfx/planet.png", "image/png");
    registerResource("gfx/cat.png", "image/png");
    registerResource("gfx/ironbar.png", "image/png");
    registerResource("gfx/icecream.png", "image/png");
    registerResource("gfx/spikes.png", "image/png");
    registerResource("gfx/crate.png", "image/png");
    registerResource("gfx/planet.png", "image/png");
    registerResource("gfx/deadlyspikessign.png", "image/png");
    registerResource("gfx/credits.png", "image/png");
    registerResource("gfx/ph0toshop.png", "image/png");
    registerResource("gfx/ufo.png", "image/png");
    registerResource("gfx/freesign.png", "image/png");
    registerResource("gfx/credits.png", "image/png");
    registerResource("gfx/insideph0toshop.png", "image/png");
    registerResource("gfx/insideph0toshopbar.png", "image/png");
    registerResource("gfx/UfoWelcomeMap.png", "image/png");



    // Wait for the director to finish preloading our assets
    cc.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var layer = new GameEngine()
        GameEngine.instance = layer;

        // Add our layer to the scene
        scene = new Scene()
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
//        director.backgroundColor = "rgb(255, 255,255)"
/*
        director.canvas.getContext("2d").translate(800/4,
                                           600/4)
        director.canvas.getContext("2d").scale(0.75, 0.75)
        director.canvas.width = 800/4*3
        director.canvas.height = 600/4*3
*/
    })

    // Preload our assets
    director.runPreloadScene()
});


/*
window.getResourcePath = function(cocosPath) {
    return __jah__.assetURL + cocosPath;
}
*/

window.rrandom = function(minValue, maxValue) {
    return (maxValue - minValue) * Math.random() + minValue;
}
