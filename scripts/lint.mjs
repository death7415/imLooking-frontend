import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const cwd = process.cwd()
const directoriesToCheck = ['src', 'scripts', 'tests']
const extensionsToCheck = new Set(['.js', '.jsx', '.mjs', '.css', '.md'])
const violations = []

async function walk(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      await walk(entryPath)
      continue
    }

    if (!extensionsToCheck.has(path.extname(entry.name))) {
      continue
    }

    const contents = await readFile(entryPath, 'utf8')
    const relativePath = path.relative(cwd, entryPath)

    if (/^<<<<<<<|^>>>>>>>/m.test(contents)) {
      violations.push(`${relativePath}: merge conflict marker found`)
    }

    const lines = contents.split('\n')

    lines.forEach((line, index) => {
      if (/[ \t]+$/.test(line)) {
        violations.push(`${relativePath}:${index + 1}: trailing whitespace`)
      }
    })
  }
}

for (const directory of directoriesToCheck) {
  await walk(path.join(cwd, directory))
}

if (violations.length > 0) {
  console.error('Lint baseline failed:')
  violations.forEach((violation) => console.error(`- ${violation}`))
  process.exit(1)
}

console.log('Lint baseline passed.')
