<template>
  <div class="common-layout">
    <el-container class="contianer">
      <el-header class="header">
        <h1 class="title">酒店预定信息查看系统</h1>
      </el-header>
      <el-main class="body">
        <div class="top">
          <div class="title">
            <h1>酒店基本信息</h1>
          </div>
          <div class="btnList">
            <el-button type="primary" @click="add">新增</el-button>
          </div>
        </div>
        <div class="center">
          <el-table border :data="self.tableData" style="width: 100%">
            <el-table-column align="center" prop="name" label="酒店名称" />
            <el-table-column align="center" prop="type" label="酒店房型" />
            <el-table-column align="center" prop="city" label="酒店城市" />
            <el-table-column align="center" prop="value" label="酒店价格" />
            <el-table-column align="center" prop="btn" label="操作">
              <template #default="scope">
                <el-button size="small" type="primary" @click="view(scope.row)"
                  >view</el-button
                >
                <el-button size="small" type="primary" @click="edit(scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteData(scope.row.id)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <Detail
      :isShow="self.isShowDetail"
      :data="self.viewDate"
      @closeDetail="closeDeatail"
    ></Detail>
    <Add :isShow="self.isShowAdd" @closeAdd="closeAdd"></Add>
    <Edit
      :isShow="self.isShowEdit"
      :data="self.editData"
      @closeEdit="closeEdit"
      ref="editc"
    ></Edit>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import Detail from "./Detail.vue";
import Add from "./Add.vue";
import Edit from "./Edit.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { HttpGet, HttpPost } from "../api/http";
const self = reactive({
  tableData: [],
  isShowDetail: false,
  isShowAdd: false,
  isShowEdit: false,
  viewDate: {},
  editData: {},
});
const editc = ref(null);
onMounted(() => {
  getHotelInfo();
});
async function getHotelInfo() {
  const data = await HttpGet("/api/hotelBookInfo");
  self.tableData = data.hotelData;
}
function add() {
  self.isShowAdd = true;
}
function view(data) {
  //弹出酒店详情弹框
  self.isShowDetail = true;
  self.viewDate = data;
}

function edit(item) {

  self.editData = item;
  //调用子组件的方式来初始化self
  editc.value.init(self.editData)
  self.isShowEdit = true;
}
function deleteData(id) {
  ElMessageBox.confirm("Do you want to delete this data?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      const result = await deleteHotelInfo(id);
      if (result.success === "ok") {
        ElMessage({
          type: "success",
          message: "Delete Success",
        });
        getHotelInfo();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
}
async function deleteHotelInfo(id) {
  const url = `/api/deleteHotel?id=${id}`;
  const result = await HttpGet(url);
  return result;
}
function closeDeatail() {
  self.isShowDetail = false;
}
function closeAdd() {
  self.isShowAdd = false;
}
function closeEdit() {
  self.isShowEdit = false;
}
</script>

<style lang="scss" scoped>
.common-layout {
  font-family: "Pingfang SC, Helvetica, Helvetica Neue, Microsoft YaHei, Arial, Heiti SC, sans-serif";
  .contianer {
    .header {
      padding: 0px;
      // background-size: top;
      background-image: url(../assets/scense.jpg);
      background-position: center;
      .title {
        text-align: center;
        // background-color: #55bc6e;
        color: #fff;
        height: 60px;
        line-height: 60px;
      }
    }
    .body {
      .top {
        padding: 20px 0px;
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 14px;
        }
      }
      .center {
        padding: 20px 0px;
      }
    }
  }
}
</style>
