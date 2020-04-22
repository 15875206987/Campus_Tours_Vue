<template>
  <div class="layout-content">
    <Row>
      <i-col span="5">
        <side-bar></side-bar>
      </i-col>
      <i-col span="19">
        <div class="layout-content-main">
          <baidu-map class="bm-view"
                     ak="v96mYLQal0sCjbxf11XpUN2knA2kzwpF"
                     center="广州"
                     @dblclick="openAddSite">
                      <bm-marker v-for="(item,index) in bmMarkerPoints"
                                 :key="index"
                                 :position="{lng:item.lng, lat:item.lat}"/>
          </baidu-map>
        </div>
      </i-col>
    </Row>
    <Drawer
      title="Create"
      v-model="openAddSiteDrawer"
      width="720"
      :mask-closable="false"
    >
      <add-site></add-site>
    </Drawer>
  </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker'
  import SideBar from "../components/SideBar";
  import addSite from "../components/addSite";
  import {mapState} from 'vuex'
    export default {
      name: "UniversityMap",
      components:{
        SideBar,
        BaiduMap,
        addSite,
        BmMarker
      },
      data(){
        return{
          addSitesPoint:{},
          openAddSiteDrawer:false
        }
      },
      computed:{
        ...mapState(['bmMarkerPoints'])
      },
      methods:{
        openAddSite(e){
          this.openAddSiteDrawer = true
          this.addSitesPoint = e.point
          window.alert(e.point.lat + ',' + e.point.lng)
        }
      },
      mounted() {
          //要想办法去掉自定义图层的标记物
        this.$store.dispatch('getbmMarkerPoints')
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
  }
</style>
