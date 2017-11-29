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
	var width = element.offsetWidth, height = element.offsetHeight
	var app = new PIXI.Application(width, height, {backgroundColor : 0x222222, antialias: true});
	element.parentElement.replaceChild(app.view, element);

	app.stage.addChild( makeBorders(width, height) );

	var senderPackets = getSenderPackets();
	var receiverPackets = getReceiverPackets();

	var packetHeight = senderPackets.height,
		packetWidth = senderPackets.width;

	var rotation = getPacketRotation(width, height),
		rotatedHeight = Math.sin(rotation) * senderPackets.width,
		rotateWidth = Math.cos(rotation) * senderPackets.width;

	var senderStart = 0,
		receiverStart = height/6;

	senderPackets.rotation = rotation;
	senderPackets.x = -1 * packetWidth; // Place at bottom left corner of canvas
	senderPackets.y = (-1 * rotatedHeight) - packetHeight;
	app.stage.addChild(senderPackets);

	receiverPackets.rotation = -1 * rotation;
	receiverPackets.x = 100; // Initialize Off the Grid
	receiverPackets.y = 100;
	app.stage.addChild(receiverPackets);

	// app.ticker.add(function(delta) {
	// 	var deltaY = (speed * delta);

	// 	if (direction == 1){
	// 		var newY = packets.y + deltaY;
	// 		var newX = packets.x + Math.abs(deltaY * xMultiplier);

	// 		if (newY < -40) {
	// 			speed *= -1;
	// 			packets2.x = newX;
	// 			packets2.y = newY;
	// 			direction = 0;
	// 		}

	// 		packets.x = newX;
	// 		packets.y = newY;
	// 	}

	// 	if (direction == 0){
	// 		var newY2 = packets2.y + deltaY;
	// 		var newX2 = packets2.x + Math.abs(deltaY * xMultiplier);

	// 		if (newY2 > height) {
	// 			speed *= -1;
	// 			packets.x = newX2;
	// 			packets.y = newY2;
	// 			direction = 1;
	// 		}

	// 		packets2.x = newX2;
	// 		packets2.y = newY2;
	// 	}


	// });
}

var speed = 5; // RIGHT (x increases)
var direction = 1; // 1 = RIGHt 0 = LEFT

function ticker() {

}