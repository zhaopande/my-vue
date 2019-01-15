// vue.config.js
module.exports = {
    configureWebpack: {
        resolve: {
          alias: {
            'vue$': 'vue/dist/vue.esm.js' 
          }
        }
        },
    // 选项...
     publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/'
  }