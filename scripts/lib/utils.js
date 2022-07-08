// @ts-check

import child_process from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import prettier from 'prettier'

const execFile = promisify(child_process.execFile)

/**
 * @returns {Promise<string[]>}
 */
export async function listStaged() {
  const { stdout } = await execFile('git', [
    'diff',
    '--cached',
    '--name-only',
    '--diff-filter=ACMR',
  ])
  return stdout.match(/^.+$/gm) ?? []
}

/**
 * @returns {Promise<string[]>}
 */
export async function listChanged() {
  const { stdout } = await execFile('git', [
    'ls-files',
    '--others',
    '--modified',
    '--exclude-standard',
  ])
  return stdout.match(/^.+$/gm) ?? []
}

/**
 * @param {string} filepath
 */
export async function formatFile(filepath) {
  const { ignored, inferredParser } = await prettier.getFileInfo(filepath)
  if (ignored || inferredParser === null) {
    return
  }

  const config = await prettier.resolveConfig(filepath, { editorconfig: true })
  const source = await readFile(filepath, 'utf8')
  const output = prettier.format(source, { parser: inferredParser, ...config })
  if (output !== source) {
    await writeFile(filepath, output, 'utf8')
  }
}

/**
 * @param {string} filepath
 */
export async function stageFile(filepath) {
  await execFile('git', ['add', filepath])
}
