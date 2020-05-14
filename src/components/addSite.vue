 <template>
   <div>
        <Form :model="formData">
          <Row :gutter="32">
<!--            填写地点名-->
            <Col span="12">
              <FormItem label="Name" label-position="top">
                <Input v-model="formData.site_name" placeholder="please enter site's name" clearable/>
              </FormItem>
            </Col>
<!--            选择地点类别-->
            <Col span="12">
              <FormItem label="Category" label-position="top">
                <Select v-model="formData.category_id" placeholder="please select a category">
                  <Option v-for="(item) in livingcategories" :value="item.category_id">{{item.category_name}}</Option>
                  <Option v-for="(item) in studycategories" :value="item.category_id">{{item.category_name}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
<!--              经度-->
              <FormItem label="Longitude" label-position="top">
                <Input v-model="lng" placeholder="please enter site's name" disabled/>
              </FormItem>
            </Col>
            <Col span="12">
<!--              纬度-->
              <FormItem label="Latitude" label-position="top">
                <Input v-model="lat" placeholder="please enter site's name" disabled/>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="Description" label-position="top">
            <Input type="textarea" v-model="formData.site_desc" :rows="10" placeholder="please enter the description" />
          </FormItem>
        </Form>
     <Upload
       :before-upload="before"
       action="//jsonplaceholder.typicode.com/posts/">
       <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
     </Upload>
     <div v-if="file !== null">Upload file: {{ file.name }}</div>
        <div class="demo-drawer-footer">
          <Button type="primary" @click="addSiteToRemote">add site</Button>
        </div>
   </div>
  </template>


<script>
  import {mapState} from 'vuex'
  export default {
    name:"addSite",
    props:['lng', 'lat'],
    data () {
      return {
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {
          site_name: '',
          category_id: '',
          site_desc: '',
        },
        file:null
      }
    },
    computed:{
      ...mapState(['livingcategories','studycategories'])
    },
    methods:{
      addSiteToRemote(){
        this.formData.site_lng = this.lng
        this.formData.site_lat = this.lat
        this.$store.dispatch('addSiteToRemote',this.formData)
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
            this.formData.site_photo = code;
          }
        }
        return false
      },
    }
  }
</script>

<style scoped>
  .demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
