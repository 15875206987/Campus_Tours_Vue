<template>
  <div>
    <Form :model="formData">
      <Row :gutter="32">
        <!--            填写专业名-->
        <Col span="12">
          <FormItem label="Name" label-position="top">
            <Input v-model="formData.major_name" placeholder="please enter major's name" clearable/>
          </FormItem>
        </Col>
        <!--            选择学院-->
        <Col span="12">
          <FormItem label="Category" label-position="top">
            <Select v-model="formData.school_id" placeholder="please select a school">
              <Option v-for="(item) in schoolList" :value="item.school_id">{{item.school_name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="Description" label-position="top">
        <Input type="textarea" v-model="formData.major_desc" :rows="10" placeholder="please enter the description" />
      </FormItem>
    </Form>
    <Upload
      :before-upload="before"
      action="//jsonplaceholder.typicode.com/posts/">
      <Button icon="ios-cloud-upload-outline">Select the photo to upload</Button>
    </Upload>
    <div v-if="file !== null">Upload file: {{ file.name }}</div>
    <div class="demo-drawer-footer">
      <Button type="primary" @click="addMajorToRemote">add major</Button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "addMajor",
        data(){
            return{
              formData: {
                major_name: '',
                school_id: '',
                major_desc: '',
              },
              file:null
            }
        },
        computed:{
          ...mapState(['schoolList'])
        },
        methods:{
          addMajorToRemote(){
            this.$store.dispatch('addMajorToRemote',this.formData)
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
                this.formData.major_photo = code;
              }
            }
            return false
          },
        }
    }
</script>

<style scoped>

</style>
