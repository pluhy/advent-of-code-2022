import fetchChallengeInput from "./fetchChallengeInput"

type Stack = Array<string>
type StacksLevel = { [stackNumber: number]: string }

const parseStackLine = (line: string): StacksLevel => {
    const stacksLevel: StacksLevel = {}
    const stackCount = (line.length - 3) / 4 + 1 
    for (let i = 1; i < stackCount * 4; i +=4){
        const letter = line.charAt(i)
        if (letter != ' ') {
            const stackNumber: number = (i + 3) / 4
            stacksLevel[stackNumber] = letter
        }
    }

    return stacksLevel
}

const createStacks = (stackLines: string[]): Stack[] => {
    const stacks: Stack[] = []
    stackLines.reverse().forEach(stackLine => {
        const stackLevel = parseStackLine(stackLine)
        Object.keys(stackLevel).forEach(stackNumberString => {
            const stackNumber = parseInt(stackNumberString)
            if (!stacks[stackNumber]) {
                stacks[stackNumber] = []
            }
            stacks[stackNumber].push(stackLevel[stackNumber])
        })
    })

    return stacks
}

const performMove = (stacks: Stack[], move: string): Stack[] => {
    const [number, from, to] = (move.match(/\d+/g) || []).map(item => parseInt(item))
    stacks[to].push(...stacks[from].splice(number * -1).reverse())

    return stacks
}

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(5)
    const stackLines: string[] = []
    const moves: string[] = []
    challengeInput.split('\n').forEach(line => {
        if (line.indexOf('[') !== -1) {
            stackLines.push(line)
        } else if (line.indexOf('move') !== -1) {
            moves.push(line)
        }
    })

    let stacks = createStacks(stackLines)
    moves.forEach(move => stacks = performMove(stacks, move))
    const topLevelItems = stacks.map(stack => stack[stack.length - 1]).reduce((resultString, item) => resultString += item, '')

    console.log('Answer is:', topLevelItems)
}