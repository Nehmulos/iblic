var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine"),
    Person = require("/Person");

function Player() {
    Player.superclass.constructor.call(this)
}

Player.inherit(Person, {
    type: "player",
    onDeathCallback: function() {
        this.game.engine.playerProfile.addDeath();
        this.game.reset();
    },
    
    reset: function() {
        this.destroy();
        this.lineQueue = [];
        this.textLine = null;
        this.useTrigger = null;
        this.rotation = 0;
        this.sprite.stopAllActions();
        this.destroyed = false;
        this.canMove = true;
        this.isDead = false;
        this.sprite.runAction(new cocos.actions.RepeatForever(this.idleSeq));
    },
    
    update:function(dt) {
        Player.superclass.update.call(this, dt);
        
        // w pressed
        if (Input.instance.keysDown[87]) {
            this.jump();
        }
        
        // s pressed
        if (Input.instance.keysDown[83]) {
            this.useAction();
        }
        
        // a pressed
        if (Input.instance.keysDown[65]) {
            this.goLeft();
        }

        // d pressed
        if (Input.instance.keysDown[68]) {
            this.goRight();
        }
    },
});

module.exports = Player;
