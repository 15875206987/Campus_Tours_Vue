<template>
<Menu theme="light" active-name="1" @on-select="selectSchool">
  <menu-item v-for="(item,index) in schoolList" :key="index" :name="item.school_id">
    <Icon type="md-document">
    </Icon>
    {{item.school_name}}
  </menu-item>
</Menu>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
    export default {
        name: "SideBarForSchoolIntro",
        data(){
          return{
          }
        },
      computed:{
        ...mapState(['schoolList'])
      },
      methods:{
        ...mapActions(['selectMajorList']),
        selectSchool(name){
            this.selectMajorList(name)
        }
      },
      mounted() {
        this.$store.dispatch('getSchoolList')
      }
    }
</script>

<style scoped>

</style>
