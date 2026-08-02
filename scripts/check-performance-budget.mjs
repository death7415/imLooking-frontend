import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { PERFORMANCE_BUDGET } from '../src/shared/config/performance-budget.js'

const cwd = process.cwd()
const distPath = path.join(cwd, 'dist')
const assetsPath = path.join(distPath, 'assets')

const htmlSize = (await stat(path.join(distPath, 'index.html'))).size
const assetEntries = await readdir(assetsPath)

let totalCssBytes = 0
let totalJsBytes = 0

for (const assetEntry of assetEntries) {
  const assetPath = path.join(assetsPath, assetEntry)
  const assetSize = (await stat(assetPath)).size

  if (assetEntry.endsWith('.css')) {
    totalCssBytes += assetSize
  }

  if (assetEntry.endsWith('.js')) {
    totalJsBytes += assetSize
  }
}

const results = [
  ['index.html', htmlSize, PERFORMANCE_BUDGET.maxHtmlBytes],
  ['css total', totalCssBytes, PERFORMANCE_BUDGET.maxTotalCssBytes],
  ['js total', totalJsBytes, PERFORMANCE_BUDGET.maxTotalJsBytes],
]

const failures = results.filter(([, actual, limit]) => actual > limit)

if (failures.length > 0) {
  console.error('Performance budget failed:')
  failures.forEach(([label, actual, limit]) => {
    console.error(`- ${label}: ${actual} bytes exceeds ${limit} bytes`)
  })
  process.exit(1)
}

console.log('Performance budget passed.')
results.forEach(([label, actual, limit]) => {
  console.log(`- ${label}: ${actual}/${limit} bytes`)
})
