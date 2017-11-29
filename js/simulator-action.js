function packetMover(delta) {
	// console.log(verticalMultiplier, senderStart, receiverStart);
	var deltaX = speed * direction * delta;
	var deltaY = Math.abs(deltaX * verticalMultiplier);

	if (direction == SENDER && packets.x >= width - 20) {

		direction *= -1;
		packets.x = -1 * rotatedPacketWidth - 2;
		var current = packets.y;
		packets = receiverPackets;
		packets.y = current - rotatedPacketHeight;

		numTransmissions++;
		console.log(numTransmissions);

	} else if (direction == RECEIVER && packets.x < -1 * rotatedPacketWidth - 20) {

		direction *= -1;
		packets.x = width + rotatedPacketWidth;
		var current = packets.y;
		packets = senderPackets;
		packets.y = current - 2 * rotatedPacketHeight;

		numTransmissions++;
		console.log(numTransmissions);

	} else {
		packets.x += deltaX;
		packets.y += deltaY;
	}

	if (numTransmissions == 6) {
		stop();
	}

}