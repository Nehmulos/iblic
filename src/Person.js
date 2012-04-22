var cocos = require("cocos2d"),
    geom  = require("geometry"),
    box2d = require("box2d"),
    PhysicsNode = require("/PhysicsNode"),
    Input = require("/Input"),
    TextLine = require("/TextLine");

function Person() {
    Person.superclass.constructor.call(this)
    var texture = new cocos.Texture2D({ file: "/gfx/player.png" });

    var animFrames = [ new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 0, 64 * 0, 32, 64) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 1, 64 * 0, 32, 64) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 2, 64 * 0, 32, 64) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 1, 64 * 0, 32, 64) })
                     , new cocos.SpriteFrame({ texture: texture, rect: new geom.Rect(32 * 0, 64 * 0, 32, 64) })
    ];

    this.sprite = new cocos.nodes.Sprite({
        texture:texture,
        rect: animFrames[0].rect
    });
    
    var animation = new cocos.Animation({ frames: animFrames, delay: 0.2 })
      , animate   = new cocos.actions.Animate({ animation: animation, restoreOriginalFrame: false });
    this.idleSeq  = new cocos.actions.Sequence({ actions: [animate] });

    this.sprite.anchorPoint = new geom.Point(0,0);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
    
    this.sprite.runAction(new cocos.actions.RepeatForever(this.idleSeq));
}

Person.inherit(PhysicsNode, {
    isPerson:true,
    canMove:true,
    isDead:false,
    sprite:null,
    useTrigger:null,
    speed: 10 / PhysicsNode.physicsScale,
    jumpSpeed: 35 / PhysicsNode.physicsScale,
    maxSpeed: 150 / PhysicsNode.physicsScale,
    jumpImpulses: 0,
    groundedCount: 0,
    textColor: "white",
    textLine: null,
    lineQueue: [],
    onDeathCallback:null,
    
    update:function(dt) {
        Person.superclass.update.call(this);
        
        if (this.textLine) {
        
            this.textLine.update(dt);
            this.textLine.position = new geom.Point(this.position.x, this.position.y + this.contentSize.height);
            
            if (this.textLine.delay < this.textLine.timePassed) {
                if (this.textLine.parent) {
                    this.textLine.parent.removeChild(this.textLine);
                }
                if (this.textLine.onEndedCallback) {
                    this.textLine.onEndedCallback();
                }
                this.textLine = null;
                
                
                if (this.lineQueue.length > 0) {
                    this.textLine = this.lineQueue[0];
                    this.textLine.position = new geom.Point(this.position.x, this.position.y + this.contentSize.height);
                    this.lineQueue.splice(0,1);
                    this.parent.addChild(this.textLine);
                }
            }
        } else {
            if (this.lineQueue.length > 0) {
                this.textLine = this.lineQueue[0];
                this.textLine.position = new geom.Point(this.position.x, this.position.y + this.contentSize.height);
                this.lineQueue.splice(0,1);
                this.parent.addChild(this.textLine);
            }
        }

        // fixed angle planet rotation        
        if (this.body.IsFixedRotation() && this.game && this.game.planet) {
            var planet = this.game.planet;
            var r = Math.atan2(planet.body.GetPosition().x -this.body.GetPosition().x ,
                               this.body.GetPosition().y - planet.body.GetPosition().y);
                                
            this.rotation = -geom.radiansToDegrees(r);
            this.body.SetAngle(r);
        }
        
    },
    
    createPhysics: function(world, ops) {
        ops.boundingBox = ops.boundingBox || new geom.Rect(0,0, 15,64);
        Person.superclass.createPhysics.call(this, world, ops);
    },
    
    useAction: function() {
        /*
        var aabb = new box2d.b2AABB()
        aabb.lowerBound.Set(this.body.GetPosition().x - 0.001, this.body.GetPosition().y - 0.001)
        aabb.upperBound.Set(this.body.GetPosition().x + 0.001, this.body.GetPosition().y + 0.001)

        var self = this
        function getBodyCB(fixture) {
            if(fixture.GetBody() != self.body && fixture.GetBody().GetUserData()) {
                if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), self.body.GetPosition())) {
                    self.selectedBody = fixture.GetBody()
                    return false
                }
            }
            return true
        }

        // Query the world for overlapping shapes.

        this.selectedBody = null

        this.body.m_world.QueryAABB(getBodyCB, aabb)
        
        if (this.selectedBody) {
            console.log(self.selectedBody.GetUserData().type);
//            this.selectedBody.trigger(this);
        }
        */
        if (this.useTrigger) {
            this.useTrigger.trigger(this);
        }
    },
    
    die: function() {
        var self = this;
        var onDeath = function() {
            self.destroyed = true;
            if (self.onDeathCallback) {
                self.onDeathCallback();
            }
        }
        this.canMove = false;
        this.isDead = true;
//        this.body.SetLinearVelocity(new box2d.b2Vec2(0,0));
        this.body.SetFixedRotation(false);
        this.body.ApplyTorque(90);
        this.say([new TextLine({string: 'Uarghs!', delay:1, onEndedCallback:onDeath})]);
    },
    
    goLeft: function() {
        this.sprite.flipX = true;
        if (this.canMove && this.body.GetLinearVelocity().x > -this.maxSpeed) {
        
        	var yImpulse = Math.sin(-this.body.GetAngle()) * (this.speed);
	        var xImpulse = Math.cos(-this.body.GetAngle()) * (this.speed);

            this.body.ApplyImpulse(new box2d.b2Vec2(-xImpulse, yImpulse), this.body.GetWorldCenter());
        }
    },
    
    goRight: function() {
        this.sprite.flipX = false;
        if (this.canMove && this.body.GetLinearVelocity().x < this.maxSpeed) {
        
        	var yImpulse = Math.sin(this.body.GetAngle()) * (this.speed);
	        var xImpulse = Math.cos(this.body.GetAngle()) * (this.speed);
        
            this.body.ApplyImpulse(new box2d.b2Vec2(xImpulse, yImpulse), this.body.GetWorldCenter());
        }
    },
    
    jump: function() {
        if (this.canMove && this.body.GetLinearVelocity().y < this.maxSpeed && this.groundedCount > 0) {
            this.jumpImpulses = 20;  
        }
        
        if (this.canMove && this.jumpImpulses > 0) {
        	var xImpulse = Math.sin(this.body.GetAngle()) * (this.jumpSpeed);
            var yImpulse = Math.cos(this.body.GetAngle()) * (this.jumpSpeed);
        
            this.body.ApplyImpulse(new box2d.b2Vec2(-xImpulse, yImpulse), this.body.GetWorldCenter());
            this.jumpImpulses--;
        }
    },
    
    say: function(lines) {
        for (var key in lines) {
            lines[key].fontColor = this.textColor;
        }
        this.lineQueue = this.lineQueue.concat(lines);
    }
});

module.exports = Person;
