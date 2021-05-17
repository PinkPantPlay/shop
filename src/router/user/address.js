import AddressIndex from '@/components/User/Address/Index'
import AddressAdd from '@/components/User/Address/Add'
import AddressEdit from '@/components/User/Address/Edit'

export default [
  {
    path: 'address/index', // /user/address/index
    name: 'AddressIndex',
    component: AddressIndex,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 1
    }
  },
  {
    path: 'address/add',
    name: 'AddressAdd',
    component: AddressAdd,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 2
    }
  },
  {
    path: 'address/edit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 2
    }
  }
]
