<template>
  <div>
    <detail-header></detail-header>
    <detail-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></detail-banner>
    <div class="content">
      <detail-list :list="list"></detail-list>
    </div>
  </div>
</template>
<script>
import DetailBanner from './components/banner.vue'
import DetailHeader from './components/Header.vue'
import DetailList from './components/list.vue'
import axios from 'axios'
export default {
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data () {
    return {
      list: [],
      dataText: '',
      sightName: '',
      bannerImg: '',
      gallaryImgs: []
    }
  },
  methods: {
    getDetailInfo () {
      // 点击各景点详情的时候会被带到/detail/id的路径，但是路由对象会记录id的值。在下面调用ajax的时候要传递参数id,使得后台
      // 能够根据参数的id来判断前端请求的是哪一个景点。
      // 获取id的方法如下. 可以直接拼接，也可以通过传递对象的方法
      /*  axios.get('/api/detail.json?id=' + this.$route.params.id) */
      axios.get('/api/detail.json',
        {params: {
          id: this.$route.params.id
        }})
        .then(this.handleDetData)
    },
    handleDetData (res) {
      this.dataText = res.data
      if (this.dataText.ret && this.dataText.data) {
        const data = this.dataText.data
        console.log(data)
        this.sightName = data.sightName
        this.bannerImg = data.bannerImg
        this.gallaryImgs = data.gallaryImgs
        this.list = data.categoryList
      }
    }
  },
  mounted () {
    this.getDetailInfo()
  },
  activated () {
    console.log(this.gallaryImgs)
    console.log(this.bannerImg)
  }
}
</script>
<style lang="stylus" scoped>
  .content
    height: 50rem
</style>
