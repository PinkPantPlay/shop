<template>
  <div id="user">
    <!-- 头部 -->
    <div class="headerbox">
      <div class="header">
        <div class="headerL">
          <a onclick="javascript:history.back(-1)" class="goback">
            <img src="/static/images/goback.png" />
          </a>
        </div>
        <div class="headerC0">
          <div class="ssdiv">
            <img src="/static/images/ss.png" />
            <input @change="search" v-model="keywords" type="text" placeholder="输入商品名称..."/>
          </div>
        </div>
        <div class="headerR" @click="PopType = true">
          <a href="javascript:void(0)">
            <img src="/static/images/tr.png" />
          </a>
        </div>
      </div>

      <!-- 筛选 -->
      <van-dropdown-menu>
        <!-- 切换商品类型 -->
        <van-dropdown-item @change="flag" v-model="flagActive" :options="option1" />
        <van-dropdown-item @change="order" v-model="orderActive" :options="option2" />
      </van-dropdown-menu>
    </div>

    <!-- 商品列表 -->
    <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh"> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="prolist"
      >
      <div class="mainWarp" style="background:#f3f3f3">
        <ul class="proul">
          <li v-for="(item, index) in prodata" :key="index">
            <router-link :to="{path:'/product/goods/info',query:{proid:item.id}}">
              <img :src="item.cover" />
            </router-link>
            <router-link :to="{path:'/product/goods/info',query:{proid:item.id}}">
              <p class="tit">{{item.name}}</p>
            </router-link>

            <div class="price">
              <p>
                ￥{{item.price}}<span>￥{{item.market}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      </van-list>
    <!-- </van-pull-refresh> -->

    <!-- 弹出框 -->
    <van-action-sheet v-model="PopType" :actions="typedata" @select="onSelect" />

  </div>
</template>

<script>
export default {
  name: 'TypeList',
  created () {
    var typeid = this.$route.query.typeid ? this.$route.query.typeid : 0
    if (!typeid) {
      // 失败
      this.$notify({ type: 'warning', message: '选择分类有误，请重新选择'})

      // 跳转路由
      return this.$router.go(-1)
    } else {
      this.typeid = typeid

      // 查询分类
      this.typelist()
    }
  },
  data () {
    return {
      typeid: 0,
      page: 1,
      PopType: false,
      keywords: '',
      orderActive: 'createtime',
      flagActive: 'all', // 当前选中的那个选项
      option1: [
        { text: '全部商品', value: 'all' },
        { text: '新款商品', value: 'news' },
        { text: '热销商品', value: 'hot' },
        { text: '推荐商品', value: 'recommend' },
        { text: '销冠商品', value: 'top' }
      ],
      option2: [
        { text: '默认排序', value: 'createtime' },
        { text: '价格排序', value: 'price' },
        { text: '库存排序', value: 'stock' }
      ],
      prodata: [],
      loading: false,
      finished: false,
      refreshing: false, // 刷新 一进来界面是不刷新
      typedata: []
    }
  },
  methods: {
    // 选择商品分类
    onSelect (item) {
      this.PopType = false
      this.typeid = item.id

      // 清空商品数据，重新进行查询
      this.prodata = []
      this.page = 1

      // 重新查询
      this.prolist()
    },
    // 上拉加载
    onLoad () {
      // 查询商品列表
      this.prolist()
    },
    // 下拉刷新
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true

      this.onLoad()
    },
    // 查询分类数据
    async typelist () {
      var result = await this.$proxy.typeall()

      if (result.code == 1) {
        var typelist = []

        for (var item of result.data) {
          typelist.push({
            name: item.name,
            id: item.id
          })
        }

        this.typedata = typelist
      }
    },
    // 查询商品列表
    async prolist () {
      setTimeout(async () => {
        // 组装数据
        var data = {
          page: this.page,
          typeid: this.typeid,
          flag: this.flagActive, // 属性
          order: this.orderActive, // 排序
          keywords: this.keywords // 关键词
        }

        var result = await this.$proxy.prolist(data)

        if (result.code == 1) {
          // 合并到原来的数组里面去
          this.prodata = this.prodata.concat(result.data)
          this.page++
          this.loading = false
        } else {
          // 没有更多数据的时候
          this.finished = true
        }
      }, 1000)
    },
    // 切换头部下拉菜单
    flag (value) {
      this.flagActive = value

      // 清空商品列表，重新查询
      this.prodata = []
      this.page = 1

      // 重新调用查询方法
      this.prolist()
    },
    // 切换头部的下拉菜单，排序的
    order (value) {
      // 修改原来的默认值
      this.orderActive = value

      // 清空列表数据，重新查询
      this.prodata = []
      this.page = 1

      // 在查询数据
      this.prolist()
    },
    search () {
      // 清空商品列表，重新查询
      var keyword = this.keywords

      // 去除掉空的字符串
      keyword = keyword.replace(/(^\s*)|(\s*$)/g, '')

      if (keyword == '' || keyword == undefined || keyword == null) {
        this.$notify({ type: 'danger', message: '商品名称不能为空' })
        return false
      }

      // 将去除后的结果赋值
      this.keywords = keyword

      // 重新调用列表
      this.prodata = []
      this.page = 1

      this.prolist()
    }
  }
}
</script>

<style scope>
  .headerbox{
    position: sticky;
    left:0;
    top:0;
    width:100%;
    z-index:2010;
  }

  .headerbox .header{
    position: relative;
    display: flex;

  }

  .van-pull-refresh__track{
    z-index:-1;
  }
</style>
