/* Play a game of Rock, Paper, Scissors
 * 	params: shot - optional string
 * 	output: 
 * 		object with player param on no input
 * 		object with player, opponent, and result params on input
 * 		undefined on out of bounds input (any string other than rock, paper, or scissors) */
export function rps(shot) {
	const choice_number = Math.floor(Math.random() * 3); 
	var opponent;
	switch (choice_number) {
			case 0:
				opponent = "rock";
				break;
			case 1:
				opponent = "paper";
				break;
			default:
				opponent = "scissors";
				break;
	}
	if (shot === undefined) { return {player: opponent} }

	var result;
	shot = shot.toLowerCase();
	switch (shot) {
		case "rock":
			switch (opponent) {
				case "rock":
					result = "tie";
					break;
				case "paper":
					result = "lose";
					break;
				default:
					result = "win";
					break;
			}
			break;
		case "paper":
			switch (opponent) {
				case "rock":
					result = "win";
					break;
				case "paper":
					result = "tie";
					break;
				default:
					result = "lose";
					break;
			}
			break;
		case "scissors":
			switch (opponent) {
				case "rock":
					result = "lose";
					break;
				case "paper":
					result = "win";
					break;
				default:
					result = "tie";
					break;
			}
			break;
		default:
			return;
	}
	return {
		player: shot,
		opponent: opponent,
		result: result
	}
}

/* Play a game of Rock, Paper, Scissors, Lizard, Spock
 * 	params: shot - optional string
 * 	output: 
 * 		object with player param on no input
 * 		object with player, opponent, and result params on input
 * 		undefined on out of bounds input (any string other than rock, paper, scissors, lizard, or spock) */
export function rpsls(shot) {
	const choice_number = Math.floor(Math.random() * 5); 
	var opponent;
	switch (choice_number) {
		case 0:
			opponent = "rock";
			break;
		case 1:
			opponent = "paper";
			break;
		case 2:
			opponent = "scissors";
			break;
		case 3:
			opponent = "lizard";
			break;
		default:
			opponent = "spock";
			break;
	}
	if (shot === undefined) { return {player: opponent} }

	var result;
	shot = shot.toLowerCase();
	switch (shot) {
		case "rock":
			switch (opponent) {
				case "rock":
					result = "tie";
					break;
				case "paper":
					result = "lose";
					break;
				case "scissors":
					result = "win";
					break;
				case "lizard":
					result = "win";
					break;
				default:
					result = "lose";
					break;
			}
			break;
		case "paper":
			switch (opponent) {
				case "rock":
					result = "win";
					break;
				case "paper":
					result = "tie";
					break;
				case "scissors":
					result = "lose";
					break;
				case "lizard":
					result = "lose";
					break;
				default:
					result = "win";
					break;

			}
			break;
		case "scissors":
			switch (opponent) {
				case "rock":
					result = "lose";
					break;
				case "paper":
					result = "win";
					break;
				case "scissors":
					result = "tie";
					break;
				case "lizard":
					result = "win";
					break;
				default:
					result = "lose";
					break;

			}
			break;
		case "lizard":
			switch (opponent) {
				case "rock":
					result = "lose";
					break;
				case "paper":
					result = "win";
					break;
				case "scissors":
					result = "lose";
					break;
				case "lizard":
					result = "tie";
					break;
				default:
					result = "win";
					break;

			}
			break;
		case "spock":
			switch (opponent) {
				case "rock":
					result = "win";
					break;
				case "paper":
					result = "lose";
					break;
				case "scissors":
					result = "win";
					break;
				case "lizard":
					result = "lose";
					break;
				default:
					result = "tie";
					break;

			}
			break;
		default:
			return;
	}
	return {
		player: shot,
		opponent: opponent,
		result: result
	}
}
