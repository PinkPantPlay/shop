import {GET, POST, UPLOAD} from '../../services/request'

export default {
  // 商品分类
  typeindex (data = {}) {
    return POST({
      url: `/product/type/index`,
      params: data
    })
  },
  // 商品列表页面的分类查询
  typeall (data = {}) {
    return POST({
      url: `/product/type/all`,
      params: data
    })
  },
  // 商品列表
  prolist (data = {}) {
    return POST({
      url: `/product/type/list`,
      params: data
    })
  }
}
