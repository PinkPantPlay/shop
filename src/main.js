import Vue from 'vue'
import App from './App'

// 引入请求对象
import {GET, POST} from './services/request'

// 挂载cookie
import VueCookies from 'vue-cookies'

// 引入VantUI框架
import Vant from 'vant'
import 'vant/lib/index.css'

// 单独引入 给main.js入口用的
import { Notify, Lazyload } from 'vant'

// 总路由
import router from './router'

// 引入封装好的接口对象
import proxy from './proxy'

// 引入时间插件
import Moment from 'moment'

// 引入计算精度的插件
import * as math from 'mathjs'
Vue.use(VueCookies)

// 只有挂载到vue上面去才能使用插件的东西
Vue.use(Vant)
Vue.use(Lazyload)

// 挂载接口请求
Vue.use(proxy)

// 定一个全局的过滤器
Vue.filter('FormAtDate', value => {
  return Moment(value).format('YYYY-MM-DD')
})

// 原型继承
Vue.prototype.$math = math

// eslint-disable-next-line
//生产环境下面不需要提醒信息
Vue.config.productionTip = false

// 给路由增加全局的钩子 访问前去判断用户是否有没有登录
router.beforeEach(async (to, from, next) => {
  // from 从哪里来的链接
  // to 想去哪个界面
  // next 通行令  让你让你去  next(true) 可以通过 false 不能通过

  // 获取登录的属性
  var auth = to.meta.auth ? to.meta.auth : null

  // 如果等于空 说明不需要登录
  if (auth) {
    // 走进来就说明需要登录的
    // 判断是否有无cookie信息
    var login = VueCookies.get('user') ? VueCookies.get('user') : null

    if (!login) {
      // 提醒
      Notify({ type: 'warning', message: '请先登录'})

      // 跳转界面
      next('/user/base/login')

      return false
    }

    // JS判断是否为对象类型
    var id = login.id ? login.id : 0
    var phone = login.phone ? login.phone : ''

    if (!id || !phone) {
      // 非法的cookie 要删除
      VueCookies.remove('user')

      // 提醒
      Notify({ type: 'warning', message: '非法登录凭证,请重新登录'})

      // 跳转界面
      next('/user/base/login')

      return false
    }

    // 有ID 需要验证
    var data = {
      url: '/user/base/auth',
      params: {
        id: id,
        phone: phone
      }
    }

    // 发送请求
    var result = await POST(data)

    if (result.code == 1) {
      // 将js的对象转化为json数据
      var content = JSON.stringify(result.data)

      // 将用户信息保存到cookie中
      VueCookies.set('user', content)

      // 要放行
      next()
    } else {
      // 非法的cookie 要删除
      VueCookies.remove('user')

      // 提醒
      Notify({ type: 'warning', message: '非法登录凭证,请重新登录'})

      // 跳转界面
      next('/user/base/login')

      return false
    }
  } else {
    // 不需要登录 直接放行
    next()
  }
})

/* eslint-disable no-new */
// 创建一个vue的应用 vue是一个单页面组件开发
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
