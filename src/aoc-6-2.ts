import { hasStringUniqueChars } from "./aoc-6-1"
import fetchChallengeInput from "./fetchChallengeInput"

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(6)
    let marker

    for (let i = 0; i < challengeInput.length; i++) {
        const s = challengeInput.slice(i, i + 14)
        if (hasStringUniqueChars(s) === true) {
            marker = i + 14
            break
        }
    }

    console.log('Answer is:', marker)
}