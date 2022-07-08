#!/usr/bin/env node

// @ts-check

import { formatFile, listChanged } from './lib/utils.js'

for (const filepath of await listChanged()) {
  await formatFile(filepath)
}
