import fetchChallengeInput from "./fetchChallengeInput"

interface Range {
    min: number,
    max: number
}

const isRangeContained = (range1: Range, range2: Range): boolean =>
    range1.min >= range2.min && range1.max <= range2.max || range2.min >= range1.min && range2.max <= range1.max

export const parseRanges = (rangesString: string): Array<Range> => {
    return rangesString.split(',').map(rangeString => {
        const rangeValues = rangeString.split('-')
        return {
            min: parseInt(rangeValues[0], 10),
            max: parseInt(rangeValues[1], 10),
        }
    })
}

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(4)
    const countContainingRanges = challengeInput.split('\n').reduce((cnt: number, rangesString: string) => {
        if (rangesString) {
            const ranges = parseRanges(rangesString)
            if (isRangeContained(ranges[0], ranges[1])) {
                cnt++
            }
        }
        return cnt
    }, 0)
    console.log('Answer is:', countContainingRanges)
}