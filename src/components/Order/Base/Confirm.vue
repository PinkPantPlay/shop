<template>
  <div id="confirm">
      <!-- 头部 -->
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="back"
      />

      <!-- 收货地址 -->
      <div @click="toAddr" class="addressbox" v-if="address">
        <p>{{address.address}}</p>
        <img src="/static/images/go.png">
      </div>
      <div @click="toAddr" class="addressbox" v-else>
        <p>请添加一个收货地址</p>
        <img src="/static/images/go.png">
      </div>

      <div class="clear"></div>
      <div class="allkbox"></div>
      <div class="clear"></div>

      <!-- 购物车商品数据 -->
      <div class="buybox">

        <!-- 商品列表 -->
        <div @click="topro(item.proid)" class="itembox product" v-for="(item, index) in cartdata" :key="index">
          <div class="dpnr">
              <div class="L">
                <img :src="item.product.cover" />
              </div>
              <div class="R">
                <div class="tit">{{item.product.name}}</div>
                <div class="sub">上架时间：{{item.product.createtime | FormAtDate}}</div>
                <div class="price">
                  <p>￥{{item.total}}</p>
                  <span>×{{item.nums}}</span>
                </div>
              </div>
          </div>
        </div>

        <!-- 优惠券 -->
        <div class="allkbox"></div>
        <div class="itemboxcon">
          <p>优惠券</p>
          <img src="/static/images/go.png">
        </div>

        <!-- 买家留言 -->
        <div class="allkbox"></div>
        <div class="message" style="height:10em;">
          <van-field
            v-model="order.content"
            label="买家留言"
            rows="2"
            type="textarea"
            placeholder="请填写备注"
            show-word-limit
            height="30em"
          />
        </div>
        <div class="allkbox"></div>
      </div>

      <div class="clear"></div>
      <div class="h54"></div>
      <div class="clear"></div>
      <div class="footerBox" v-show="!paybox">
        <div class="footer3">
          <div class="L">
            <p>总计：<span>￥{{total}}</span></p>
          </div>
          <div class="R">
            <a @click="confirm" href="javascript:void(0)">确认支付</a>
          </div>
        </div>
      </div>

      <!-- 密码输入框 -->
      <div class="paybox" v-show="paybox">
        <h3 class="paytitle">请输入支付密码</h3>
        <van-password-input
          :value="paypass"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
          :error-info="errorInfo"
        />

        <van-number-keyboard
          :show="showKeyboard"
          @blur="showKeyboard = false, paybox = false"
          @input="onInput"
        />
      </div>

      <!-- loading -->
      <div class="loading" v-show="loading">
        <van-loading size="24px">订单生成中...</van-loading>
      </div>

  </div>
</template>

<script>
export default {
  name: 'OrderConfirm',
  created () {
    var query = this.$route.query
    var cartid = query.cartid ? query.cartid : []

    if (!cartid) {
      this.$toast('未选择购买商品')
      this.$router.go(-1)
      return false
    }

    this.cartid = cartid

    // 查询购物车的记录出来
    this.cartlist()

    // 获取收货地址
    this.getAddr()
  },
  data () {
    return {
      paypass: '',
      paybox: false,
      showKeyboard: false,
      errorInfo: '',
      loading: false,
      cartid: [],
      user: this.$cookies.get('user'),
      cartdata: [],
      address: [],
      total: 0,
      order: {
        content: '',
        addrid: 0
      }
    }
  },
  methods: {
    // 获取收货地址的ID
    async getAddr () {
      // 先从cookie里面获取
      var addrid = this.$cookies.get('addrid')

      if (addrid) {
        // 请求该收货地址是否存在
        var data = {
          userid: this.user.id,
          addrid: addrid
        }

        // 发送请求
        var result = await this.$proxy.cartaddr(data)

        if (result.code == 1) {
          this.address = result.data
          this.order.addrid = this.address.id
        } else {
          this.$toast(result.msg)
          return false
        }
      }
    },
    // 查询购物车记录
    async cartlist () {
      // 组装数据
      var data = {
        userid: this.user.id,
        cartid: this.cartid.join(',')
      }

      // 发送请求
      var result = await this.$proxy.cartList(data)

      if (result.code == 1) {
        // 获取购物车列表成功
        this.cartdata = result.data.cartlist
        this.total = result.data.total

        // 记录一个cookie 用来保存收货地址
        var addrid = this.$cookies.get('addrid')
        if (!addrid && this.address) {
          this.address = result.data.address
          this.$cookies.set('addrid', this.address.id)
        }
      } else {
        // 获取购物车列表失败
        this.$toast('暂无购物车记录，请重新选择下单商品')
        this.$router.go(-1)
        return false
      }
    },
    // 跳转到商品详情界面
    topro (proid) {
      this.$router.push({path: '/product/goods/info', query: {proid: proid}})
      return false
    },
    // 跳转到收货地址的界面
    toAddr () {
      this.$router.push({path: '/order/base/address'})
      return false
    },
    // 确认订单
    confirm () {
      this.paybox = true
    },
    // 输入支付密码
    onInput (value) {
      var str = value.toString()
      this.paypass += str
    },
    back () {
      this.$router.go(-1)
      return false
    },
    // 下订单
    async OrderAdd () {
      // 组装数据
      var data = {
        userid: this.user.id,
        cartid: this.cartid.join(','),
        content: this.order.content,
        addrid: this.order.addrid
      }

      // 发送请求
      var result = await this.$proxy.orderadd(data)

      if (result.code == 1) {
        this.loading = false
        this.$toast(result.msg)

        // 跳转到订单列表界面
        this.$router.push('/user/base/index')
        return false
      } else {
        this.loading = false
        this.$toast(result.msg)
        return false
      }
    }
  },
  watch: {
    async paypass (value) {
      if (value.length >= 6) {
        // 判断支付密码是否正确
        // 组装数据
        var data = {
          userid: this.user.id,
          paypass: value
        }

        // 发送请求
        var result = await this.$proxy.cartpay(data)

        if (result.code == 1) {
          this.paybox = false
          this.showKeyboard = false
          this.loading = true

          // 下订单了
          this.OrderAdd()
        } else {
          this.errorInfo = result.msg
          this.paypass = ''
          return false
        }
      }
    }
  }
}
</script>

<style scope>
  .buybox .product{
    border-top: 1px solid #dddddd;
  }

  .buybox .product:last-child{
    border-bottom: 1px solid #dddddd;
  }

  .buybox .itembox .dpnr .R .tit{
    margin-bottom:1em;
  }

  .buybox .itembox .dpnr .R .sub{
    margin-bottom:1em;
  }

  #confirm{
    position: relative;
  }

  .paybox{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    padding-top:10em;
    background: rgba(0,0,0,.5);
    text-align: center;
  }

  .paybox .paytitle{
    width:100%;
    text-align: center;
    font-size:1.5em;
    color:#fff;
    margin-bottom:1em;
  }

  .loading{
    position: fixed;
    z-index:10000;
    left:0;
    top:0;
    width:100%;
    height:100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background:rgba(228, 228, 228, 0.5);
  }

</style>
