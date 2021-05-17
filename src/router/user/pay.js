import PayIndex from '@/components/User/Pay/Index'
import PayAdd from '@/components/User/Pay/Add'
import PayEdit from '@/components/User/Pay/Edit'

export default [
  {
    path: 'pay/index', // /user/Pay/index
    name: 'PayIndex',
    component: PayIndex,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 1
    }
  },
  {
    path: 'pay/add',
    name: 'PayAdd',
    component: PayAdd,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 2
    }
  },
  {
    path: 'pay/edit',
    name: 'PayEdit',
    component: PayEdit,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 2
    }
  }
]
