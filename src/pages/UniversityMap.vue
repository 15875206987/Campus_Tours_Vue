<template>
  <div class="layout-content">
    <Row>
      <i-col span="5">
<!--        侧边栏-->
        <side-bar></side-bar>
      </i-col>
      <i-col span="19">
<!--        以下是主视图-->
        <div class="layout-content-main">
          <!--          关键字检索-->
          <Row>
            <i-col span="18">
              <Input  placeholder="Enter something..." v-model="tempKeyword" @keyup.native.enter="setKeyword" />
            </i-col>
            <i-col span="6">
              <ButtonGroup>
                <Button type="default" @click="setKeyword">Search</Button>
                <Button type="default" @click="cancelKeyword">Cancel</Button>
                <Button type="default" @click="showAllSites">Show all sites</Button>
              </ButtonGroup>
            </i-col>
          </Row>
<!--          地图组件-->
          <baidu-map class="bm-view"
                     ak="v96mYLQal0sCjbxf11XpUN2knA2kzwpF"
                     center="广州"
                     :scroll-wheel-zoom="true"
                     @dblclick="openAddSite">
<!--            地图视图-->
            <bm-view style="width: 100%; height:100%;"></bm-view>
<!--            范围检索-->
            <bm-local-search :keyword="keyword" :nearby="nearby" :auto-viewport="false" :panel="false"
                             @markersset="searchMarkersSet"
                             @infohtmlset="infohtmlset"></bm-local-search>
            <bm-circle :center="nearby.center" :radius="nearby.radius"></bm-circle>
<!--            标记点-->
                      <bm-marker v-for="(item,index) in selectedMarkerPoints"
                                 :key="index"
                                 :position="{lng:item.site_lng, lat:item.site_lat}"/>
          </baidu-map>
        </div>
      </i-col>
    </Row>
<!--    添加弹出框-->
    <Drawer
      title="Create"
      v-model="openAddSiteDrawer"
      width="720"
      :mask-closable="false"
    >
      <add-site
        :lng="newSitesPoint.lng"
        :lat="newSitesPoint.lat"
      ></add-site>
    </Drawer>
  </div>
</template>

<script>
  // import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  // import BmMarker from 'vue-baidu-map/components/overlays/Marker'
  // import BmLocalSearch from
  import { BaiduMap, BmView,  BmLocalSearch, BmMarker, BmCircle } from 'vue-baidu-map'
  import SideBar from "../components/SideBar";
  import addSite from "../components/addSite";
  import {mapState} from 'vuex'
    export default {
      name: "UniversityMap",
      components:{
        SideBar,
        BaiduMap,
        addSite,
        BmMarker,
        BmView,
        BmLocalSearch,
        BmCircle
      },
      data(){
        return{
          newSitesPoint:{},
          openAddSiteDrawer:false,
          nearby: {
            center: {
              lng: 113.322021,
              lat: 23.078950
            },
            radius: 1000
          },
          tempKeyword:'',
          keyword:''
        }
      },
      computed:{
        ...mapState(['selectedMarkerPoints'])
      },
      methods:{
        /* BMap是百度地图的对象，直接new出来跟原始的百度地图API一样使用，map是地图对象，可以调用对应的地图方法，比如添加marker */
        // map_handler({ BMap, map }) {
        //   console.log("map_handler")
        //   map.clearOverlays()
        //   console.log("map_handler")
        // },
        // 添加新地点相关
        openAddSite(e){
          this.newSitesPoint = e.point
          this.openAddSiteDrawer = true
        },
        //显示全部已标记点
        showAllSites(){
          this.$store.dispatch('showAllSites')
        },
        //有关地点检索,包括设置关键字，标记点出来以后的回调函数
        searchMarkersSet(pois){
          if (pois.length == 0){
            window.alert('附近没有符合的地点')
          }
          console.log('-----------------------------pois--------------------------------')
          pois[0].marker.addEventListener('click',function () {
            window.alert('test')
          })
        },
        infohtmlset(poi){
          console.log('-----------------------------poi--------------------------------')
          console.log(poi)

        },
        setKeyword(){
          this.keyword = this.tempKeyword
        },
        cancelKeyword(){
          this.keyword = ''
          this.tempKeyword = ''
        }
      },
      mounted() {
          //要想办法去掉自定义图层的标记物
        this.$store.dispatch('getMarkerPoints')
      }
    }
</script>

<style scoped>
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .bm-view {
    width: 100%;
    height: 560px;
    margin-top: 10px;
  }
</style>
