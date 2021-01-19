const path = require('path')

const PORT = 8080
const PORT_EXTERNAL = process.env.PORT_EXTERNAL || PORT

const ENV_DEV = 'dev'
const ENV_PROD = 'prod'

const getEnvironment = () => {
    if (process.env.APP_ENV) {
        return process.env.APP_ENV
    } else if (process.env.NODE_ENV === 'production') {
        return ENV_PROD
    } else {
        return ENV_DEV
    }
}

const getDefinition = (name, definitions) => {
    return JSON.stringify(process.env[name] || definitions[name])
}

const ENV = getEnvironment()

module.exports = {
    pluginOptions: {
        gitDescribe: {
            variableName: 'GIT_DESCRIBE'
        }
    },
    transpileDependencies: [
        'bootstrap',
        'vue-number-animation',
        'bootstrap-vue',
        'moment',
        'moment-range',
        'moment-timezone',
        'v-calendar',
        'object-to-formdata',
        'vee-validate',
        'vue-gallery',
        'vue-global-var',
        'vue-slider-component',
        'vue-yandex-metrika',
        'vuejs-datepicker',
        'animate.css'
    ],
    chainWebpack: config => {
        const DEFINITIONS = require(`./environments/${ENV}`)
        const globals = {
            BASE_URL: getDefinition('BASE_URL', DEFINITIONS),
            DEBUG_MODE: JSON.stringify(process.env.NODE_ENV !== 'production'),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            YANDEX_METRIKA_ID: getDefinition('YANDEX_METRIKA_ID', DEFINITIONS),
            WS_BASE_URL: getDefinition('WS_BASE_URL', DEFINITIONS),
        }

        config.module
            .rule('html')
            .test(/\.(html)$/)
            .use('html-loader')
            .loader('html-loader')
            .end()

        config.plugin('define').tap(definitions => {
            definitions[0] = Object.assign(definitions[0], globals)
            return definitions
        })

        config.resolve.alias.set('assets', path.join(__dirname, '/src/assets'))
        config.resolve.alias.set('components', path.join(__dirname, '/src/components'))
        config.resolve.alias.set('entities', path.join(__dirname, '/src/entities'))
        config.resolve.alias.set('utils', path.join(__dirname, '/src/utils'))
        config.resolve.alias.set('views', path.join(__dirname, '/src/views'))
        if (process.env.NODE_ENV === 'production') {
            config.module.rule('vue').uses.delete('cache-loader')
            config.module.rule('js').uses.delete('cache-loader')
            config.module.rule('ts').uses.delete('cache-loader')
            config.module.rule('tsx').uses.delete('cache-loader')
        }
    },
    configureWebpack: {
        output: ENV === ENV_PROD ? {
            filename: 'js/[name].[contenthash].js',
            chunkFilename: 'js/[name].[contenthash].js',
        } : undefined,
    },
    css: {
        requireModuleExtension: false,
        extract: ENV === ENV_PROD ? {
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        } : undefined,
        loaderOptions: {
            scss: {
                sassOptions:{
                    includePaths: ['node_modules'],
                }
            },
        },
        sourceMap: true,
    },
    devServer: {
        public: `http://localhost:${PORT_EXTERNAL}/`,
    },
    outputDir: path.resolve(__dirname, './web/app'),
    publicPath: '/app/',
    productionSourceMap: false
}
