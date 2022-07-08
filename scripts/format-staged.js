#!/usr/bin/env node

// @ts-check

import child_process from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import prettier from 'prettier'

const execFile = promisify(child_process.execFile)

const filepaths = await execFile('git', [
  'diff',
  '--cached',
  '--name-only',
  '--diff-filter=ACMR',
]).then((res) => res.stdout.match(/^.+$/gm))

if (filepaths) {
  for (const filepath of filepaths) {
    const fileinfo = await prettier.getFileInfo(filepath)
    if (fileinfo.ignored || fileinfo.inferredParser === null) {
      continue
    }

    const config = await prettier.resolveConfig(filepath, {
      editorconfig: true,
    })
    const source = await readFile(filepath, 'utf8')
    const output = prettier.format(source, {
      parser: fileinfo.inferredParser,
      ...config,
    })
    if (output !== source) {
      await writeFile(filepath, output, 'utf8')
    }

    await execFile('git', ['add', filepath])
  }
}
