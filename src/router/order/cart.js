import CartIndex from '@/components/Order/Cart/Index'

export default [
  {
    path: 'cart/index', // 购物车列表
    name: 'CartIndex',
    component: CartIndex,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 1,
      auth: true
    }
  }
]
