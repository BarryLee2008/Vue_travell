<template>
  <div>
    <div class="recommend-title">
      Recommendations
    </div>
    <ul>
      <!-- 用tag="li来" -->
      <li class="recommend-item border-bottom" v-for="item in recommendList" :key="item.id" @click="tranferPage(item.id)">
        <img :src="item.imgUrl" alt="" class="item-img-tag">
        <div class=item-info>
          <p class="info-title">
            {{item.title}}
          </p>
          <p class="info-desc">
            {{item.desc}}
          </p>
          <button type="button" class="item-btn">查看详情</button>
        </div>
      </li>
     </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommend',
  props: {
    list: Array
  },
  data () {
    return {
      /*  recommendList: [
        {
          id: '0001',
          imgUrl: 'https://www.oviinc.com/wp-content/uploads/2019/03/CMHR_5.jpg.webp',
          desc: 'The history of Progress in Canadian Human Rights',
          title: 'Canadian Museum for Human Rights'
        }, {
          id: '0002',
          imgUrl: 'https://www.wasagabeach.com/en/resourcesGeneral/Home%20Page%20-%20Spring.jpg',
          desc: 'The world`s longest fresh water beach',
          title: 'Wasaga Beach'

        }, {
          id: '0003',
          imgUrl: 'https://vancouver.ca/images/cov/icons/Cherry_blossoms_and_gardens_large_icon.jpg',
          desc: 'The beautiful and beloved Urban Park in Vancouveru',
          title: 'Stanley Park'
        }
      ] */
      recommendList: this.list
    }
  },
  methods: {
    tranferPage (id) {
      this.$router.push(`/detail/${id}`)
    }
  },
  watch: {
    list (newVal, oldVal) {
      this.recommendList = newVal
    }
  }
}
</script>
<!-- 可以直接用line-height来控制元素的高度 -->
<!-- flex=1表示 flex-grow=1;flex-shrink=1和flex-basis=0%。这表示元素以内部的内容来ding -->
<!-- 加一个min-width=0来实现ellipsis -->
<style lang="stylus" scoped>
@import '~styles/mixins'
  .recommend-title
    background-color: #eee
    line-height: 0.8rem
    margin-top: 0.2rem
  .recommend-item
    overflow: hidden
    display: flex
    width: 100%
    height: 0
    padding-bottom: 30%
    .item-img-tag
      width: 1.7rem
      height: 1.7rem
      padding: 0.1rem
    .item-info
      flex: 1
      padding: 0.1rem
      min-width: 0
      .info-title
        line-height: .54rem
        font-size: .32rem
        ellipsis()
      .info-desc
        line-height: 0.4rem
        color: #ccc
        font-size: 0.1rem
        ellipsis()
      .item-btn
        margin-top: 0.1rem
        padding: 0.2rem
        border-radius: 0.06rem
        background-color: #ff9300
        color: #fff
        line-height: 0.1rem
</style>
