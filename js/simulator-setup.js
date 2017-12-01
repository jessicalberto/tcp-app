function makeBorders(width, height) {
	var left = 0;
	var right = width;
	var top = 0;
	var bottom = height;

	var graphics = new PIXI.Graphics();
	graphics.beginFill(BLACK);
	graphics.lineStyle(2, WHITE, 1);

	// Draw Left Border
	graphics.moveTo(left, top);
	graphics.lineTo(left, bottom);
	graphics.endFill();

	// Draw Right Border
	graphics.moveTo(right, top);
	graphics.lineTo(right, bottom);
	graphics.endFill();

	return graphics;
}

function makeText(width, height) {
	var style = new PIXI.TextStyle({
	    fontFamily: 'Arial',
	    fontSize: 36,
	    fontWeight: 'bold',
	    fill: '#ffffff20', // gradient
	});

	var sender = new PIXI.Text('SENDER', style);
	sender.anchor.set(.5, .5);
	sender.rotation = Math.PI / 2;

	sender.anchor.set(.5, 1);
	sender.x = 10;
	sender.y = height/2;

	var receiver = new PIXI.Text('RECEIVER', style);
	receiver.anchor.set(.5, .5);
	receiver.rotation = -1 * Math.PI / 2;

	receiver.anchor.set(.5, 1);
	receiver.x = width - 10;
	receiver.y = height/2;

	return [sender, receiver];
}

function makePackets(graphics) {

	var NUM_PACKETS = 12;
	var PACKET_WIDTH = 5;
	var PACKET_HEIGHT = 5;
	var PACKET_MARGIN = 3;

	var container = new PIXI.Container();

	for (var i = 0; i < NUM_PACKETS; i++) {
		graphics.drawRect(i * PACKET_WIDTH + (i+1) * PACKET_MARGIN, 0, PACKET_WIDTH, PACKET_HEIGHT);
	}
	container.addChild(graphics)
	return container;
}

function getSenderPackets() {
	var graphics = new PIXI.Graphics();
	graphics.lineStyle(1, PACKET_FROM_SENDER, 1);
	graphics.beginFill(PACKET_FROM_SENDER, .5);

	return makePackets(graphics)
}

function getReceiverPackets() {
	var graphics = new PIXI.Graphics();
	graphics.lineStyle(1, PACKET_FROM_RECEIVER, 1);
	graphics.beginFill(PACKET_FROM_RECEIVER, .5);

	return makePackets(graphics)
}

function getPacketRotation(width, height) {
	var angle = Math.atan((width) / (height / 6.0));
	return (Math.PI / 2) - angle;
}

function initSimulator(element) {

	// Size the parent element, and then
	width = element.offsetWidth;
	height = element.offsetHeight;

	app = new PIXI.Application(width, height, {backgroundColor : 0x222222, antialias: true});
	element.parentElement.replaceChild(app.view, element);

	app.stage.addChild( makeBorders(width, height) );

	app.stage.addChild( ...makeText(width, height) );

	senderPackets = getSenderPackets();
	receiverPackets = getReceiverPackets();

	var packetHeight = senderPackets.height,
		packetWidth = senderPackets.width;

	var rotation = getPacketRotation(width, height * .9);
	rotatedPacketHeight = Math.sin(rotation) * senderPackets.width;
	rotatedPacketWidth = Math.cos(rotation) * senderPackets.width;
	transmissionHeightOffset = height/6 - rotatedPacketHeight;

	senderPackets.rotation = rotation;
	app.stage.addChild(senderPackets);

	receiverPackets.rotation = -1 * rotation;
	app.stage.addChild(receiverPackets);

	// defined in simulator-action.js
	senderStart = 0,
	receiverStart = transmissionHeightOffset;
	verticalMultiplier = rotatedPacketHeight/rotatedPacketWidth;
	packets = senderPackets;

	resetPackets();
}

function resetPackets() {
	numTransmissions = 0;
	senderPackets.x = -1 * rotatedPacketWidth - 2; // Place at Top left corner of canvas
	senderPackets.y = (-1 * rotatedPacketHeight) + 25;
	receiverPackets.x = width + rotatedPacketWidth; // Initialize Off the Grid
	receiverPackets.y = transmissionHeightOffset;
}

function start() {
	flag = document.getElementsByName("flag")[0].value;
	console.log(flag);
	var established = document.getElementById("established");
	var three = established.getElementById("H3");
	established.removeChild(three);
	app.ticker.add(packetMover); // Defined in simulator-action.js
	document.getElementById("startButton").disabled = true;
}

function stop() {
	resetPackets();
	app.ticker.remove(packetMover); // Defined in simulator-action.js
	document.getElementById("startButton").disabled = false;
}
