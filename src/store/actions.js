import axios from 'axios'
let baseUrl = 'http://localhost:8080/SCUT_Tour_JavaWeb/'
export default {
  //获取生活分类
  getLivingCategories({commit}){
    axios.get(baseUrl + 'getlivingcategories').then(response=>{
      commit('getLivingCategories',response.data)
    }).catch(error=>{
    })
  },
  //获取学习分类
  getStudyCategories({commit}){
    axios.get(baseUrl + 'getstudycategories').then(response=>{
      commit('getStudyCategories',response.data)
    }).catch(error=>{
    })
  },
  //获取地点坐标
  getbmMarkerPoints({commit}){
    axios.get(baseUrl + 'getbmmarkerpoints').then(response=>{
      commit('getbmMarkerPoints',response.data)
    }).catch(error=>{
    })
  }
}
