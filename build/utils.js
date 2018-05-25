const path = require('path')
const config = require('../config')

exports.assetsPath = (_path) => path.posix.join(config.resource, _path)

exports.titleFun = (chunkName, title) => {
  let titleDef = 'XXX网站';
  return chunkName.indexOf('index') !== -1
    ? titleDef
    : `${title}_${titleDef}`
};
