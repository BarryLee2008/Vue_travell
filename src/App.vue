<template>
  <div id="app">
   <!--  <img src="./assets/logo.png"> -->
   <!-- keep-alive标签的作用是当一个组件被加载后axios调用的数据会被保存在本地，下次加载该组件的时候不用再调axios -->
   <!-- exclude表示detail这个组件不被keep-alive控制，因为这组件要求其不同的ajax接口 -->
   <keep-alive exclude="Detail">
     <router-view/>
   </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
