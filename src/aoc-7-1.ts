import { cp } from "fs"
import fetchChallengeInput from "./fetchChallengeInput"

enum COMMAND {
    CD = 'cd',
    LS = 'ls'
}

enum MODE {
    NONE = 'none',
    CHANGING_DIR = 'cd',
    LISTING_DIR_CONTENT = 'ls'
}

interface Directory {
    directories: {[directoryName: string]: Directory},
    files: string[]
}

interface DirectoryTree {
    currentPath: string[],
    currentMode: MODE,
    directoryTree: Directory,
    directorySizes: {[directoryName: string]: number}
}
const isCommand = (line: string): boolean => line.charAt(0) === '$'

const getFileSize = (line: string): number => parseInt(line.split(' ')[0], 10)

const updateDirectoriesSize = (tree: DirectoryTree, line: string): DirectoryTree => {
    const fileSize = getFileSize(line)
    let directoryIndex = '' // Directory names are not unique in the whole directory tree, so we need to index them with their full path
    tree.currentPath.forEach(directoryName => {
        directoryIndex += directoryName
        if (!tree.directorySizes[directoryIndex]) {
            tree.directorySizes[directoryIndex] = 0
        }
        tree.directorySizes[directoryIndex] += fileSize
    })

    return tree
}

const updateDirectoryTree = (tree: DirectoryTree, line: string): DirectoryTree => {

    if (tree.currentMode === MODE.CHANGING_DIR) {
        const commandParts = line.split(' ')
        const arg = commandParts[2]
        if (arg === '..') {
            tree.currentPath.pop()
        } else {
            let currentDirectoryObject = tree.currentPath.reduce((acc, key) => acc.directories[key], tree.directoryTree)
            if (!currentDirectoryObject.directories[arg]) {
                currentDirectoryObject.directories[arg] = {
                    directories: {},
                    files: [],
                }
            }
            tree.currentPath.push(arg)
        }
    }

    if (tree.currentMode === MODE.LISTING_DIR_CONTENT) {
        if (line.indexOf('dir') === -1) {
            let currentDirectoryObject = tree.currentPath.reduce((acc, key) => acc.directories[key], tree.directoryTree)
            currentDirectoryObject.files.push(line)
            tree = updateDirectoriesSize(tree, line)
        }
    }

    return tree
}

export const createDirectoryTree = (challengeInput: string): DirectoryTree => {
    return challengeInput.split('\n').reduce((tree: DirectoryTree, line: string) => {
        if (line) {
            if (isCommand(line)) {
                if (line.indexOf(COMMAND.CD) !== -1) {
                    tree.currentMode = MODE.CHANGING_DIR
                }
                if (line.indexOf(COMMAND.LS) !== -1) {
                    tree.currentMode = MODE.LISTING_DIR_CONTENT
                    return tree
                }
            }
            return updateDirectoryTree(tree, line)
        }
        return tree
    }, {
        currentPath: [],
        currentMode: MODE.NONE,
        directoryTree: {
            directories: {},
            files: [],
        },
        directorySizes: {}
    })
}

export const runChallenge = async () => {
    const challengeInput = await fetchChallengeInput(7)
//     const challengeInput = `$ cd /
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
    const result = Object.values(directoryTree.directorySizes).filter(size => size <= 100000).reduce((sum, size) => sum += size)
    console.log('Answer is:', result)
}