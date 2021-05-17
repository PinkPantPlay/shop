<template>
  <div id="favorites">
    <!-- 头部 -->
    <van-nav-bar
      title="订单列表"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />
    <van-card
      v-for="(item,index) in favdata"
      :key="index"
      tag="已收藏"
      :price="item.price"
      :title="item.name"
      :thumb="item.cover"
      :origin-price="item.market"
    >
      <template #footer>
        <van-button size="mini" @click="cancel(item.proid, index)">取消收藏</van-button>
        <van-button size="mini" @click="addcart(item.proid)">加入购物车</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  name: 'Favorites',
  created () {
    this.FavList()
  },
  data () {
    return {
      user: this.$cookies.get('user'),
      favdata: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      return false
    },
    async FavList () {
      var data = {
        userid: this.user.id
      }
      var result = await this.$proxy.favlist(data)
      if (result.code === 1) {
        this.favdata = result.data
      } else {
        this.$toast('收藏信息查询有误')
        return false
      }
    },
    async addcart (proid) {
      var data = {
        userid: this.user.id,
        proid: proid,
        nums: 1
      }
      var result = await this.$proxy.addcart(data)
      if (result.code === 1) {
        this.$toast('已为您加入购物车')
      }else {
        this.$toast(result.msg)
        return false
      }
    },
    async cancel (proid, index) {
      var data = {
        userid: this.user.id,
        proid: proid,
        active: false
      }
      var result = await this.$proxy.cancelcol(data)
      if (result.code === 1) {
        this.$toast('取消收藏成功')
        this.favdata.splice(index, 1)
      } else {
        this.$toast('取消失败，请重试')
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
