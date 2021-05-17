import {GET, POST, UPLOAD} from '../../services/request'

export default {
  // 下订单
  orderadd (data = {}) {
    return POST({
      url: `/product/order/add`,
      params: data
    })
  },
  // 查询列表
  orderList (data = {}) {
    return POST({
      url: `/product/order/list`,
      params: data
    })
  },
  // 删除订单
  orderDel (data = {}) {
    return POST({
      url: `/product/order/del`,
      params: data
    })
  },
  // 订单商品
  proList (data = {}) {
    return POST({
      url: `/product/order/proList`,
      params: data
    })
  },
  // 订单详细
  details (data = {}) {
    return POST({
      url: `/product/order/details`,
      params: data
    })
  },
  // 查询当前订单收件信息
  address (data = {}) {
    return POST({
      url: `/product/order/address`,
      params: data
    })
  }
}
