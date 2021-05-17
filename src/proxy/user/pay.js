import {GET, POST, UPLOAD} from '../../services/request'

export default {
  // 充值记录添加
  payadd (data = {}) {
    return UPLOAD({
      url: `/user/pay/add`,
      params: data
    })
  },
  // 充值记录编辑
  payedit (data = {}) {
    return POST({
      url: `/user/pay/edit`,
      params: data
    })
  },
  // 充值记录的列表
  paylist (data = {}) {
    return POST({
      url: `/user/pay/list`,
      params: data
    })
  },
  // 查询充值记录信息
  payinfo (data = {}) {
    return POST({
      url: `/user/pay/info`,
      params: data
    })
  }
}
