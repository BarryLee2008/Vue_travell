<template>
  <div>
    <div class="banner-container" @click="changeShowGallery">
    <img :src="bannerImg"
         class="banner-img"
    >
    <div class="banner-info">
        <div class="banner-desc">{{this.sightName}}</div>
        <div class="img-number">
            <span class="iconfont icon-tupian"></span>
            {{this.gallaryImgs.length}}
        </div>
    </div>
   </div>
   <common-fade>
     <common-gallary :imgs="gallaryImgs" v-if="showGallery" @closeGallery="closeGallery"></common-gallary>
   </common-fade>
 </div>
</template>
<script>
import CommonGallary from 'common/gallary/Gallary.vue'
import CommonFade from 'common/fade/Fade.vue'
export default {
  name: 'DefultBanner',
  components: {
    CommonGallary,
    CommonFade
  },
  props: {
    sightName: String,
    bannerImg: String,
    gallaryImgs: Array
  },
  data () {
    return {
      showGallery: false
    }
  },
  methods: {
    changeShowGallery: function () {
      this.showGallery = true
    },
    closeGallery: function () {
      this.showGallery = false
    }
  },
  activated () {
    console.log(this.gallaryImgs)
  }
}
</script>
<style lang="stylus" scoped>
  .banner-container
    position relative
    overflow: hidden
    height: 0
    padding-bottom: 55%
    width: 100%
    .banner-img
      width: 100%
    .banner-info
      display: flex
      position: absolute
      left: 0
      right: 0
      bottom: 0
      line-height: 0.6rem
      height: auto
      color: #fff
      .banner-desc
        flex: 1
      .img-number
        padding: 0 0.4rem
        line-height: 0.4rem
        height: 0.4rem
        border-radius: 0.2rem
        background: rgba(0,0,0,0.8)
</style>
