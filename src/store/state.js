// 设置首页城市的默认值
let defaultCity = '北京'
// 使用 try-catch的方式使用localStorage,然用户只要不关闭页面就会在首页一直保持其选的城市
try {
  // 判断当前浏览器中是否存在localStorage.city属性，如果有的话就使用它
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {

}
// 把state导入出去
export default {
  city: defaultCity
}
