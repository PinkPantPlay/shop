<template>
  <div class="footerBox">
    <van-tabbar v-model="active" route active-color="red">
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/product/type/index">分类</van-tabbar-item>

      <van-tabbar-item v-if="count > 0" icon="shopping-cart-o" to="/order/cart/index" :badge="count">购物车</van-tabbar-item>
      <van-tabbar-item v-else icon="shopping-cart-o" to="/order/cart/index">购物车</van-tabbar-item>

      <van-tabbar-item icon="user-o" to="/user/base/index">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'MenuList',
  created () {
    var user = this.$cookies.get('user')

    // 说明已经登录
    if (user && user.id) {
      // 查询购物车数量的
      this.CartCount()
    }
  },
  data () {
    return {
      active: 0,
      user: this.$cookies.get('user'),
      count: 0
    }
  },
  methods: {
    // 查询购物车数据
    async CartCount () {
      // 组装
      var data = {
        userid: this.user.id
      }

      var result = await this.$proxy.cartCount(data)

      if (result.code == 1) {
        this.count = result.data.count
      } else {
        this.count = 0
      }
    }
  }
}
</script>
