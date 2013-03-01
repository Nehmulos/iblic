function Maplist() {
    Maplist.superclass.constructor.call(this)
    this.maps["Startmap"] = this.maps["StartScreen"];
    this.maps["Credits"] = this.maps["Ep1-Credits"]; // fallback for old name
}

Maplist.inherit(Object, {
    maps: {
        // episode 1
        "StartScreen":    new StartScreen(),
        "Icemap2":        new Icemap2(),
        "ParallelWorld1": new ParallelWorld1(),
        "Ph0toshop":      new Ph0toshop(),
        "Ep1-Credits":    new Credits(),
        "UfoWelcomeMap":  new UfoWelcomeMap()
    }
    
});

