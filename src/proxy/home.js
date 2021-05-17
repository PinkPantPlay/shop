import {GET, POST, UPLOAD} from '../services/request'

export default {
  type (data = {}) {
    return POST({
      url: `/index/type`
    })
  }
}
