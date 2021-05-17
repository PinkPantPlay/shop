<template>
  <div id="index">
    <!-- 头部 -->
    <van-nav-bar
      title="商品分类"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="back"
    />

    <van-tree-select
      height="44.5em"
      :items="typelist"
      :active-id.sync="TypeIndex"
      :main-active-index.sync="active"
      @click-nav="CheckType"
    >
      <template #content v-if="prolist.length">
        <router-link v-for="(item, index) in prolist" :key="index" :to="{path:'/product/type/list', query:{typeid:item.typeid}}">
          <van-image :src="item.cover" />
        </router-link>
      </template>
      <template #content v-else>
          <van-empty description="暂无商品信息" />
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  name: 'TypeIndex',
  created () {
    // 在钩子里面去调用方法
    this.typeindex()
  },
  data () {
    return {
      active: 0, // ID 左侧的当前选中分类
      TypeIndex: 0, // 右侧要显示的分类索引
      typelist: [],
      prolist: []
    }
  },
  methods: {
    // 商品分类请求
    async typeindex () {
      var result = await this.$proxy.typeindex()

      if (result.code == 1) {
        var typelist = []

        for (var type of result.data) {
          typelist.push({
            text: type.name,
            children: type.product ? type.product : []
          })
        }
        var index = this.TypeIndex
        this.prolist = result.data[index].product
        this.typelist = typelist
      } else {
        // 失败
        this.$notify({type: 'warning', message: result.msg})

        // 跳转路由
        return this.$router.push('/')
      }
    },
    // 切换数据
    async CheckType (index) {
      this.active = index
      this.TypeIndex = index
      this.prolist = this.typelist[index].children
    },
    back () {
      this.$router.go(-1)
      return false
    }
  }
}
</script>

<style scope>
  .van-tree-select__content .van-image{
    margin-bottom:1em;
  }
</style>
