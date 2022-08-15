<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list :cities="cities" :hotCities="hotCities" :letter="letter"></city-list>
    <city-alpha :cities="cities" @change="handleLetterChange"></city-alpha>
  </div>
</template>
<script>
// 引入组件
import CityHeader from './components/header.vue'
import CitySearch from './components/Search.vue'
import CityList from './components/List.vue'
import CityAlpha from './components/Alphabet.vue'
import axios from 'axios'
// 导出组件
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlpha
  },
  data () {
    return {
      resText: {},
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  methods: {
    getCityInfo: function () {
      axios.get('/api/city.json')
        .then(this.showData)
    },
    showData: function (res) {
      console.log(res)
      this.resText = res.data
      // 判断是否正确的返回了数据
      if (this.resText.ret && this.resText.data) {
        const data = this.resText.data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    handleLetterChange: function (letter) {
      this.letter = letter
    }
  },
  mounted () {
    this.getCityInfo()
  }
}
</script>
<style lang="stylus" scoped>
</style>
