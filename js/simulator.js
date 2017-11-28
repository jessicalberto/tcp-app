var BLACK = 0x000000;
var WHITE = 0xFFFFFF;

function makeBorders(width, height) {
	var graphics = new PIXI.Graphics();
	graphics.beginFill(BLACK);
	graphics.lineStyle(2, WHITE, 1);

	// Draw Top Border
	graphics.moveTo(0,0);
	graphics.lineTo(width, 0);
	graphics.endFill();

	// Draw Bottom Border
	graphics.moveTo(0, height);
	graphics.lineTo(width, height);
	graphics.endFill();

	return graphics;
}

function makeGreenPackets() {
	var container = new PIXI.Container();

	// Create 5 green rectangles
	var graphics = new PIXI.Graphics();
	graphics.lineStyle(1, 0xFF500, 1);
	graphics.beginFill(0xFF500, .5);

	var NUM_PACKETS = 5;
	for (var i = 0; i < NUM_PACKETS; i++) {
		graphics.drawRect(i * 25 + 5, 5, 20, 15); // 5's represent padding
	}
	container.addChild(graphics)
	return container;
}

function makeRedPackets() {
	var container = new PIXI.Container();

	// Create 5 red rectangles
	var graphics = new PIXI.Graphics();
	graphics.lineStyle(1, 0xFF0000, 1);
	graphics.beginFill(0xFF0000, .5);

	var NUM_PACKETS = 5;
	for (var i = 0; i < NUM_PACKETS; i++) {
		graphics.drawRect(i * 25 + 5, 5, 20, 15); // 5's represent padding
	}
	container.addChild(graphics)
	return container;
}

function getPacketAngle(width, height) {
	var triangleWidth = (width * .9) / 3;
	return Math.atan(height/(width/4))
}

function initSimulator(width, height) {

	var app = new PIXI.Application(width, height, {backgroundColor : 0x222222, antialias: true});
	document.body.appendChild(app.view);

	var borders = makeBorders(width, height);
	app.stage.addChild(borders);

	var packets = makeGreenPackets(app);
	var angle = getPacketAngle(width*.9, height);
	var xMultiplier = 1.0 / Math.tan(angle);

	packets.rotation = -1 * angle;
	packets.x = 100; // Place at bottom left corner of canvas
	packets.y = height-100;
	app.stage.addChild(packets);

// TESTING
	var packets2 = makeRedPackets(app);
	var angle2 = getPacketAngle(width*.9, height);
	var xMultiplier2 = 1.0 / Math.tan(angle);

	packets2.rotation = -1 * angle;
	packets2.x = 100; // Place at bottom left corner of canvas
	packets2.y = height-100;
//app.stage.addChild(packets2);
//// END TESTING

	var packetsHeight = Math.sin(angle) * packets.width;

	var speed = -5; // UP (y decrements)

	app.ticker.add(function(delta) {
		var deltaY = (speed * delta);

		var newY = packets.y + deltaY;
		var newX = packets.x + Math.abs(deltaY * xMultiplier);

		if (newY < -40 || newY > height) {
			speed *= -1;
			packets.rotation *= -1;
		}

		packets.x = newX;
		packets.y = newY;


	});

}
