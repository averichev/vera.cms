const path = require('path')
const ENV_DEV = 'dev'
const ENV_PROD = 'prod'

const getEnvironment = () => {
  if (process.env.NODE_ENV === 'production') {
    return ENV_PROD
  } else {
    return ENV_DEV
  }
}
const ENV = getEnvironment()

module.exports = {
  configureWebpack: {
    output: ENV === ENV_PROD ? {
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].js',
    } : undefined,
  },
  css: {
    extract: ENV === ENV_PROD ? {
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    } : undefined,
    sourceMap: true,
  },
  outputDir: path.resolve(__dirname, './wwwroot/app'),
  publicPath: '/app/',
  productionSourceMap: false,
}
