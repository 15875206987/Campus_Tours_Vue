<template>
  <div class="layout-content">
    <Row>
      <i-col span="5">
        <side-bar-for-school-intro></side-bar-for-school-intro>
      </i-col>
      <i-col span="19">
        <div class="layout-content-main">
          <MajorCard></MajorCard>
        </div>
      </i-col>
    </Row>
    <div class="fixed-button">
      <ButtonGroup>
        <Button type="dashed" @click="openUIntroM">查看学校介绍</Button>
        <Button type="dashed" @click="openUpdateUIntroM">修改学校介绍</Button>
      </ButtonGroup>
      <Button type="error" shape="circle" icon="md-add" @click="addMajorOrSchool"></Button>
    </div>
    <Modal v-model="openChoice" footer-hide="true" width="300">
      <Button @click="addMajor">添加新专业</Button>
      <Button @click="addSchool">添加新学院</Button>
    </Modal>
    <Modal v-model="openAddMajor">
      <add-major></add-major>
    </Modal>
    <Modal v-model="openAddSchool"
           title="add school"
           width="300"
           @on-ok="addSchooltoRemote">
      <Input placeholder="please input school name" v-model="newSchoolName"></Input>
    </Modal>
<!--    学校介绍的模态框-->
    <Modal v-model="openUIntro" draggable scrollable :title="universityInfo.university_name">
      <div>
        <img :src="universityInfo.university_picURL" style="width: 485px"/>
        <div style="overflow-y: scroll; height: 200px;">{{universityInfo.university_desc}}</div>
      </div>
    </Modal>
    <Modal v-model="openUpdateUIntro"
           draggable
           scrollable
           :title="universityInfo.university_name"
           ok-text="修改"
           on-ok="updateUniversityInfo">
      <div>
        <Input type="textarea" v-model="universityInfo.university_desc" :rows="10" placeholder="please enter the description" />
        <Upload
          :before-upload="before"
          action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
        </Upload>
        <div v-if="file !== null">Upload file: {{ file.name }}</div>
      </div>
    </Modal>
  </div>
</template>

<script>
  import SideBarForSchoolIntro from "../components/SideBarForSchoolIntro";
  import MajorCard from "../components/MajorCard";
  import addMajor from "../components/addMajor";
  import {mapState} from 'vuex'
    export default {
      name: "SchoolIntro",
      data(){
        return{
          openChoice:false,
          openAddMajor:false,
          openAddSchool:false,
          openUpdateUIntro:false,
          openUIntro:false,
          newSchoolName:'',
          file:null
        }
      },
      computed:{
        ...mapState(['universityInfo'])
      },
      components:{
        SideBarForSchoolIntro,
        MajorCard,
        addMajor
      },
      mounted() {
        this.$store.dispatch('getMajorList')
        this.$store.dispatch('getUniversityInfo')
      },
      methods:{
        addMajorOrSchool(){
          this.openChoice = true
        },
        addMajor(){
          this.openAddMajor = true
        },
        addSchool(){
          this.openAddSchool = true
        },
        addSchooltoRemote(){
          this.$store.dispatch('addSchool',this.newSchoolName)
        },
        //关于学校介绍
        openUpdateUIntroM(){
          this.openUpdateUIntro = true
        },
        openUIntroM(){
          this.openUIntro = true
        },
        updateUniversityInfo(){
          this.$store.dispatch('updateUniversityInfo',this.newSchoolName)
        }
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
    height: 560px;
  }
  .fixed-button{
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
