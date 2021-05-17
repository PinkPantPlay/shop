import TypeIndex from '@/components/Product/Type/Index'
import TypeList from '@/components/Product/Type/List'

export default [
  {
    //  /product/type/index
    path: 'type/index', // 商品分类
    name: 'TypeIndex',
    component: TypeIndex,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 1
    }
  },
  {
    path: 'type/list', // 商品列表页
    name: 'TypeList',
    component: TypeList,
    meta: { // 自定义属性，用来判断是否需要登录的
      index: 2
    }
  }
]
