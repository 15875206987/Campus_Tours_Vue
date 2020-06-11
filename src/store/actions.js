import axios from 'axios'
let baseUrl = 'https://localhost:8443/SCUT_Tour_JavaWeb/'
export default {
/**
 * 以下是地点类别的CRUD
 */
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
  // 删除分类
  deleteCategory({commit},category_id){
    console.log(category_id)
    axios.get(baseUrl + 'deletecategory?category_id=' + category_id).then(response=>{
      if(response.data == true){
        commit('deleteCategory',category_id)
      } else {
        window.alert("删除失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('删除失败，后台出错！')
    })
  },
  // 修改分类
  updateCategory({commit},item){
    axios.get(baseUrl + 'updatecategory?category_id=' + item.category_id + '&category_name=' + item.category_name + '&category_parent=' + item.parent_id).then(response=>{
      if(response.data == true){
        commit('updateCategory',item)
      } else {
        window.alert("修改失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('修改失败，后台出错！')
    })
  },
  addCategoryToRemote({commit},item){
    axios.get(baseUrl + 'addcategory?category_name=' + item.category_name + '&category_parent=' + item.category_parent).then(response=>{
      if(response.data == true){
        axios.get(baseUrl + 'getlivingcategories').then(response=>{
          commit('getLivingCategories',response.data)
        }).catch(error=>{
        })
        axios.get(baseUrl + 'getstudycategories').then(response=>{
          commit('getStudyCategories',response.data)
        }).catch(error=>{
        })
        window.alert("添加成功！")
      } else {
        window.alert("添加失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('添加失败，后台出错！')
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
    axios.get(baseUrl + 'removesite?site_id='+ id).then(response=>{
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
  updateSite({commit},formData){
    axios.post(baseUrl + 'updatesite',JSON.stringify(formData)).then(response=>{
      if(response.data == true){
        axios.get(baseUrl + 'getmarkerpoints').then(response=>{
          commit('refreshMarkerPoints',response.data)
          window.alert('修改成功！')
        }).catch(error=>{
          window.alert('刷新失败，请手动刷新！')
        })
      } else {
        commit('addSiteToRemote',"修改失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('修改失败，后台出错！')
    })
  },

  /***
   * 以下和学校管理有关
   * @param commit
   */
  /**
   * 学院列表CRUD
   * @param commit
   */
  //获取院系列表
  getSchoolList({commit}){
    axios.get(baseUrl + 'getschoollist').then(response=>{
      commit('getSchoolList',response.data)
    }).catch(error=>{
    })
  },
  deleteSchool({commit},school_id) {
    axios.get(baseUrl + 'deleteschool?school_id=' + school_id).then(response=>{
      if(response.data == true){
        commit('deleteSchool',school_id)
      } else {
        window.alert("删除失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('删除失败，后台出错！')
    })
  },
  updateSchool({commit},item) {
    axios.get(baseUrl + 'updateschool?school_id=' + item.school_id + '&school_name=' + item.school_name).then(response=>{
      if(response.data == true){
        commit('updateSchool',item)
      } else {
        window.alert("修改失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('修改失败，后台出错！')
    })
  },
  addSchool({commit},school_name) {
    axios.get(baseUrl + 'addschool?school_name=' + school_name).then(response=>{
      if(response.data == true){
        axios.get(baseUrl + 'getschoollist').then(response=>{
          commit('getSchoolList',response.data)
        }).catch(error=>{
        })
        window.alert("添加成功！")
      } else {
        window.alert("添加失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('添加失败，后台出错！')
    })
  },
  /***
   * 专业列表crud
   * @param commit
   */
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
        axios.get(baseUrl + 'getmajorlist').then(response=>{
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
  //删除专业
  deleteMajor({commit},item){
    axios.get(baseUrl + 'deletemajor?major_id=' + item.major_id + '&school_id=' + item.school_id + '&major_name=' + item.major_name).then(response=>{
      if(response.data == true){
        commit('deleteMajor',"删除成功！")
        axios.get(baseUrl + 'getmajorlist').then(response=>{
          commit('refreshMajorList',response.data)
        }).catch(error=>{
          window.alert('刷新失败，请手动刷新！')
        })
      } else {
        commit('deleteMajor',"删除失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('删除失败，后台出错！')
    })
  },
  //更新专业
  updateMajor({commit},formData){
    axios.post(baseUrl + 'updatemajor',JSON.stringify(formData)).then(response=>{
      if(response.data == true){
        commit('updateMajor',"更新成功！")
        axios.get(baseUrl + 'getmajorlist').then(response=>{
          commit('refreshMajorList',response.data)
        }).catch(error=>{
          window.alert('刷新失败，请手动刷新！')
        })
      } else {
        commit('updateMajor',"更新失败，后台出错！")
      }
    }).catch(error=>{
      window.alert('更新失败，后台出错！')
    })
  },
  /**
   * 学校信息crud
   */
  //获取学校信息
  getUniversityInfo({commit}){
    axios.get(baseUrl + 'getuniversityinfo').then(response=>{
      commit('getUniversityInfo',response.data)
    }).catch(error=>{
    })
  },
  updateUniversityInfo({commit},item){
    axios.get(baseUrl + 'updateuniversityinfo').then(response=>{
      commit('updateUniversityInfo',response.data)
    }).catch(error=>{
    })
  }
}
