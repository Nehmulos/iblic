function Planet() {
    Planet.superclass.constructor.call(this)
    this.sprite = new cc.Sprite({
        file: "gfx/planet.png",
        rect: new cc.Rect(0,0,256, 256)
    });
    this.sprite.anchorPoint = new cc.Point(0.5,0.5);
    this.contentSize = this.sprite.contentSize;
    this.addChild({child:this.sprite});
}

Planet.inherit(PhysicsNode, {
    isGround:true,
    sprite:null,
    gravityModifier:10,
    
    update: function() {
        Planet.superclass.update.call(this)

        // process gravity
        var body = this.body.m_world.GetBodyList();
        while(body) {
            
            if (body != this.body) {
                var xDistance = body.GetPosition().x - this.body.GetPosition().x;
                var yDistance = body.GetPosition().y - this.body.GetPosition().y;
                var force = new b2Vec2(-xDistance*this.gravityModifier,
                                             -yDistance*this.gravityModifier);
                                             
                
                
                body.ApplyForce(force, body.GetWorldCenter());
            }
            body = body.GetNext();
        }
        
    }
});
