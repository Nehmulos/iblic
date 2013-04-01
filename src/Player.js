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
        this.sprite.runAction(new cc.RepeatForever(this.idleSeq));
        this.sprite.opacity = 255;
    },
    
    update:function(dt) {
        Player.superclass.update.call(this, dt);
        
        // w or up pressed
        if (Input.instance.keysDown[87] || Input.instance.keysDown[38]) {
            this.jump();
        } else if(this.groundedCount <= 0) {
            this.jumpImpulses = 0;
        }
        
        // s or down pressed
        if (Input.instance.keysDown[83] || Input.instance.keysDown[40]) {
            this.useAction();
        }
        
        // a or left pressed
        if (Input.instance.keysDown[65] || Input.instance.keysDown[37]) {
            this.goLeft();
        }

        // d  or right pressed
        if (Input.instance.keysDown[68] || Input.instance.keysDown[39]) {
            this.goRight();
        }
    },
});
