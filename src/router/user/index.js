// 引入当前目录下面的所有文件
const ModulesFile = require.context('./', true, /.js$/)

// 封装一个路由列表对象
const RouterList = []

// 循环所有文件
ModulesFile.keys().reduce((modules, modulePath) => {
  // 路由模块名称
  const ModuleName = modulePath.replace(/^.\/(.*)\.js/, '$1')

  // 不包含当前index.js 文件
  if (ModuleName != 'index') {
    // 路由列表(数组)
    const ModuleList = ModulesFile(modulePath)

    // 追加到数组
    RouterList.push(...ModuleList.default)
  }
}, {})

// 定义父组件
const layout = {
  template: `<router-view></router-view>`
}

export default [
  {
    path: '/user', // 父路由
    component: layout,
    // 子路由分组   /user/order/xxxx
    children: [
      ...RouterList
    ]
  }
]
