
import BaseIndex from '@/components/User/Base/Index'
import BaseRegister from '@/components/User/Base/Register'
import BaseLogin from '@/components/User/Base/Login'
import BaseProfile from '@/components/User/Base/Profile'
import BaseChangepwd from '@/components/User/Base/Changepwd'
import BasePaymentpwd from '@/components/User/Base/Paymentpwd'
import BaseFavorites from '@/components/User/Base/Favorites'

export default [
  {
    // 会员中心
    path: 'base/index',
    name: 'BaseIndex',
    component: BaseIndex,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 0
    }
  },
  {
    // 基本资料
    path: 'base/profile',
    name: 'BaseProfile',
    component: BaseProfile,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 1
    }
  },
  {
    // 修改密码
    path: 'base/changepwd',
    name: 'BaseChangepwd',
    component: BaseChangepwd,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 1
    }
  },
  {
    // 修改支付密码
    path: 'base/paymentpwd',
    name: 'BasePaymentpwd',
    component: BasePaymentpwd,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 1
    }
  },
  {
    // 我的收藏
    path: 'base/favorites',
    name: 'BaseFavorites',
    component: BaseFavorites,
    meta: { // 自定义属性，用来判断是否需要登录的
      auth: true,
      index: 1
    }
  },
  {
    path: 'base/register', // /user/base/register
    name: 'BaseRegister',
    component: BaseRegister,
    meta: {
      index: 0
    }
  },
  {
    path: 'base/login',
    name: 'BaseLogin',
    component: BaseLogin,
    meta: {
      index: 0
    }
  }
]
