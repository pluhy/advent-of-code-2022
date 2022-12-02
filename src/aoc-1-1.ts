import fetchChallengeInput from './fetchChallengeInput'

export const runChallenge = async () => {

	const challengeInput = await fetchChallengeInput(1)
	
	const result = challengeInput
		.split('\n\n')
		.reduce((max, item) => {
			const sum = item
				.split('\n')
				.reduce((acc, i) => acc += Number.isNaN(parseInt(i, 10)) ? 0 : parseInt(i, 10), 0)
			return sum > max ? sum : max
		}, 0)
	console.log('Answer is:', result)
}