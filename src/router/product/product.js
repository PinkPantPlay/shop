import GoodsInfo from '@/components/Product/Goods/Info'

export default [
  {
    path: 'goods/info', // 商品详细
    name: 'GoodsInfo',
    component: GoodsInfo,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 2
    }
  }
]
