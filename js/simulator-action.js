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

		timer.scale.x = 1; 
		timer.x = 0;

		numTransmissions++;

	} else {
		var deltaX = speed * direction * delta;
		var deltaY = Math.abs(deltaX * verticalMultiplier);

		packets.x += deltaX;
		packets.y += deltaY;

		timer.scale.x -= delta * TIMEOUT_SPEED; 
		timer.x += delta * width * TIMEOUT_SPEED/2;

		if (flag == "PACKET_LOSS"
			&& direction == SENDER
			&& packets.x >= width * .5
			&& numTransmissions == 2) {
			packetLoss();
		}


	}

	if (numTransmissions == 6) {
		stop();
	}

}

// TODO do this better!
function packetLoss() {
	stop();
	alert("Packet lost!");
}
