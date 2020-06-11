<template>
  <div>
    <Table stripe border :columns="columns" :data="selectedMarkerPoints">
      <template slot-scope="{ row, index }" slot="action">
        <Icon type="md-eye" @click="showSite(index)" size="25" style="margin-right: 5px" color="green"/>
        <Icon type="md-build" @click="updateSite(index)" size="25" style="margin-right: 5px" color="blue"/>
        <Icon type="md-trash" @click="removeSite(index)" size="25" style="margin-right: 5px" color="red"/>
      </template>
    </Table>
    <Modal v-model="modal" draggable scrollable :title="clickedPoint.site_name">
      <div>
        <img :src="clickedPoint.site_picURL" style="width: 485px"/>
        <div style="overflow-y: scroll; height: 200px;">{{clickedPoint.site_desc}}</div>
      </div>
    </Modal>
    <Modal v-model="updatemodal" draggable scrollable :title="clickedPoint.site_name">
      <update-site :form-data="clickedPoint"></update-site>
    </Modal>
  </div>
</template>

<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    import UpdateSite from "./updateSite";
    export default {
      name: "SitesTable",
      components: {UpdateSite},
      data () {
        return {
          columns: [
            {
              title: 'ID',
              key: 'site_id'
            },
            {
              title: 'Name',
              key: 'site_name'
            },
            {
              title: 'Longitude',
              key: 'site_lng'
            },
            {
              title: 'Latitude',
              key: 'site_lat'
            },
            {
              title: 'Action',
              key: 'action',
              slot: 'action',
              align: 'center'
            }
          ],
          clickedPoint:{},
          modal:false,
          uploadURL:'https://localhost:8443/SCUT_Tour_JavaWeb/addsite',
          formData:{},
          updatemodal:false
        }
      },
      computed:{
        ...mapState(['selectedMarkerPoints'])
      },
      methods:{
        updateSite(index){
          this.clickedPoint = this.selectedMarkerPoints[index]
          this.updatemodal=true
        },
        removeSite(index){
          this.$store.dispatch('removeSite',this.selectedMarkerPoints[index].site_id)
        },
        showSite(index){
          this.clickedPoint = this.selectedMarkerPoints[index]
          this.modal = true
        },
        uploadSuccess(){
          window.alert("上传图片成功！")
          this.$store.dispatch('getMarkerPoints')
          this.modal = false
          this.clickedPoint = {}
        },
        before(file) {
          this.file = file;
          if (file.size > 2048000) {//限制文件的大小
            this.$Message.error(file.name + '大小超过2M!');
            this.file = null //超过大小将文件清空
          }else{
            //读取文件的字符流
            const reader = new FileReader();
            //将文件读取为 DataURL 以data:开头的字符串
            reader.readAsDataURL(file);
            reader.onload = e => {
              // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
              const code = e.target.result;
              this.formData.cover = code;
            }
          }
          return false
        },
        ok(){
          axios.post(this.uploadURL,JSON.stringify(this.formData)).then(response=>{
            window.alert('成功')
          })
        }
      },
      mounted() {
        this.$store.dispatch('getMarkerPoints')
      }
    }
</script>

<style scoped>

</style>
