function ContactListener() {

}

ContactListener.inherit(b2ContactListener, {
    BeginContact: function(contact, manifold) {
        var objectA = contact.GetFixtureA().GetBody().GetUserData();
        var objectB = contact.GetFixtureB().GetBody().GetUserData();
        
        if (objectA && objectB) {
            if (objectA.type == "player" && objectB.type == "icecream") {
                this.playerIceCreamCollision(objectA, objectB);      
            } else if(objectB.type == "player" && objectA.type == "icecream") {
                this.playerIceCreamCollision(objectB, objectA);      
            }
            
            if (objectA.type == "player" && objectB.type == "cat") {
                this.playerCatCollision(objectA, objectB);      
            } else if(objectB.type == "player" && objectA.type == "cat") {
                this.playerCatCollision(objectB, objectA);      
            }
            
            if (objectA.isPerson && objectB.isGround) {
                this.personGrounded(objectA, objectB);      
            } else if(objectB.isPerson && objectA.isGround) {
                this.personGrounded(objectB, objectA);      
            }
            
            if (objectA.isUseTrigger && objectB.isPerson) {
                this.personUseTriggerCollision(objectB, objectA);
            } else if(objectB.isUseTrigger && objectA.isPerson) {
                this.personUseTriggerCollision(objectA, objectB);
            }
            
            if (objectA.isDeadly && objectB.isPerson) {
                this.personDeadlyCollision(objectB, objectA);
            } else if(objectB.isDeadly && objectA.isPerson) {
                this.personDeadlyCollision(objectA, objectB);
            }
        }
    },
    
    EndContact: function(contact) {
        var objectA = contact.GetFixtureA().GetBody().GetUserData();
        var objectB = contact.GetFixtureB().GetBody().GetUserData();
        
        if (objectA && objectB) {
            if (objectA.isUseTrigger && objectB.isPerson) {
                this.personUseTriggerLeave(objectB, objectA);
            } else if(objectB.isUseTrigger && objectA.isPerson) {
                this.personUseTriggerLeave(objectA, objectB);
            }
            
            if (objectA.isPerson && objectB.isGround) {
                this.personUnGrounded(objectA, objectB);      
            } else if(objectB.isPerson && objectA.isGround) {
                this.personUnGrounded(objectB, objectA);      
            }
        }
    },
    
    personGrounded: function(person, ground) {
        person.groundedCount++;
    },
    
    personUnGrounded: function(person, ground) {
         person.groundedCount--;
    },
    
    personDeadlyCollision: function(person, killer) {
        person.die();
    },
    
    playerIceCreamCollision: function(player, iceCream) {
        if(player.isDead) {
            return;
        }
        /*    
        var loadMap = function() {
            // flippin bug disallows me including the GameEngine directly
            player.game.loadMapByName(iceCream.map);
        }
        player.say([new TextLine({string:"yummie!", delay:2, onEndedCallback:loadMap})]);
        player.game.engine.playerProfile.addIceCream();;
        iceCream.destroyed = true;
        */
        iceCream.trigger(player);
    },
    
    playerCatCollision: function(player, cat) {
        cat.randomMeow();
    },
    
    personUseTriggerCollision: function(person, trigger) {
        person.useTrigger = trigger;
    },
    
    personUseTriggerLeave: function(person, trigger) {
        person.useTrigger = null;
    }

});

