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
    IceCream  = require("/IceCream");

function StartScreen() {
    StartScreen.superclass.constructor.call(this)
    
}

StartScreen.inherit(Map, {
    storeAsLastMap: true,

    setup: function(game) {
        this.game = game;
        StartScreen.superclass.constructor.call(this, game)
        // Get size of canvas
        var s = cocos.Director.sharedDirector.winSize
        this.middle = s.height/2;
        
        cocos.Director.sharedDirector.backgroundColor = "rgb(0,0,0)"
        
        this.lines = [
            new cocos.nodes.Label({string: "Our hero has been captured by vicious aliens!", fontSize:24}),
            new cocos.nodes.Label({string: "Will his endless quest for icecream find an end here?", fontSize:24}),
            new cocos.nodes.Label({string: "What kind of adventures lure in the insides of the ufo?", fontSize:24}),
            new cocos.nodes.Label({string: "Why do buildings look bigger from the inside?", fontSize:24}),
            new cocos.nodes.Label({string: " ", fontSize:0}),
            new cocos.nodes.Label({string: "When a tree drops in the forest and nobody is around, does it make a sound?", fontSize:18}),
            new cocos.nodes.Label({string: "If everythings tastes like chicken, what do chickens taste like?", fontSize:18}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "These and many other questions", fontSize:30}),
            new cocos.nodes.Label({string: "will be answered in...", fontSize:48}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "THE NEXT EPISODE", fontSize:62}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "Statistics", fontSize:62}),
            new cocos.nodes.Label({string: "Icecream eaten: " + game.engine.playerProfile._iceCream, fontSize:24}),
            new cocos.nodes.Label({string: "Deaths:         " + game.engine.playerProfile._deaths, fontSize:24}),
            new cocos.nodes.Label({string: "Doors used:     " + game.engine.playerProfile._portalsTaken, fontSize:24}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "Credits", fontSize:62}),
            new cocos.nodes.Label({string: "Code:      Nehmulos", fontSize:24}),
            new cocos.nodes.Label({string: "Graphics:  Nehmulos", fontSize:24}),
            new cocos.nodes.Label({string: "Sound:     Nehmulos", fontSize:24}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "Thanks to Ryan Williams", fontSize:24}),
            new cocos.nodes.Label({string: "for cocos2d", fontSize:24}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "Thanks to all the developers of", fontSize:24}),
            new cocos.nodes.Label({string: "GIMP, gedit, GNU/Linux, Stranded II", fontSize:24}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "Created for Ludum Daré #23", fontSize:24}),
            new cocos.nodes.Label({string: "in 48 hours", fontSize:24}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "Updates may be released", fontSize:24}),
            new cocos.nodes.Label({string: "on the 29th April 2012", fontSize:24}),
            new cocos.nodes.Label({string: "on nehmulos.wordpress.com", fontSize:24}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: " ", fontSize:30}),
            new cocos.nodes.Label({string: "Press backspace to play again", fontSize:24}),
            new cocos.nodes.Label({string: "(That's the key above 'Return')", fontSize:18}),
            new cocos.nodes.Label({string: "(That's the key above the right 'shift')", fontSize:18}),
            new cocos.nodes.Label({string: "(That's the key above the right 'ctrl')", fontSize:18}),
            new cocos.nodes.Label({string: "(That's the key next to the arrow keys)", fontSize:18})
        ]
        
        this.node = new cocos.nodes.Node({});
        
        var yOffset = 0;
        for (key in this.lines) {
            this.lines[key].position = new geom.Point(s.width/2, s.height - this.lines[key].contentSize.height/2 - yOffset);
            yOffset += this.lines[key].contentSize.height + 20;
            this.node.addChild({child:this.lines[key]});
        }
        
        this.node.contentSize.height = yOffset;
        
        this.node.position = new geom.Point(this.node.position.x, -s.height + this.lines[0].contentSize.height/2);
        
        // animation
        var seq = new cocos.actions.Sequence({ actions:[
            new cocos.actions.MoveTo({
                position: new geom.Point(this.node.position.x, s.height + this.node.contentSize.height),
                duration: 140
            }),
        ]});
    
        this.node.runAction(seq);
        game.addChild({child:this.node});
    },
    
    update:function(dt) {
        for (key in this.lines) {
            var distanceToMiddle = Math.abs(this.middle - (this.node.position.y + this.lines[key].position.y));
            if (distanceToMiddle <= this.middle) {
                this.lines[key].opacity = 255* (1-(distanceToMiddle/this.middle));
            } else {
                this.lines[key].opacity = 0;
            }
        }
    },
});

module.exports = StartScreen;
