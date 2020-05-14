export default {
  //获取种类
  getLivingCategories(state,lc){
    state.livingcategories = lc
  },
  getStudyCategories(state,sc){
    state.studycategories = sc
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
  //获取院系列表
  getSchoolList(state,sl){
    state.schoolList = sl
  },
  //获取专业列表
  getMajorList(state,ml){
    state.majorList = ml
  },
  //筛选专业 selectMajorList
  selectMajorList(state,school_id){
    state.selectedMajorList = state.majorList.filter(function (element) {
      return(element.school_id == school_id)
    })
  },
  //添加和删除专业并给提示且更新
  refreshMajorList(state,ml){
    state.majorList = ml
    window.alert("已刷新！")
  },
  addMajorToRemote(state,msg){
    window.alert(msg)
  },
}
