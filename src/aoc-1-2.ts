import fetchChallengeInput from './fetchChallengeInput'

const updateTop3 = (number: number, top3Array: number[]) => {
	let updatedArray = top3Array
	for (let i = 0; i < 3; i++){
		if (number > top3Array[i]) {
			updatedArray.splice(i, 0, number)
			updatedArray.pop()
			break
		}
	}

	return updatedArray
}

export const runChallenge = async () => {

	const challengeInput = await fetchChallengeInput(1)
	
	const result = challengeInput
		.split('\n\n')
		.reduce((top3, item) => {
			const sum = item.split('\n').reduce((acc, i) => acc += Number.isNaN(parseInt(i, 10)) ? 0 : parseInt(i, 10), 0)
			top3 = updateTop3(sum, top3)
			return top3
		}, [0, 0, 0])
		const resultSum = result.reduce((acc, item) => acc += item)
		console.log('Answer is:', resultSum)
}