function TextLine(opts) {
    TextLine.superclass.constructor.call(this,opts)
    var delayMultiplier = 1;
    this.delay = opts.delay*delayMultiplier || 2*delayMultiplier;
    this.fontColor = opts.color || "white";
    this.onEndedCallback = opts.onEndedCallback || null;
    this.zOrder = 1;
    
    
    var background = new TextLineBackground()
    background.anchorPoint = new cc.Point(0.5,0.5);
    background.position = new cc.Point(this.position.x - 2.5, this.position.y - 2.5);
    background.contentSize = new cc.Size(this.contentSize.width + 10, 
                                           this.contentSize.height + 10);
    background.zOrder = -1
    background.opacity = 200;
    
    this.addChild({child:background});
}

TextLine.inherit(cc.Label, {
    delay:2,
    timePassed:0,
    onEndedCallback:null,
    
    update: function(dt) {
        this.timePassed += dt;
    }
});


function TextLineBackground(opts) {
    TextLineBackground.superclass.constructor.call(this,opts);
}

TextLineBackground.inherit(cc.Node, {

    draw: function(context) {
        context.fillStyle = "black";
        context.fillRect(this.position.x + this.contentSize.width/2,
                         this.position.y + this.contentSize.height/2,
                         this.contentSize.width,
                         this.contentSize.height);
    }
});

