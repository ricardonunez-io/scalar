import fs from 'node:fs'

import { ERRORS } from '../../configuration/index.js'
import { dirname, join } from '../../polyfills/path.js'
import { isJson } from '../../utils/isJson.js'
import { isYaml } from '../../utils/isYaml.js'
import type { LoadPlugin } from '../../utils/load/index.js'

export const readFiles: () => LoadPlugin = () => {
  return {
    check(value?: any) {
      // Not a string
      if (typeof value !== 'string') {
        return false
      }

      // URL
      if (value.startsWith('http://') || value.startsWith('https://')) {
        return false
      }

      // Line breaks
      if (value.includes('\n')) {
        return false
      }

      // JSON
      if (isJson(value)) {
        return false
      }

      // YAML (run through YAML.parse)
      if (isYaml(value)) {
        return false
      }

      return true
    },
    async get(value?: any) {
      if (!fs.existsSync(value)) {
        throw new Error(ERRORS.FILE_DOES_NOT_EXIST.replace('%s', value))
      }

      try {
        return fs.readFileSync(value, 'utf-8')
      } catch (error) {
        console.error('[readFiles]', error)
      }
    },
    resolvePath(value: any, reference: string) {
      const dir = dirname(value)
      return join(dir, reference)
    },
    getDir(value: any) {
      return dirname(value)
    },
    getFilename(value: any) {
      return value.split('/').pop()
    },
  }
}
