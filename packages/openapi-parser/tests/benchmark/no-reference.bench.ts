import { bench, describe, expect } from 'vitest'

import { resolveNew } from './utils/resolveNew.js'
import { resolveOld } from './utils/resolveOld.js'

describe('no reference', () => {
  const specification = {
    openapi: '3.1.0',
    info: {
      title: 'Hello World',
      version: '2.0.0',
    },
    paths: {},
  }

  bench('@apidevtools/swagger-parser', async () => {
    // Action!
    await resolveOld(specification)
  })

  bench('@mintlify/openapi-parser', async () => {
    // Action!
    await resolveNew(specification)
  })
})
