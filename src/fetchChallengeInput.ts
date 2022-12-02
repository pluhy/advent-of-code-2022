import fetch, { RequestInit } from 'node-fetch'

const fetchChallengeInput = async (day: number): Promise<string> => {
    const sessionId = process.env.SESSION_ID
    const url = `https://adventofcode.com/2022/day/${day.toString()}/input`
    const fetchOptions: RequestInit = {
		headers: {
			cookie: `session=${sessionId}`
		}
	}
    const response = await fetch(url, fetchOptions)
    const responseText = await response.text()

    return responseText
}

export default fetchChallengeInput