function MapPortal() {
    MapPortal.superclass.constructor.call(this)
}

MapPortal.inherit(UseTrigger, {
    map: null,
    
    trigger:function(person) {
        person.useTrigger = null;
        person.game.loadMapByName(this.map);
        person.game.engine.playerProfile.addPortalsTaken();
        MapPortal.superclass.trigger.call(this, person);
    },
});

