var cocos = require("cocos2d"),
    box2d = require("box2d"),
    TextLine = require("/TextLine"),
    Game = require("/Game"),
    GameEngine = require("/GameEngine");


function ContactListener() {

}

ContactListener.inherit(box2d.b2ContactListener, {
    BeginContact: function(contact, manifold) {
        var objectA = contact.GetFixtureA().GetBody().GetUserData();
        var objectB = contact.GetFixtureB().GetBody().GetUserData();
        
        if (objectA && objectB) {
            if (objectA.type == "player" && objectB.type == "icecream") {
                this.playerIceCreamCollision(objectA, objectB);      
            } else if(objectB.type == "player" && objectA.type == "icecream") {
                this.playerIceCreamCollision(objectB, objectA);      
            }
            
            if (objectA.isUseTrigger && objectB.isPerson) {
                this.personUseTriggerCollision(objectB, objectA);
            } else if(objectB.isUseTrigger && objectA.isPerson) {
                this.personUseTriggerCollision(objectA, objectB);
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
        }
    },
    
    playerIceCreamCollision: function(player, iceCream) {
        var loadMap = function() {
            // flippin bug disallows me including the GameEngine directly
            player.game.loadMap(iceCream.map);
        }
        player.say([new TextLine({string:"yummie!", delay:2, onEndedCallback:loadMap})]);
        player.game.engine.playerProfile.icecream++;
        player.game.engine.storeProfile();
        iceCream.destroyed = true;
    },
    
    personUseTriggerCollision: function(person, trigger) {
        person.useTrigger = trigger;
    },
    
    personUseTriggerLeave: function(person, trigger) {
        person.useTrigger = null;
    }

});

module.exports = ContactListener;
