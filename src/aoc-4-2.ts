import { parseRanges } from "./aoc-4-1"
import fetchChallengeInput from "./fetchChallengeInput"

interface Range {
    min: number,
    max: number
}

const doRangesOverlap = (range1: Range, range2: Range): boolean =>
    range1.min <= range2.max && range1.max >= range2.min

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(4)
    const countContainingRanges = challengeInput.split('\n').reduce((cnt: number, rangesString: string) => {
        if (rangesString) {
            const ranges = parseRanges(rangesString)
            if (doRangesOverlap(ranges[0], ranges[1])) {
                cnt++
            }
        }
        return cnt
    }, 0)
    console.log('Answer is:', countContainingRanges)
}