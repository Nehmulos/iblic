function UseTrigger() {
    UseTrigger.superclass.constructor.call(this)
}

UseTrigger.inherit(PhysicsNode, {
    isUseTrigger: true,
    onUseCallback: null,
    
    trigger:function(person) {
        if (this.onUseCallback) {
            this.onUseCallback(person, this);
        }
    },
});
