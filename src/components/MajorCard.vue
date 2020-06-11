<template>
  <div class="layout">
      <Card style="width:350px;margin: 20px" v-for="(item,index) in selectedMajorList" :key="index">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          {{item.major_name}}
        </p>
        <div slot="extra">
          <Icon type="md-build" size="22" style="margin-right: 5px" @click="updateMajor(index)"/>
          <Icon type="md-trash"  size="25" @click="deleteMajor(index)"/>
        </div>
        <img :src="item.major_picURL" style="width: 315px; height: 200px;"/>
        <div style="overflow-y: scroll; height: 200px">{{item.major_desc}}</div>
      </Card>
      <Modal v-model="openUpdateMajor">
      <update-major :formData="selectedMajorList[updateIndex]"></update-major>
      </Modal>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import UpdateMajor from "./updateMajor";
    export default {
      name: "MajorCard",
      components: {UpdateMajor},
      data(){
          return{
            openUpdateMajor:false,
            updateIndex:0,
          }
      },
      computed:{
          ...mapState(['selectedMajorList'])
        },
      methods:{
          //更新信息
          updateMajor(index){
            this.updateIndex = index
            this.openUpdateMajor = true
          },
        //删除信息
        deleteMajor(index){
          this.$Modal.warning({
            title: '删除',
            content: '<p>是否确认删除该专业介绍?</p>',
            closable:true,
            onOk: () => {
              this.$store.dispatch("deleteMajor",this.selectedMajorList[index])
            }
          });
        }
      }
    }
</script>

<style scoped>
.layout{
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  background: white;
  overflow-y: scroll;
}
</style>
