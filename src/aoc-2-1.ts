import fetchChallengeInput from './fetchChallengeInput'

// Define moves
export const enum MOVE {
    ROCK = 'rock',
    PAPER = 'paper',
    SCISSORS = 'scissors', 
}

export const oppnentMoveMap: { [moveCode: string]: string } = {
    'A': MOVE.ROCK,
    'B': MOVE.PAPER,
    'C': MOVE.SCISSORS,
}

export const meMoveMap: { [moveCode: string]: string } = {
    'X': MOVE.ROCK,
    'Y': MOVE.PAPER,
    'Z': MOVE.SCISSORS,
}

// Define game rules
interface Rule {
    moves: Array<string>
    winner: string
}

export const rules: Array<Rule> = [
    {
       moves: [MOVE.ROCK, MOVE.PAPER],
       winner:  MOVE.PAPER
    },
    {
       moves: [MOVE.PAPER, MOVE.SCISSORS],
       winner:  MOVE.SCISSORS
    },
    {
       moves: [MOVE.SCISSORS, MOVE.ROCK],
       winner:  MOVE.ROCK
    },
]

// Define result scoring
const enum GAME_RESULT {
    OPPONENT_WINS = 1,
    ME_WIN = 2,
    DRAW = 3,
}

const enum SCORE {
    WINNER = 6,
    DRAW = 3,
}

const scoreMoveMap: { [moveCode: string]: number } = {
    [MOVE.ROCK]: 1,
    [MOVE.PAPER]: 2,
    [MOVE.SCISSORS]: 3,
}

const getGameResult = (opponentMoveCode: string, myMoveCode: string): GAME_RESULT => {
    const oppnentMove = oppnentMoveMap[opponentMoveCode]
    const meMove = meMoveMap[myMoveCode]

    if (oppnentMove === meMove) {
        return GAME_RESULT.DRAW
    }

    const rule = rules.filter(rule => rule.moves.includes(oppnentMove) && rule.moves.includes(meMove))
    const winningMove = rule[0].winner

    return oppnentMove === winningMove ? GAME_RESULT.OPPONENT_WINS : GAME_RESULT.ME_WIN
}

export const calculateScore = (opponentMoveCode: string, myMoveCode: string): number => {
    let score = 0
    const result = getGameResult(opponentMoveCode, myMoveCode)
    if (result === GAME_RESULT.ME_WIN) {
        score += SCORE.WINNER
    }
    if (result === GAME_RESULT.DRAW) {
        score += SCORE.DRAW
    }

    const myMove = meMoveMap[myMoveCode]
    score += scoreMoveMap[myMove]

    return score
}

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(2)
    const result = challengeInput
    .split('\n')
    .reduce((totalScore, currentGame) => {
        if (currentGame) {
            const moves = currentGame.split(' ')
            totalScore += calculateScore(moves[0], moves[1])
        }
        return totalScore
        }, 0)
    console.log('Answer is:', result)
}
