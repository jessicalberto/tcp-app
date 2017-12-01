var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    WIDTH = w.innerWidth || e.clientWidth || g.clientWidth,
    HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight;

var app = null,
	width = null,
	height = null,
	senderPackets = null,
	receiverPackets = null,
	rotatedPacketHeight = 0,
	rotatedPacketWidth = 0,
	transmissionHeightOffset = 0,
	SENDER = 1,
	RECEIVER = -1,
	TIMEOUT_SPEED = 0.002,
	speed = 5,
	direction = SENDER,
	verticalMultiplier = null,
	senderStart = 0,
	receiverStart = 0,
	packets = null,
  	timeout = null,
	numTransmissions = 0
	flag = null;

var simulationBox = document.getElementById("simulation-box");
initSimulator(simulationBox);
