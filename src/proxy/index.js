import Vue from 'Vue'
/**
 * 统一代理接口引入
 */
const ModulesFile = require.context('./', true, /index.js$/)

let ProxyList = {}

ModulesFile.keys().reduce((modules, modulePath) => {
  // 文件名
  const ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1')

  // 不包含当前index.js 文件
  if (ModuleName != 'index') {
    // 请求列表
    const ModuleList = ModulesFile(modulePath)

    // 合并对象 循环多次合并
    ProxyList = Object.assign(ProxyList, ModuleList.default)
  }
}, {})

// 挂载的对象
let Proxy = {}

// 给空对象添加一个挂载的方法
Proxy.install = Vue => {
  Vue.prototype.$proxy = ProxyList
}

export default Proxy
