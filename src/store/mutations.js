export default {
  /*
  * 和种类CRUD有关
  * */
  //获取种类
  getLivingCategories(state,lc){
    state.livingcategories = lc
  },
  getStudyCategories(state,sc){
    state.studycategories = sc
  },
  deleteCategory(state,id){
    state.livingcategories = state.livingcategories.filter(function (element) {
      return element.category_id != id
    })
    state.studycategories = state.studycategories.filter(function (element) {
      return element.category_id != id
    })
    window.alert("删除成功！")
  },
  updateCategory(state,item){
    for(var i = 0;i<state.livingcategories.length;i++){
      if (state.livingcategories[i].category_id == item.category_id){
        state.livingcategories[i].category_name = item.category_name
        state.livingcategories[i].category_parent = item.parent_id
      }
    }
    for(var i = 0;i<state.studycategories.length;i++){
      if (state.studycategories[i].category_id == item.category_id){
        state.studycategories[i].category_name = item.category_name
        state.studycategories[i].category_parent = item.parent_id
      }
    }
    window.alert("修改成功！")
  },
  //获取地点
  getMarkerPoints(state,bmmp){
    state.bmMarkerPoints = bmmp
    state.selectedMarkerPoints = bmmp
  },
  //筛选地点
  selectMarkerPoints(state,category_id){
    state.selectedMarkerPoints = state.bmMarkerPoints.filter(function (element) {
      return(element.category_id == category_id)
    })
  },
  showAllSites(state){
    state.selectedMarkerPoints = state.bmMarkerPoints
  },
  //添加和删除完以后给提示，且更新
  refreshSite(state,msg){
    window.alert(msg)
  },
  removeSite(state,msg){
    window.alert(msg)
  },
  addSiteToRemote(state,msg){
    window.alert(msg)
  },
  refreshMarkerPoints(state,bmmp) {
    state.bmMarkerPoints = bmmp
    state.selectedMarkerPoints = bmmp
    window.alert("已刷新！")
  },



  //以下是学校管理的方法
  /**
   * 和院系列表相关
   * @param state
   * @param sl
   */
  //获取院系列表
  getSchoolList(state,sl){
    state.schoolList = sl
  },
  //删除院系
  deleteSchool(state,id){
    state.schoolList = state.schoolList.filter(function (element) {
      return element.school_id != id
    })
    window.alert("删除成功！")
  },
  updateSchool(state,item){
    for(var i = 0;i<state.schoolList.length;i++){
      if (state.schoolList[i].school_id == item.school_id){
        state.schoolList[i].school_name = item.school_name
      }
    }
    window.alert("修改成功！")
  },
  addSchool(){

  },
  /**
   * 和专业列表相关
   * @param state
   * @param ml
   */
  //获取专业列表
  getMajorList(state,ml){
    state.majorList = ml
    state.selectedMajorList = ml.filter(function (element) {
      let id = state.schoolList[0].school_id
      return(element.school_id == id)
    })
  },
  //筛选专业 selectMajorList
  selectMajorList(state,school_id){
    state.selectedMajorList = state.majorList.filter(function (element) {
      return(element.school_id == school_id)
    })
  },
  //更新专业列表
  refreshMajorList(state,ml){
    state.majorList = ml
    state.selectedMajorList = state.majorList.filter(function (element) {
      return(element.school_id == school_id)
    })
    window.alert("已刷新！")
  },
  addMajorToRemote(state,msg){
    window.alert(msg)
  },
  //删除专业并给更新提示
  deleteMajor(state,msg) {
    window.alert(msg)
  },
  updateMajor(state,msg){
    window.alert(msg)
  },
  /**
   *和学校信息相关
   */
  getUniversityInfo(state,msg){
    state.universityInfo = msg[0]
  }
}
