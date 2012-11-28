// Convenient access to some constructors
var Layer    = cc.Layer
  , Scene    = cc.Scene
  , Label    = cc.Label
  , Director = cc.Director

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
}


window.getResourcePath = function(cocosPath) {
    return __jah__.assetURL + cocosPath;
}

window.rrandom = function(minValue, maxValue) {
    return (maxValue - minValue) * Math.random() + minValue;
}
