import Vue from 'vue'
import Router from 'vue-router'

// 默认 /路由的组件  首页组件
import Home from '@/components/Home'

// 让Vue支持路由
Vue.use(Router)

// 引入每个目录下面的index.js文件
const ModulesFile = require.context('./', true, /index.js$/)

// 总路由集合
const RouterList = []

// 对引入的文件进行循环
ModulesFile.keys().reduce((modules, modulePath) => {
  // 路由模块名称   文件夹/index  user/index
  const ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1')

  // index.js
  // user/index.js
  // 不包含当前index.js 文件
  if (ModuleName != 'index') {
    // 路由列表
    const ModuleList = ModulesFile(modulePath)

    // 追加到数组
    RouterList.push(...ModuleList.default)
  }
}, {})

// 创建一个总路由对象
export default new Router({
  mode: 'hash', // 使用js bom对象中history模式  并且不会有 /#
  linkExactActiveClass: 'active', // 激活链接状态class名称
  routes: [
    // 跟路由
    {
      path: '/', // 传参选项 query
      name: 'home', // 传参选项 params
      component: Home,
      meta: {
        index: 0
      }
    },
    ...RouterList // 父-子
  ]
})
