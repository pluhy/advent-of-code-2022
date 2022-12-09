import fetchChallengeInput from "./fetchChallengeInput"

export const calculatePriority = (item: string): number => {
    const isUpperCase = item.toUpperCase() === item
    const priority = isUpperCase ? item.charCodeAt(0) - 64 + 26 : item.charCodeAt(0) - 96

    return priority
}

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(3)
    const ruckascks = challengeInput
    .split('\n')

    let totalPriority = 0

    ruckascks.forEach(rucksack => {
        if (rucksack) {
            const rucksackArray = [...rucksack]
            const comp1 = rucksackArray.slice(0, rucksackArray.length / 2)
            const comp2 = rucksackArray.slice(rucksackArray.length / 2, rucksackArray.length)

            const duplicates = comp1.reduce((acc: string[], item: string) => {
                if (comp2.includes(item) && !acc.includes(item)) {
                    acc.push(item)
                }
                return acc
            }, [])

            const priority = duplicates.reduce((acc: number, item: string) => acc += calculatePriority(item), 0)
            totalPriority += priority
        }
    })

    console.log('Answer is:', totalPriority)
}