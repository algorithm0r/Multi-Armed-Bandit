// Define the probabilities of winning for each arm
const probabilities = [1, 0.5, 0.2, 0.1, 0.05];

// Define the reward range for each arm
const rewardRanges = [
	{ min: 1, max: 1 },
	{ min: 1, max: 3 },
	{ min: 5, max: 15 },
	{ min: 15, max: 15 },
	{ min: 1, max: 100 }
];

// Track the number of times each arm has been pulled, the total reward, and the expected value
const numPulls = [0, 0, 0, 0, 0];
const numRewards = [0, 0, 0, 0, 0];
const totalRewards = [0, 0, 0, 0, 0];

let totalReward = 0;
let totalCost = 0;

const expectedValues = probabilities.map((prob, index) => {
	const range = rewardRanges[index];
	const minExpectedValue = range.min * prob;
	const maxExpectedValue = range.max * prob;
	return (minExpectedValue + maxExpectedValue) / 2;
});

// Function to simulate pulling an arm and calculating the reward
function pullArm(armIndex) {
	totalCost++;
	// Increment the number of times the arm has been pulled
	numPulls[armIndex]++;
	document.getElementById(`arm${armIndex + 1}-pulls`).innerHTML = `Pulls: ${numPulls[armIndex]}`;
	// Simulate a random reward from the range
	const range = rewardRanges[armIndex];
	const reward = Math.random() < probabilities[armIndex] ? Math.floor(Math.random() * (range.max - range.min + 1)) + range.min : 0;
	if (reward > 0) numRewards[armIndex]++;
	document.getElementById(`arm${armIndex + 1}-rewards`).innerHTML = `Rewards: ${numRewards[armIndex]}`;

	const rewardPercent = Math.floor(numRewards[armIndex] / numPulls[armIndex] * 100);
	document.getElementById(`arm${armIndex + 1}-reward-percent`).innerHTML = `Reward Chance: ${rewardPercent}%`;

	if (reward > 0) totalRewards[armIndex] += reward;
	const average = numRewards[armIndex] === 0 ? 0 : totalRewards[armIndex] / numRewards[armIndex]
	document.getElementById(`arm${armIndex + 1}-average-reward`).innerHTML = `Average Reward: ${(average).toFixed(1)}`;

	const expected = average * rewardPercent / 100;
	document.getElementById(`arm${armIndex + 1}-expected-reward`).innerHTML = `Expected Reward: ${(expected).toFixed(1)}`;
	// Update the total reward
	totalReward += reward;

	// Display the reward message
	const message = reward > 0 ? `You won ${reward} points!` : "You lost!";
	document.getElementById("reward-message").textContent = message;

	// Update the total reward display
	document.getElementById("total-reward").textContent = `Total Reward: \$${totalReward}`;
	document.getElementById("total-cost").textContent = `Total Cost: \$${totalCost}`;
}
