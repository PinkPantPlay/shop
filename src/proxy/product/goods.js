import {GET, POST, UPLOAD} from '../../services/request'

export default {
  // 查询商品信息
  goodsinfo (data = {}) {
    return POST({
      url: `/product/goods/info`,
      params: data
    })
  },
  // 查询是否收藏的商品
  goodscol (data = {}) {
    return POST({
      url: `/product/goods/collection`,
      params: data
    })
  },
  // 添加收藏和取消收藏
  goodsColActive (data = {}) {
    return POST({
      url: `/product/goods/colactive`,
      params: data
    })
  }
}
