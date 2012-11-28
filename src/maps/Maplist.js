function Maplist() {
    Maplist.superclass.constructor.call(this)
    this.maps["Startmap"] = this.maps["StartScreen"];
}

Maplist.inherit(Object, {
    maps: {"ParallelWorld1": new ParallelWorld1(),
           "Ph0toshop":      new Ph0toshop(),
           "StartScreen":    new StartScreen(),
           "Icemap2":        new Icemap2(),
           "Credits":        new Credits()
    }
});

