function CallbackSensor() {
    CallbackSensor.superclass.constructor.call(this)
}

CallbackSensor.inherit(PhysicsNode, {
    type: "callbackSensor",
    playerTouchCallback:null,
    crateTouchCallback:null,
    
    trigger:function(source) {
        if (source.type == "player" && this.playerTouchCallback) {
            this.playerTouchCallback(source, this);
        }
        if (source.type == "crate" && this.crateTouchCallback) {
            this.crateTouchCallback(source, this);
        }
    },
});
