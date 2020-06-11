<template>
<Menu theme="light" active-name="1" @on-select="selectSchool" style="overflow-y: scroll; height: 550px;">
  <menu-item v-for="(item,index) in schoolList" :key="index" :name="item.school_id" class="menuitem">
    {{item.school_name}}
    <div>
      <Icon type="md-build" @click="updateSchool(item)" />
      <Icon type="md-trash" @click="deleteSchool(index)" />
    </div>
  </menu-item>
  <Modal
    v-model="openUpdate"
    title="update school"
    width="300"
    @on-ok="update">
    <Input placeholder="please input new name" v-model="newName"></Input>
  </Modal>
</Menu>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
    export default {
        name: "SideBarForSchoolIntro",
        data(){
          return{
            openUpdate:false,
            updateItem:{},
            newName:'',
          }
        },
      computed:{
        ...mapState(['schoolList'])
      },
      methods:{
        ...mapActions(['selectMajorList']),
        selectSchool(name){
            this.selectMajorList(name)
        },
        updateSchool(item){
          this.openUpdate = true
          this.updateItem = item
        },
        update(){
          this.updateItem.school_name = this.newName
          this.$store.dispatch("updateSchool",this.updateItem)
        },
        deleteSchool(index){
          this.$Modal.warning({
            title: '删除',
            content: '<p>是否确认删除该学院?</p>',
            closable:true,
            onOk: () => {
              this.$store.dispatch("deleteSchool",this.schoolList[index].school_id)
            }
          });
        }
      },
      mounted() {
        this.$store.dispatch('getSchoolList')
      }
    }
</script>

<style scoped>
  .menuitem{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
