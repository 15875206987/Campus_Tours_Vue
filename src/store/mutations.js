export default {
  getLivingCategories(state,lc){
    state.livingcategories = [lc]
  },
  getStudyCategories(state,sc){
    state.studycategories = [sc]
  },
  getbmMarkerPoints(state,bmmp){
    var temp = {
      "lng":parseFloat(bmmp.lng),
      "lat":parseFloat(bmmp.lat)
    }
    state.bmMarkerPoints = [temp]
  }
}
