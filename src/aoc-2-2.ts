import fetchChallengeInput from './fetchChallengeInput'
import { calculateScore, meMoveMap, oppnentMoveMap, rules } from './aoc-2-1'

enum ANTICIPATED_RESULT {
    OPPONENT_WINS = 'X',
    DRAW = 'Y',
    ME_WIN = 'Z'
}

const pickMove = (opponentMoveCode: string, anticipatedResultCode: string): string | undefined => {
    const oppnentMove = oppnentMoveMap[opponentMoveCode]
    // Draw - return the same move
    if (anticipatedResultCode === ANTICIPATED_RESULT.DRAW) {
        return oppnentMove
    }

    let rule
    // I want to win => find rule including oppnentMove WHERE oppnentMove != winner
    if (anticipatedResultCode === ANTICIPATED_RESULT.ME_WIN) {
        rule = rules.filter(rule => rule.moves.includes(oppnentMove) && rule.winner !== oppnentMove)
    } 
    // Opponent needs to win find rule including oppnentMove WHERE oppnentMove == winner
    if (anticipatedResultCode === ANTICIPATED_RESULT.OPPONENT_WINS) {
        rule = rules.filter(rule => rule.moves.includes(oppnentMove) && rule.winner === oppnentMove)
    }

    // Get the other move from rule
    const move = rule?.[0].moves.filter(m => m !== oppnentMove)

    return move?.[0]
}

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(2)
    const result = challengeInput
    .split('\n')
    .reduce((totalScore, currentGame) => {
        if (currentGame) {
            const [opponentMoveCode, anticipatedResultCode] = currentGame.split(' ')
            const myMove = pickMove(opponentMoveCode, anticipatedResultCode)
            const index = Object.values(meMoveMap).findIndex(value => value === myMove)
            const keys = Object.keys(meMoveMap)
            const myMoveCode = keys[index]
            totalScore += calculateScore(opponentMoveCode, myMoveCode)
        }
        return totalScore
        }, 0)
    console.log('Answer is:', result)
}
