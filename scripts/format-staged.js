#!/usr/bin/env node

// @ts-check

import { formatFile, listStaged, stageFile } from './lib/utils.js'

for (const filepath of await listStaged()) {
  await formatFile(filepath)
  await stageFile(filepath)
}
