import { calculatePriority } from "./aoc-3-1"
import fetchChallengeInput from "./fetchChallengeInput"

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(3)
    const ruckascks = challengeInput.split('\n')

    let sum = 0

    for (let rucksackIndex = 0; rucksackIndex < ruckascks.length; rucksackIndex += 3){
        const group = ruckascks.slice(rucksackIndex, rucksackIndex + 3)   
        for (let itemIndex = 0; itemIndex < group[0].length; itemIndex++) {
            const item = group[0].charAt(itemIndex)
            if (group[1].includes(item) && group[2].includes(item)) {
                sum += calculatePriority(item)
                break
            }
        }
    }

    console.log('Answer is:', sum)
}
    