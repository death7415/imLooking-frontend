import test from 'node:test'
import assert from 'node:assert/strict'
import { PERFORMANCE_BUDGET } from '../src/shared/config/performance-budget.js'

test('performance budget thresholds are defined and positive', () => {
  assert.ok(PERFORMANCE_BUDGET.maxHtmlBytes > 0)
  assert.ok(PERFORMANCE_BUDGET.maxTotalCssBytes > 0)
  assert.ok(PERFORMANCE_BUDGET.maxTotalJsBytes > 0)
})
