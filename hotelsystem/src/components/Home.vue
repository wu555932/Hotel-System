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
            <el-input
              class="search"
              v-model="self.searchWords"
              placeholder="请输入搜索内容"
            />
            <el-button type="primary" @click="add">新增</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </div>
        <div class="center">
          <el-table border :data="self.currentTableData" style="width: 100%">
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
        <div class="footer">
          <el-pagination
            background
            layout="prev, pager, next"
            v-model:page-size="self.pageSize"
            :total="self.pageTotel"
            @current-change="handleCurrentChange"
          />
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
import { reactive, onMounted, ref, watchEffect } from "vue";
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
  currentTableData: [],
  pageTotel: 0,
  pageSize: 8,
  searchWords: "",
});
const editc = ref(null);
onMounted(() => {
  getHotelInfo();
});
watchEffect(()=>{
  self.pageTotel = self.tableData.length
})
async function getHotelInfo() {
  const data = await HttpGet("/api/hotelBookInfo");
  self.tableData = data.hotelData;
  self.pageTotel = self.tableData.length;
  self.currentTableData = self.tableData.slice(0, 8);
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
  editc.value.init(self.editData);
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

function handleCurrentChange(v) {
  self.currentTableData = self.tableData.slice(8 * (v - 1), 8 * v);
}
async function search() {
  if (!self.searchWords) {
    getHotelInfo();
    return   //没有关键字搜索，则搜索全部数据
  }
  const params = {
    keyword: self.searchWords
  }
  const searchResult = await HttpPost("/api/hotelSearch",params);
  self.tableData = searchResult.data.searchData;
  self.currentTableData = self.tableData.slice(0, 8);
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
        .btnList {
          display: flex;
          justify-content: right;
          .search {
            margin: 0px 20px;
          }
        }
      }
      .center {
        padding: 20px 0px;
      }
      .footer {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
