<template>
  <div>
    <div class="recommend-title">
      Short-term Journey
    </div>
    <ul>
      <li class="recommend-item border-bottom" v-for="item in recommendList" :key="item.id">
       <div class="item-img-container">
         <img :src="item.imgUrl" alt="" class="item-img-tag">
       </div>
        <div class=item-info>
          <p class="info-title">
            {{item.title}}
          </p>
          <p class="info-desc">
            {{item.desc}}
          </p>
       <!--    <button type="button" class="item-btn">Learn More</button> -->
        </div>
      </li>
     </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeWeekend',
  props: {
    list: Array
  },
  data () {
    return {
    /*   recommendList: [
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
  watch: {
    list (newVal, oldVal) {
      this.recommendList = newVal
    }
  }
}
</script>
<!-- 下面是用的是固定宽高比，高度用的是padding-bottom撑起来的。所以里面包裹的img标签不能用height：100%来撑起高度 -->
<!-- 图片被width：100%后会自动填满父级div的宽度。但是如上所述高度不能用100%来实现。所以这里的 高度是估计原图的宽高比来实现的 -->
<!-- 如果是统一的图片的话，宽高比固定就会高度完全一致 -->
<style lang="stylus" scoped>
@import '~styles/mixins'
  .recommend-title
    background-color: #eee
    line-height: 0.8rem
  .recommend-item
    width: 100%
    .item-img-container
      overflow: hidden
      width: 100%
      height: 0
      padding-bottom: 37.09%
     .item-img-tag
       width: 100%
      .item-info
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
</style>
