import * as dotenv from 'dotenv'

dotenv.config()

const main = async () => {
    const args = process.argv.slice(2)
    if (args.length === 2) {
        const challenge = await import(`./aoc-${args[0]}-${args[1]}.ts`)
        challenge.runChallenge()
    }
}

main()