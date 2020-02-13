/**
 * Vue CLI 打包配置文件
 * 参考文档:
 */

module.exports = {
  // 部署应用包时的基本 URL 默认是 /
  // 默认情况下 Vue ClI 会假设你的应用是被部署在一个域名的根路径上
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    // config.plugin('prefetch').tap(options => {
    //   options[0].fileBlacklist = options[0].fileBlacklist || []
    //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
    //   return options
    // })
  }
}
