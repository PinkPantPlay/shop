import {GET, POST, UPLOAD} from '../../services/request'

export default {
  register (data = {}) {
    // http://localhost:8080/mobi/user/register
    return POST({
      url: '/user/base/register',
      params: data
    })
  },
  login (data = {}) {
    return POST({
      url: '/user/base/login',
      params: data
    })
  },
  // 验证用户信息
  auth (data = {}) {
    return POST({
      url: '/user/base/auth',
      params: data
    })
  },
  // 修改个人信息
  profile (data = {}) {
    return POST({
      url: '/user/base/profile',
      params: data
    })
  },
  // 修改密码
  changepwd (data = {}) {
    return POST({
      url: '/user/base/changepwd',
      params: data
    })
  },
  // 修改支付密码
  paymentpwd (data = {}) {
    return POST({
      url: '/user/base/paymentpwd',
      params: data
    })
  },
  // 收藏列表
  favlist (data = {}) {
    return POST({
      url: '/user/base/favlist',
      params: data
    })
  },
  cancelcol (data = {}) {
    return POST({
      url: '/product/goods/colactive',
      params: data
    })
  },
  addcart (data = {}) {
    return POST({
      url: '/product/cart/add',
      params: data
    })
  },
  upload (data = {}) {
    return POST({
      url: '/user/base/upload',
      params: data
    })
  }
}
