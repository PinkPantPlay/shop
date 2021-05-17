<template>
  <div id="info">
      <!-- 头部 -->
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="back"
      />

      <!-- 轮播图 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in prodata.thumbs" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>

      <div class="clear"></div>

      <!-- 商品详情 -->
      <div class="detailbox">
        <h4>{{prodata.name}}</h4>
        <div class="price">
          <em>￥</em>{{prodata.price}}<span>￥{{prodata.market}}</span>
          <font>上架时间：{{prodata.createtime | FormAtDate}}</font>
        </div>
      </div>

      <!-- 产品参数 -->
      <div class="clear"></div>
      <div class="allkbox"></div>
      <div class="clear"></div>
      <div class="detailbox_2" v-html="prodata.content">
      </div>

      <!-- 购物车导航 -->
      <van-goods-action>
        <a :href="'tel:'+prodata.phone">
          <van-goods-action-icon icon="chat-o" text="客服" />
        </a>

        <!-- 购物车 -->
        <template v-if="count > 0">
          <van-goods-action-icon @click="toCart" icon="cart-o" :badge="count" text="购物车" />
        </template>
        <template v-else>
          <van-goods-action-icon @click="toCart" icon="cart-o" text="购物车" />
        </template>

        <!-- 收藏商品 -->
        <template v-if="user">
          <van-goods-action-icon v-if="proActive" @click="collection" icon="star" text="收藏" color="#ff5000" />
          <van-goods-action-icon v-else @click="collection" icon="star-o" text="收藏" />
        </template>
        <template v-else>
          <van-goods-action-icon icon="star-o" @click="collection" text="收藏" />
        </template>

        <van-goods-action-button @click="skuShow = true" type="warning" text="加入购物车" />
        <van-goods-action-button @click="skuShow = true" type="danger" text="立即购买" />
      </van-goods-action>

      <!-- 商品规格 -->
      <van-sku
        v-model="skuShow"
        :sku="sku"
        :goods="sku"
        :goods-id="proid"
        :reset-stepper-on-hide="true"
        @add-cart="AddCart"
        @buy-clicked="Buy"
        @stepper-change="Change"
      />
  </div>
</template>

<script>
export default {
  name: 'GoodsInfo',
  created () {
    // 先判断是否有传递过来商品ID
    var proid = this.$route.query ? this.$route.query.proid : 0

    // 如果没有id就返回上一个界面
    if (!proid) {
      // 返回上一个界面
      this.$router.go(-1)
      return false
    }

    // 赋值
    this.proid = proid

    // 调用接口请求获取商品信息
    this.proinfo()

    // 判断是否有收藏产品
    var user = this.$cookies.get('user')

    if (user && user.id) {
      // 请求查询是否收藏
      this.procol()

      // 获取购物车数量
      this.CartCount()
    }
  },
  data () {
    return {
      prodata: {},
      count: 0,
      user: this.$cookies.get('user'),
      proActive: false, // 收藏的状态
      sku: {
        tree: [], // 商品规格
        list: [], // 商品规格对应的商品价格
        price: '0', // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        hide_stock: true, // 是否隐藏剩余库存
        none_sku: true, // 无规格商品
        // 默认商品 sku 缩略图
        picture: 'https://b.yzcdn.cn/vant/sku/shoes-1.png'
      },
      // 商品 id
      proid: 0,
      skuShow: false // 商品规格
    }
  },
  methods: {
    // 调用商品信息
    async proinfo () {
      // 组装数据
      var data = {
        proid: this.proid
      }

      // 发送请求
      var result = await this.$proxy.goodsinfo(data)

      if (result.code == 1) {
        /// 请求成功
        this.prodata = result.data

        // 设置商品信息
        this.sku = {
          tree: [], // 商品规格
          list: [], // 商品规格对应的商品价格
          price: this.prodata.price, // 默认价格（单位元）
          stock_num: this.prodata.stock, // 商品总库存
          hide_stock: true, // 是否隐藏剩余库存
          none_sku: true, // 无规格商品
          // 默认商品 sku 缩略图
          picture: this.prodata.cover
        }
      } else {
        // 请求失败
        this.$notify({ type: 'warning', message: result.msg})

        // 跳转路由
        return this.$router.go('-1')
      }
    },
    // 调用查询是否收藏产品
    async procol () {
      // 组装数据
      var data = {
        proid: this.proid,
        userid: this.user.id
      }

      // 接口调用
      var result = await this.$proxy.goodscol(data)

      this.proActive = result.code == 1
    },
    // 增加收藏和取消收藏的方法
    async collection () {
      var user = this.$cookies.get('user')

      // 说明没登录
      if (!user) {
        // 提示登录
        this.$notify({ type: 'warning', message: '请先登录'})
        return false
      }

      // 组装数据
      var data = {
        userid: this.user.id,
        proid: this.proid,
        active: !this.proActive // 判断你是想收藏还是取消收藏
      }

      var result = await this.$proxy.goodsColActive(data)

      if (result.code == 1) {
        // 请求成功
        this.$toast.success(result.msg)

        this.proActive = !this.proActive
      } else {
        // 请求失败
        this.$toast.fail(result.msg)
      }
    },
    async Change (number) {
      if (isNaN(number) || number <= 0) {
        this.$toast.fail('数量填写有误，数量需大于0')
        return false
      }

      this.sku.price = this.$math.evaluate(`${number} * ${this.prodata['price']}`)

      this.sku.stock_num = this.$math.evaluate(`${this.prodata.stock} - ${number}`)
    },
    // 添加购物车
    async AddCart (skuData) {
      // 先判断是否有登录
      if (!this.user) {
        this.$toast('请先登录')
        this.skuShow = false
        return false
      }

      // 组装数据
      var data = {
        userid: this.user.id,
        proid: this.proid,
        nums: skuData.selectedNum
      }

      // 发送请求
      var result = await this.$proxy.cartadd(data)

      if (result.code == 1) {
        // 更改购物车总数量
        this.count = result.data.count

        this.$toast.success(result.msg)

        this.skuShow = false
      } else {
        this.$toast.fail(result.msg)
      }

      console.log(skuData)
    },
    // 立即购买
    async Buy (skuData) {
      // 先判断是否有登录
      if (!this.user) {
        this.$toast('请先登录')
        this.skuShow = false
        return false
      }

      // 组装数据
      var data = {
        userid: this.user.id,
        proid: this.proid,
        nums: skuData.selectedNum
      }

      // 发送请求
      var result = await this.$proxy.cartadd(data)

      if (result.code == 1) {
        // 更改购物车总数量
        this.count = result.data.count
        this.skuShow = false

        // 跳转到订单确认界面
        this.$router.push({path: '/order/base/confirm', query: {proid: this.proid}})

        return false
      } else {
        this.$toast.fail(result.msg)
      }
    },
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
    },
    toCart () {
      if (!this.user) {
        this.$toast('请先登录')
        this.$router.push('/user/base/login')
        return false
      } else {
        this.$router.push('/order/cart/index')
        return false
      }
    },
    back () {
      this.$router.go(-1)
      return false
    }
  }
}
</script>

<style scope>

</style>
