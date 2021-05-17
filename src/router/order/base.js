import OrderConfirm from '@/components/Order/Base/Confirm'
import OrderAddress from '@/components/Order/Base/Address'
import OrderList from '@/components/Order/Base/List'
import OrderDetail from '@/components/Order/Base/Detail'

export default [
  {
    path: 'base/confirm', // 确认订单
    name: 'OrderConfirm',
    component: OrderConfirm,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 3,
      auth: true
    }
  },
  {
    path: 'base/address', // 选择个人收货地址
    name: 'OrderAddress',
    component: OrderAddress,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 3,
      auth: true
    }
  },
  {
    path: 'base/list', // 订单列表
    name: 'OrderList',
    component: OrderList,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 3,
      auth: true
    }
  },
  {
    path: 'base/detail/:id', // 订单详细
    name: 'OrderDetail',
    component: OrderDetail,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 3,
      auth: true
    }
  }
]
