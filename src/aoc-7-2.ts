import { createDirectoryTree } from "./aoc-7-1"
import fetchChallengeInput from "./fetchChallengeInput"

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(7)
    // const challengeInput = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`

    const directoryTree = createDirectoryTree(challengeInput)

    const totalSize = 70000000
    const unusedsizeNeeded = 30000000
    const sizeUsed = directoryTree.directorySizes['/']
    const sizeUnused = totalSize - sizeUsed
    const sizeToFree = unusedsizeNeeded - sizeUnused

    // Get the smallest directory > sizeToFree
    const result = Object.values(directoryTree.directorySizes).reduce((res, size) => (size > sizeToFree && (res === 0 || size < res) ? size : res), 0)

    console.log('Answer is:', result)
}