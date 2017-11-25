var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    WIDTH = w.innerWidth || e.clientWidth || g.clientWidth,
    HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight;

initSimulator(WIDTH*.7, 500);