import {GET, POST, UPLOAD} from '../../services/request'

export default {
  // 收货地址添加
  addradd (data = {}) {
    return POST({
      url: `/user/address/add`,
      params: data
    })
  },
  // 收货地址编辑
  addredit (data = {}) {
    return POST({
      url: `/user/address/edit`,
      params: data
    })
  },
  // 收货地址的列表
  addrlist (data = {}) {
    return POST({
      url: `/user/address/list`,
      params: data
    })
  },
  // 设置默认收货地址
  addrset (data = {}) {
    return POST({
      url: `/user/address/set`,
      params: data
    })
  },
  // 查询收货地址信息
  addrinfo (data = {}) {
    return POST({
      url: `/user/address/info`,
      params: data
    })
  },
  // 删除收货地址
  addrdel (data = {}){
    return POST({
      url: `/user/address/del`,
      params: data
    })
  }
}
