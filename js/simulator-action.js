function packetMover(delta) {
	// console.log(verticalMultiplier, senderStart, receiverStart);

	if (direction == SENDER && packets.x >= width - 20) {

		direction *= -1;
		packets.x = -1 * rotatedPacketWidth - 2;

		var current = packets.y;
		packets = receiverPackets;
		packets.y = current - rotatedPacketHeight;

		numTransmissions++;

	} else if (direction == RECEIVER && packets.x < -1 * rotatedPacketWidth - 20) {

		direction *= -1;
		packets.x = width + rotatedPacketWidth;

		var current = packets.y;
		packets = senderPackets;
		packets.y = current - 2 * rotatedPacketHeight;

		timeout.scale.x = 1;
		timeout.x = 0;

		numTransmissions++;

	} else {

		var deltaX = speed * direction * delta;
		var deltaY = Math.abs(deltaX * verticalMultiplier);
		var deltaTimeout = delta * TIMEOUT_SPEED;

		if (flag == "PACKET_LOSS" && direction == SENDER
				&& packets.x >= width * .5 - rotatedPacketWidth/2 && numTransmissions == 2) {
			packetLoss();
			deltaX = 0;
			deltaY = 0;
		}
		
		else if (flag == "3_WAY_HANDSHAKE"
			&& numTransmissions == 3) {
			threeWay();
			deltaX = 0;
			deltaY = 0;
		}
		
		packets.x += deltaX;
		packets.y += deltaY;

		timeout.scale.x -= deltaTimeout;
		timeout.x += width * deltaTimeout/2; // Keeps rectangle centered while shrinking it

	}

	if (numTransmissions == 6) {
		stop();
		resetPackets();
	}

}

// TODO do this better!
function packetLoss() {
	if (packets.alpha != 0) {
		packets.alpha -= .1;
	}
	if (timeout.scale.x <= 0) {
		timeout.scale.x = 1;
		timeout.x = 0;

		packets.x = -1 * rotatedPacketWidth - 2;
		packets.y = height/3;
		packets.alpha = 1;
		flag = "NORMAL_OPERATION";
		var retransmit = document.getElementById("retransmit");
		var re = document.createElement('H3');
		re.innerHTML = 'Retransmitting';
		retransmit.appendChild(re);
	}

}

var offset = 0;
var START_X = 0;
var START_Y = 0;

// Track Packet Movement
function dashedLine(delta) {
	var container = new PIXI.Container();
	var graphics = new PIXI.Graphics();

	graphics.lineStyle(0.3, 0xc0c0c0);

	if (offset % 20 == 0){
		graphics.moveTo(START_X, START_Y);
		graphics.lineTo(packets.x, packets.y);
		START_X = packets.x;
		START_Y = packets.y;
	}

	offset+=5;
	app.stage.addChild(graphics);

}

function threeWay() {
	if (packets.alpha != 0) {
		packets.alpha -= .1;
	}
	//alert("Connection Established!");
	var established = document.getElementById("established");
	var estab = document.createElement('H3');
	estab.innerHTML = 'Connection Established';
	established.appendChild(estab);
	packets.x = -1 * rotatedPacketWidth - 2;
	packets.y = height/2;
	packets.alpha = 1;
	flag = "NORMAL_OPERATION";
	numTransmissions = 2;
}
