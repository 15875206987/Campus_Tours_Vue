import axios from 'axios'
let baseUrl = 'https://localhost:8443/SCUT_Tour_JavaWeb/'
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
  getMarkerPoints({commit}){
    axios.get(baseUrl + 'getmarkerpoints').then(response=>{
      commit('getMarkerPoints',response.data)
    }).catch(error=>{
    })
  },
  //根据sidebar筛选地点
  selectMarkerPoints({commit},category_id){
    commit('selectMarkerPoints',category_id)
  },
  //显示所有地点
  showAllSites({commit}){
    commit('showAllSites')
  },

  //删除指定地点并更新列表
  removeSite({commit},id){
    axios.get(baseUrl + 'removesite?site_id='+ id,).then(response=>{
      if(response.data == true){
        commit('removeSite',"删除成功！")
        axios.get(baseUrl + 'getmarkerpoints').then(response=>{
          commit('refreshMarkerPoints',response.data)
        }).catch(error=>{
          window.alert('刷新失败，请手动刷新！')
        })
      } else {
        commit('removeSite',"删除失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('删除失败，后台出错！')
    })
  },
  //添加新地点并且更新地点列表
  addSiteToRemote({commit},formData) {
    axios.post(baseUrl + 'addsite',JSON.stringify(formData)).then(response=>{
      if(response.data == true){
        commit('addSiteToRemote',"添加成功！")
        axios.get(baseUrl + 'getmarkerpoints').then(response=>{
          commit('refreshMarkerPoints',response.data)
        }).catch(error=>{
          window.alert('刷新失败，请手动刷新！')
        })
      } else {
        commit('addSiteToRemote',"添加失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('添加失败，后台出错！')
    })
  },

  //获取院系列表
  getSchoolList({commit}){
    axios.get(baseUrl + 'getschoollist').then(response=>{
      commit('getSchoolList',response.data)
    }).catch(error=>{
    })
  },
  //获取专业列表
  getMajorList({commit}){
    axios.get(baseUrl + 'getmajorlist').then(response=>{
      commit('getMajorList',response.data)
    }).catch(error=>{
    })
  },
  //根据sidebar筛选专业
  selectMajorList({commit},school_id){
    commit('selectMajorList',school_id)
  },
  // 添加专业
  addMajorToRemote({commit},formData) {
    axios.post(baseUrl + 'addmajor',JSON.stringify(formData)).then(response=>{
      if(response.data == true){
        commit('addMajorToRemote',"添加成功！")
        axios.get(baseUrl + 'getMajorList').then(response=>{
          commit('refreshMajorList',response.data)
        }).catch(error=>{
          window.alert('刷新失败，请手动刷新！')
        })
      } else {
        commit('addMajorToRemote',"添加失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('添加失败，后台出错！')
    })
  },
}
