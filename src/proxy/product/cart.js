import {GET, POST, UPLOAD} from '../../services/request'

export default {
  // 添加购物车
  cartadd (data = {}) {
    return POST({
      url: `/product/cart/add`,
      params: data
    })
  },
  // 查询购物车数量
  cartCount (data = {}) {
    return POST({
      url: `/product/cart/count`,
      params: data
    })
  },
  cartIndex (data = {}) {
    return POST({
      url: `/product/cart/index`,
      params: data
    })
  },
  // 购物车增加和减少
  cartEdit (data = {}) {
    return POST({
      url: `/product/cart/edit`,
      params: data
    })
  },
  cartDel (data = {}) {
    return POST({
      url: `/product/cart/del`,
      params: data
    })
  },
  // 确认订单的购物车列表
  cartList (data = {}) {
    return POST({
      url: `/product/cart/list`,
      params: data
    })
  },
  // 获取默认的收货地址
  cartaddr (data = {}) {
    return POST({
      url: `/product/cart/select`,
      params: data
    })
  },
  // 验证支付密码方法
  cartpay (data = {}) {
    return POST({
      url: `/product/cart/pay`,
      params: data
    })
  }

}
