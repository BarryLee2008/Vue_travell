<template>
    <div>
      <home-header></home-header>
      <home-swiper :list="swiperList"></home-swiper>
      <home-icons :list="iconList"></home-icons>
      <home-recommend :list="recommendList"></home-recommend>
      <home-weekend :list="weekendList"></home-weekend>
    </div>
</template>
<script>
/* 这里export default 中的对象只能空两格，style标签下必须要有新的一行 */
import HomeHeader from './components/Header.vue'
import HomeSwiper from './components/Swiper.vue'
import HomeIcons from './components/Icons.vue'
import HomeRecommend from './components/Recommendation.vue'
import HomeWeekend from './components/weekend.vue'
// 调用axios方法请求后台。这里用的是static中mock里的模拟数据。static是该脚手架中唯一能对外公开的
// 然后再在config文件夹下的index.js中的proxyTabel中将所有的api请求都重新定向到localhost:8080
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  // 创建data属性来接受返回的数据
  data () {
    return {
      resText: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: [],
      // 设定一个属性来判断用户是否有重新选择城市
      lastCity: ''
    }
  },
  methods: {
    // getHomeInfo函数调用axios方法，这个方法返回一个promise对象
    getHomeInfo: function () {
      axios.get(`/api/index.json?city=${this.city}`)
        .then(this.getHomeInfoSoucc)
    },
    // res就是后台返回的数据
    getHomeInfoSoucc: function (res) {
      this.resText = res.data
      // console.log(this.resText)
      // 判断后台是否成功的返回了数据,当成功返回数据时ret为true,data中有数据
      if (this.resText.ret && this.resText.data) {
        const data = this.resText.data
        // this.city = data.city 这里用Vuex代替
        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
    }
  },
  // 用计算属性来接收state中的值，当它的值被在state中改变的时候可以触发computed
  computed: {
    ...mapState(['city'])
  },
  // 一被挂载就调用getHomeInfo函数调用后台接口返回数据
  // 在keep-alive标签中重新加载某个已经加载过的组件时mounted不会被重新执行
  mounted () {
    this.lastCity = this.city
    this.getHomeInfo()
  },
  // activated是keep-alive独有的生命周期函数，在重新加载一个组件时调用储存在cache中的数据时就会触发。
  activated () {
    // 当储存在state中的city值与上一次加载是的city值不一样时，重新调用axios,并更新lastCity的值
    if (this.lastCity !== this.city) {
      this.getHomeInfo()
      this.lastCity = this.city
    }
  }

}
</script>
<style>
</style>
