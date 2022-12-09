import fetchChallengeInput from "./fetchChallengeInput"

export const hasStringUniqueChars = (s: string): boolean => {
    let unique = true
    const charsSet = new Set()

    for (let i=0; i < s.length; i++) {
        const ch = s.charAt(i)
        if (!charsSet.has(ch)) {
            charsSet.add(ch)
            } else {
              unique = false
            }
      }

      return unique
}

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(6)
    let marker

    for (let i = 0; i < challengeInput.length; i++) {
        const s = challengeInput.slice(i, i + 4)
        if (hasStringUniqueChars(s) === true) {
            marker = i + 4
            break
        }
    }

    console.log('Answer is:', marker)
}