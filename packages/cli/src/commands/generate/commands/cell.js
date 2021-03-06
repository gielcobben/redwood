import {
  templateForComponentFile,
  createYargsForComponentGeneration,
} from '../helpers'

const COMPONENT_SUFFIX = 'Cell'
const REDWOOD_WEB_PATH_NAME = 'components'

export const files = ({ name }) => {
  const cellFile = templateForComponentFile({
    name,
    suffix: COMPONENT_SUFFIX,
    webPathSection: REDWOOD_WEB_PATH_NAME,
    templatePath: 'cell/cell.js.template',
  })
  const testFile = templateForComponentFile({
    name,
    suffix: COMPONENT_SUFFIX,
    extension: '.test.js',
    webPathSection: REDWOOD_WEB_PATH_NAME,
    templatePath: 'cell/test.js.template',
  })

  // Returns
  // {
  //    "path/to/fileA": "<<<template>>>",
  //    "path/to/fileB": "<<<template>>>",
  // }
  return [cellFile, testFile].reduce((acc, [outputPath, content]) => {
    return {
      [outputPath]: content,
      ...acc,
    }
  }, {})
}

export const {
  command,
  desc,
  builder,
  handler,
} = createYargsForComponentGeneration({
  componentName: 'cell',
  filesFn: files,
})
