<template>
  <Menu theme="light">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-paper" />
        学习
      </template>
      <Menu-item v-for="(item,index) in livingcategories" :key="index"  :name="item.id">{{item.name}}</Menu-item>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-people" />
        生活
      </template>
      <Menu-item v-for="(item,index) in studycategories" :key="index"  :name="item.id">{{item.name}}</Menu-item>
    </Submenu>
  </Menu>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "SideBar",
      data(){
          return{
          }
      },
      computed:{
          ...mapState(['livingcategories','studycategories'])
      },
      methods:{
        ...mapActions(['getLivingCategories','getStudyCategories'])
      },
      mounted() {
          //让actions做ajax请求数据
        this.$store.dispatch('getLivingCategories')
        this.$store.dispatch('getStudyCategories')
      }
    }
</script>

<style scoped>

</style>
