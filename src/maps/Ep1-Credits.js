function Credits() {
    Credits.superclass.constructor.call(this)
    
}

Credits.inherit(Map, {
    storeAsLastMap: true,

    setup: function(game) {
        this.game = game;
        Credits.superclass.constructor.call(this, game)
        // Get size of canvas
        var s = cc.Director.sharedDirector.winSize
        this.middle = s.height/2;
        
        cc.Director.sharedDirector.backgroundColor = "rgb(0,0,0)"
        
        this.lines = [
            new cc.Label({string: "Our hero has been captured by vicious aliens!", fontSize:24}),
            new cc.Label({string: "Will his endless quest for icecream find an end here?", fontSize:24}),
            new cc.Label({string: "What kind of adventures lure in the insides of the ufo?", fontSize:24}),
            new cc.Label({string: "Why do buildings look bigger from the inside?", fontSize:24}),
            new cc.Label({string: " ", fontSize:0}),
            new cc.Label({string: "When a tree drops in the forest and nobody is around, does it make a sound?", fontSize:18}),
            new cc.Label({string: "If everythings tastes like chicken, what do chickens taste like?", fontSize:18}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "These and many other questions", fontSize:30}),
            new cc.Label({string: "will be answered in...", fontSize:48}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "THE NEXT EPISODE", fontSize:62}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "Statistics", fontSize:62}),
            new cc.Label({string: "Icecream eaten: " + game.engine.playerProfile._iceCream, fontSize:24}),
            new cc.Label({string: "Deaths:         " + game.engine.playerProfile._deaths, fontSize:24}),
            new cc.Label({string: "Doors used:     " + game.engine.playerProfile._portalsTaken, fontSize:24}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "Credits", fontSize:62}),
            new cc.Label({string: "Code:      Nehmulos", fontSize:24}),
            new cc.Label({string: "Idea:      Nehmulos", fontSize:24}),
            new cc.Label({string: "Graphics:  Nehmulos", fontSize:24}),
            new cc.Label({string: "Sound:     Nehmulos", fontSize:24}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "Thanks to Ryan Williams", fontSize:24}),
            new cc.Label({string: "for cocos2d", fontSize:24}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "Thanks to all the developers of", fontSize:24}),
            new cc.Label({string: "GIMP, gedit, GNU/Linux, Stranded II", fontSize:24}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "and screw everyone who added a bug to fglrx", fontSize:24}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "Created for Ludum Daré #23", fontSize:24}),
            new cc.Label({string: "in 48 hours", fontSize:24}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "Updates may be released", fontSize:24}),
            new cc.Label({string: "on nehmulos.wordpress.com", fontSize:24}),
            new cc.Label({string: "or on nehmulos.github.com", fontSize:24}),
            new cc.Label({string: "just in case you could also read my gibberish on", fontSize:16}),
            new cc.Label({string: "twitter.com/Nehmulos", fontSize:24}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: " ", fontSize:30}),
            new cc.Label({string: "Press backspace to play again", fontSize:24}),
            new cc.Label({string: "(That's the key above 'Return')", fontSize:18}),
            new cc.Label({string: "(That's the key above the right 'shift')", fontSize:18}),
            new cc.Label({string: "(That's the key above the right 'ctrl')", fontSize:18}),
            new cc.Label({string: "(That's the key next to the arrow keys)", fontSize:18})
        ]
        
        this.node = new cc.Node({});
        
        var yOffset = 0;
        for (key in this.lines) {
            this.lines[key].position = new cc.Point(s.width/2, s.height - this.lines[key].contentSize.height/2 - yOffset);
            yOffset += this.lines[key].contentSize.height + 20;
            this.node.addChild({child:this.lines[key]});
        }
        
        this.node.contentSize.height = yOffset;
        
        this.node.position = new cc.Point(this.node.position.x, -s.height + this.lines[0].contentSize.height/2);
        
        // animation
        var seq = new cc.Sequence({ actions:[
            new cc.MoveTo({
                position: new cc.Point(this.node.position.x, s.height + this.node.contentSize.height),
                duration: 155
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

