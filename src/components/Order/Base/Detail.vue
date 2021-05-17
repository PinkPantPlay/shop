<template>
  <div id="detail">
    <!-- 头部 -->
    <van-nav-bar
      title="订单列表"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />
    <div class="pro">
      <van-card
        v-for="(item,index) in prodata"
        :key="index"
        :num="item.nums"
        :price="item.price"
        :title="item.name"
        :thumb="item.cover"
        :origin-price="item.market"
      />
    </div>
    <van-divider content-position="left">详细</van-divider>
    <van-cell-group>
      <van-cell title="订单号" :value="details.code" />
      <van-cell title="下单时间" :value="details.createtime" />
      <van-cell title="订单金额" :value="details.total" />
      <van-cell title="留言信息" :value="details.content" />
      <van-cell title="订单状态" :value="details.status" />
      <van-cell title="收件信息" :value="`${address.consignee}${address.mobile}`" :label="`${address.province.name}${address.city.name}${address.district.name}${address.address}`" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  created () {
    // console.log(this.$route.params.id)
    this.ProList()
    this.Detail()
    this.Address()
  },
  data () {
    return {
      orderid: this.$route.params.id,
      user: this.$cookies.get('user'),
      prodata: [],
      details: [],
      address: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
      return false
    },
    async ProList () {
      var data = {
        orderid: this.$route.params.id,
        userid: this.user.id
      }
      var result = await this.$proxy.proList(data)
      if (result.code === 1) {
        this.prodata = result.data
      } else {
        this.$toast('订单信息查询有误')
        return false
      }
    },
    async Detail () {
      var data = {
        orderid: this.$route.params.id,
        userid: this.user.id
      }
      var result = await this.$proxy.details(data)
      if (result.code === 1) {
        this.details = result.data
      } else {
        this.$toast('订单信息查询有误')
        return false
      }
    },
    async Address () {
      var data = {
        orderid: this.$route.params.id,
        userid: this.user.id
      }
      var result = await this.$proxy.address(data)
      if (result.code === 1) {
        this.address = result.data
      } else {
        this.$toast('地址信息查询有误')
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
