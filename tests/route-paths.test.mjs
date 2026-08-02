import test from 'node:test'
import assert from 'node:assert/strict'
import { ROUTE_PATHS } from '../src/app/router/route-paths.js'

test('route paths are unique and absolute', () => {
  const routeValues = Object.values(ROUTE_PATHS)
  const uniqueValues = new Set(routeValues)

  assert.equal(uniqueValues.size, routeValues.length)

  routeValues.forEach((routePath) => {
    assert.equal(routePath.startsWith('/'), true)
  })
})
