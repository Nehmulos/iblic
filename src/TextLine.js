var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d");

function TextLine(opts) {
    TextLine.superclass.constructor.call(this,opts)
    var delayMultiplier = 1;
    this.delay = opts.delay*delayMultiplier || 2*delayMultiplier;
    this.fontColor = opts.color || "green";
    this.onEndedCallback = opts.onEndedCallback || null;
}

TextLine.inherit(cocos.nodes.Label, {
    delay:2,
    timePassed:0,
    onEndedCallback:null,
    
    update: function(dt) {
        this.timePassed += dt;
    }
});

module.exports = TextLine;
