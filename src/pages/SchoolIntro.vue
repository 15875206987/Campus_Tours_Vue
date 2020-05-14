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
    <Button type="error" shape="circle" icon="md-add" class="fixed-button" @click="addMajorOrSchool"></Button>
    <Modal v-model="openChoice">
      <Button @click="addMajor"></Button>
      <Button @click="addSchool"></Button>
    </Modal>
    <Modal v-model="openAddMajor">
      <add-major></add-major>
    </Modal>
  </div>
</template>

<script>
  import SideBarForSchoolIntro from "../components/SideBarForSchoolIntro";
  import MajorCard from "../components/MajorCard";
  import addMajor from "../components/addMajor";
    export default {
      name: "SchoolIntro",
      data(){
        return{
          openChoice:false,
          openAddMajor:false,
          openAddSchool:false
        }
      },
      components:{
        SideBarForSchoolIntro,
        MajorCard,
        addMajor
      },
      mounted() {
        this.$store.dispatch('getMajorList')
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
    pisition:fixed;
    bottom:0px;
    right:0px;
  }
</style>
