var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    WIDTH = w.innerWidth || e.clientWidth || g.clientWidth,
    HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight;

var simulationBox = document.getElementById("simulation-box");
initSimulator(simulationBox);