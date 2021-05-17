<template>
  <div id="home">
    <div class="topBox">
      <div class="L"><a href="index.html">LOGO</a></div>
      <div class="C">
        <div class="saerchbox">
          <input name="" type="text" v-model="condition" placeholder="请输入您要搜索的内容"><img src="/static/images/ss.png" @click="search">
        </div>
      </div>
      <div class="R"><img src="/static/images/tr.png"></div>
    </div>
    <div class="clear"></div>
    <div class="aui-m-slider">
      <div class="m-slider" data-ydui-slider>
        <div class="slider-wrapper">
          <div class="slider-item"> <a href="javascript:;"> <img src="/static/images/banner.jpg"> </a> </div>
          <div class="slider-item"> <a href="javascript:;"> <img src="/static/images/banner.jpg"> </a> </div>
          <div class="slider-item"> <a href="javascript:;"> <img src="/static/images/banner.jpg"> </a> </div>
          <div class="slider-item"> <a href="javascript:;"> <img src="/static/images/banner.jpg"> </a> </div>
        </div>
        <div class="slider-pagination"></div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="lqgwBox">
      <div class="titbox">先领券/再购物</div>
      <div class="img"><img src="/static/images/1.jpg"></div>
      <van-grid :column-num="4">
        <van-grid-item v-for="(item, index) in typelist" :key="index" :icon="item.icon" :text="item.name" :to="{path:'/product/type/index', query:{typeindex:index}}" />
      </van-grid>
    </div>
    <div class="clear"></div>
    <div class="ljgqBox">
      <div class="L"><img src="/static/images/2.jpg"></div>
      <div class="R">
        <ul>
          <li>
            <div class="bg1"></div>
            <div class="pri_1">￥1899</div>
          </li>
          <li>
            <div class="bg2"></div>
            <div class="pri_2">￥2899</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="clear"></div>
    <div class="contitbox">
      <p>新品<span>•</span>推荐</p>
    </div>
    <div class="clear"></div>
    <ul class="proul">
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/4.jpg">
          <p><span>￥</span>288</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/5.jpg">
          <p><span>￥</span>198</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/6.jpg">
          <p><span>￥</span>2368</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/7.jpg">
          <p><span>￥</span>688</p>
          </a>
        </div>
      </li>
    </ul>
    <div class="clear"></div>
    <div class="adBox">
      <img src="/static/images/banner.jpg">
    </div>
    <div class="clear"></div>
    <div class="liBox">
      <div class="liBox_1">
        <div class="L">
          <a href="detail.html">
          <div class="bg"></div>
          <div class="tip">礼1</div>
          </a>
        </div>
        <div class="R">
          <a href="detail.html"><img src="/static/images/9.jpg"></a>
        </div>
      </div>
      <div class="liBox_2">
        <div class="L">
          <a href="detail.html">
          <div class="bg"></div>
          <div class="tip">礼2</div>
          </a>
        </div>
        <div class="R">
          <a href="detail.html">
          <div class="bg"></div>
          <div class="tip">礼3</div>
          </a>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="contitbox">
      <p>热销<span>•</span>单品</p>
    </div>
    <div class="clear"></div>
    <ul class="proul_2">
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/12.jpg">
          <p><span>￥</span>288</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/13.jpg">
          <p><span>￥</span>198</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/14.jpg">
          <p><span>￥</span>2368</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/14.jpg">
          <p><span>￥</span>688</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/12.jpg">
          <p><span>￥</span>688</p>
          </a>
        </div>
      </li>
      <li>
        <div class="con">
          <a href="detail.html">
          <img src="/static/images/13.jpg">
          <p><span>￥</span>688</p>
          </a>
        </div>
      </li>
    </ul>
    <div class="clear"></div>
    <div class="h54"></div>
    <div class="clear"></div>

    <!--公共底部-->
    <menu-list />
  </div>
</template>

<script>
import MenuList from '@/components/Common/MenuList'
export default {
  name: 'Home',
  components: { // 加载你需要的组件
    MenuList
  },
  created () {
    this.typeindex()
  },
  data () {
    return {
      condition: '',
      typelist: []
    }
  },
  methods: {
    async search () {
      var data = {
        condition: this.condition
      }
      var result = await this.$proxy.search(data)
      if (result.code === 1) {
        //
      }
    },
    // 商品分类请求
    async typeindex () {
      var result = await this.$proxy.typeindex()

      if (result.code === 1) {
        this.typelist = result.data
      } else {
        // 失败
        this.$notify({type: 'warning', message: result.msg})

        // 跳转路由
        return this.$router.push('/')
      }
    }
  }
}
</script>

<style scope>
  .van-grid{
    margin: 1em 0;
  }
</style>
