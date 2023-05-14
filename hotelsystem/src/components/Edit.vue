<template>
  <div class="contianer">
    <el-dialog
      v-model="propsData.isShow"
      title="修改酒店预定信息"
      center
      :before-close="handleClose"
    >
      <template #footer>
        <div class="info">
          <el-form label-width="120px">
            <el-form-item label="酒店名称:">
              <el-input v-model="self.name" />
            </el-form-item>
            <el-form-item label="酒店房型:">
              <el-input v-model="self.type" />
            </el-form-item>
            <el-form-item label="酒店城市:">
              <el-input v-model="self.city" />
            </el-form-item>
            <el-form-item label="酒店价格:">
              <el-input v-model="self.value" />
            </el-form-item>
            <el-form-item label="预定人:">
              <el-input v-model="self.booker" />
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input v-model="self.mobile" />
            </el-form-item>
            <el-form-item label="平台:">
              <el-input v-model="self.platform" />
            </el-form-item>
            <el-form-item label="最晚退订时间:">
              <el-input v-model="self.endTime" />
            </el-form-item>
            <el-form-item label="酒店位置:">
              <el-input v-model="self.address" />
            </el-form-item>
          </el-form>
        </div>
        <div class="confirm">
          <el-button type="primary" @click="EditeHotel">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, watchEffect } from "vue";
import { HttpPost } from "../api/http";
import { ElMessage } from "element-plus";

const emit = defineEmits(["closeEdit"]);
const instance = getCurrentInstance();

const propsData = defineProps({
  isShow: {
    type: Boolean,
    default: false,
    require: true,
  },
  data: {
    tyep: Object,
    default: {},
    require: false,
  },
});
// watchEffect(() => {
//   console.log("propsData.data111", propsData.data);
// });
function handleClose() {
  emit("closeEdit");
}
const self = reactive({
  name: "",
  type: "",
  city: "",
  value: "",
  booker: "",
  mobile: "",
  platform: "",
  endTime: "",
  address: "",
});
function init(data) {
  self.name = data.name;
  self.type = data.type;
  self.city = data.city;
  self.value = data.value;
  self.booker = data.booker;
  self.mobile = data.mobile;
  self.platform = data.platform;
  self.endTime = data.endTime;
  self.address = data.address;
  console.log("init success", self);
}
async function EditeHotel() {
  const params = {
    name: self.name,
    type: self.type,
    city: self.city,
    value: self.value,
    booker: self.booker,
    mobile: self.mobile,
    platform: self.platform,
    endTime: self.endTime,
    address: self.address,
    id: propsData.data.id,
  };
  const url = "/api/EditHotel";
  const result = await HttpPost(url, params);
  console.log("editeResult", result);
  if (result.data.success === "ok") {
    ElMessage({
      type: "success",
      message: "Delete Success",
    });
    emit("closeEdit");
    instance?.parent.devtoolsRawSetupState.getHotelInfo();
  }
}
defineExpose({
  init
})
</script>

<style lang="scss" scoped>
.contianer {
  .confirm {
    text-align: right;
  }
}
</style>
