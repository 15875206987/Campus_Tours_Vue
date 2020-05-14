<template>
  <div>
    <Table stripe border :columns="columns" :data="selectedMarkerPoints">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" style="margin-right: 5px" @click="showSite(index)">详情</Button>
        <Button type="error" @click="removeSite(index)">删除</Button>
      </template>
    </Table>
    <Modal v-model="modal" draggable scrollable :title="clickedPoint.site_name">
      <div>
        <label>ID：{{clickedPoint.site_id}}</label>
        <label>分类：{{clickedPoint.category_id}}</label>
        <label>经度：{{clickedPoint.site_lng}}</label>
        <label>纬度：{{clickedPoint.site_lat}}</label>
        <label>描述：{{clickedPoint.site_desc}}</label>
        <img :src="clickedPoint.site_picURL">
      </div>
    </Modal>
  </div>
</template>

<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    export default {
      name: "SitesTable",
      data () {
        return {
          columns: [
            {
              title: 'ID',
              key: 'site_id'
            },
            {
              title: 'Category',
              key: 'category_id'
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
          formData:{}
        }
      },
      computed:{
        ...mapState(['selectedMarkerPoints'])
      },
      methods:{
        removeSite(index){
          this.$store.dispatch('removeSite',this.selectedMarkerPoints[index].site_id)
        },
        showSite(index){
          console.log(this.selectedMarkerPoints[index])
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
