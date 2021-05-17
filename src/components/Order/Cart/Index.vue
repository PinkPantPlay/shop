<template>
  <div id="confirm">
      <!-- 头部 -->
      <van-nav-bar
        title="购物车"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="back"
      />

      <!-- 购物车列表 -->
      <div class="cartlist">
          <van-checkbox-group v-model="cartsid" ref="checkboxGroup">
            <van-swipe-cell v-for="(item, index) in cartdata" :key="index" class="box">
              <div class="item">
                <div class="check">
                  <van-checkbox @click="SelectPro" :name="index" icon-size="20px"></van-checkbox>
                </div>

                <div class="product">
                  <van-image
                    width="10em"
                    height="100%"
                    class="cover"
                    :src="item.product.cover"
                  />

                  <div class="info">
                    <div class="name">{{item.product.name}}</div>
                    <div class="price">￥{{item.price}}</div>
                    <div class="select">
                      <van-button @click="increase(item)" round icon="plus" size="mini" type="info" />
                      <span class="nums">{{item.nums}}</span>
                      <van-button @click="reduce(item)" round icon="minus" size="mini" type="info" />
                    </div>
                  </div>
                </div>
              </div>

              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="delcart(item, index)" />
              </template>
            </van-swipe-cell>
          </van-checkbox-group>
      </div>

      <!-- 提交订单栏 -->
      <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
        <van-checkbox @click="toggleAll" v-model="checked">全选</van-checkbox>
      </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: 'CartIndex',
  created () {
    // 直接查询购物车数据
    this.CartList()
  },
  data () {
    return {
      user: this.$cookies.get('user'),
      checked: false,
      cartdata: [],
      cartsid: [],
      total: 0
    }
  },
  methods: {
    // 查询购物车列表
    async CartList () {
      var data = {
        userid: this.user.id
      }

      // 发送请求
      var result = await this.$proxy.cartIndex(data)

      if (result.code == 1) {
        // 请求成功
        this.cartdata = result.data
      } else {
        this.$toast('购物车空空')
        return false
      }
    },
    back () {
      this.$router.go(-1)
      return false
    },
    // 反选
    toggleAll () {
      // 切换复选框的选中状态
      this.$refs.checkboxGroup.toggleAll()

      // 重新计算购物车的合计
      this.TotalAll()
    },
    // 选择产品
    SelectPro () {
      // 选中的数量 === 查询记录
      if (this.cartsid.length === this.cartdata.length) {
        this.checked = true
      } else {
        this.checked = false
      }

      // 计算总价
      this.TotalAll()
    },
    // 计算总价
    TotalAll () {
      var total = 0

      // 循环所选中的商品下标
      for (var index of this.cartsid) {
        // 获取当前选中的商品价格和数量
        var price = this.cartdata[index].price
        var nums = this.cartdata[index].nums
        total += this.$math.evaluate(`(${price} * ${nums}) * 100`)
      }

      this.total = total
    },
    // 增加
    async increase (cart) {
      // 组装数据
      var data = {
        cartid: cart.id,
        proid: cart.proid,
        userid: cart.userid,
        nums: ++cart.nums
      }

      // 发送请求
      var result = await this.$proxy.cartEdit(data)

      if (result.code == 1) {
        // 重新计算购物车的合计
        this.TotalAll()
      } else {
        this.$toast(result.msg)
        return false
      }
    },
    // 减少
    async reduce (cart) {
      if (cart.nums <= 1) {
        this.$toast('商品至少要有一件')
        return false
      }

      // 组装数据
      var data = {
        cartid: cart.id,
        proid: cart.proid,
        userid: cart.userid,
        nums: --cart.nums
      }

      // 发送请求
      var result = await this.$proxy.cartEdit(data)

      if (result.code == 1) {
        // 重新计算购物车的合计
        this.TotalAll()
      } else {
        this.$toast(result.msg)
        return false
      }
    },
    // 删除购物车记录
    delcart (cart, index) {
      this.$dialog.confirm({
        title: '是否确认删除购物车记录'
      }).then(async () => {
        // 组装数据
        var data = {
          cartid: cart.id,
          userid: cart.userid
        }

        var result = await this.$proxy.cartDel(data)

        if (result.code == 1) {
          // 删除成功
          this.$toast(result.msg)

          // 数组的删除
          this.cartdata.splice(index, 1)
        } else {
          // 删除失败
          this.$toast(result.msg)
          return false
        }
      }).catch(() => {
        // 取消
      })
    },
    onSubmit () {
      if (this.cartsid.length <= 0) {
        this.$toast('请选择需要购买的商品')
        return false
      }

      // 获取所选中的购物车ID
      var select = []

      for (var item of this.cartsid) {
        select.push(this.cartdata[item].id)
      }

      // 跳转到确认订单界面
      this.$router.push({path: '/order/base/confirm', query: {cartid: select}})
    }
  }
}
</script>

<style scoped>
  .cartlist{
    width:100%;
  }

  .cartlist .box{
    width:100%;
    border-bottom: 1px solid #e1e1e1;
  }

  .cartlist .box .item{
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding:1em 0em;
  }

  .cartlist .box .item .check{
    margin:0em 1em;
  }

  .cartlist .box .item .product{
    display: flex;
    justify-content: space-between;
    align-items: stretch;
  }

  .cartlist .box .item .product .cover{
    width:10em;
    border-radius: 10px;
    overflow: hidden;
    margin-right:1em;
  }

  .cartlist .box .item .product .info{
    display: flex;
    align-content: space-between;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .cartlist .box .item .product .info .name{
    width:53%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4em;
  }

  .cartlist .box .item .product .info .price{
    width:100%;
    color:red;
    font-size:1.2em;
  }

  .cartlist .box .item .product .info .select{
    display: flex;
    align-items: center;
    justify-content:space-between;
    width:35%;
  }

  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
</style>
