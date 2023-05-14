<template>
  <div class="contianer">
    <el-dialog
      v-model="propsData.isShow"
      title="酒店预定详细信息"
      center
      :before-close="handleClose"
    >
      <template #footer>
        <div class="info">
          <el-form label-width="120px">
            <el-form-item label="预定人:">
              <el-input disabled v-model="data.booker" />
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input disabled v-model="data.mobile" />
            </el-form-item>
            <el-form-item label="平台:">
              <el-input disabled v-model="data.platform" />
            </el-form-item>
            <el-form-item label="最晚退订时间:" >
              <el-input disabled v-model="data.endTime" />
            </el-form-item>
            <el-form-item label="酒店位置:">
              <el-input disabled v-model="data.address" />
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const emit = defineEmits(["closeDetail"]);
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
function handleClose() {
  emit("closeDetail");
}
// const self = reactive({
//   booker: "老许",
//   mobile: "18007478531",
//   platform: "携程",
//   endTime: "2023-5-13 12:00:00",
//   address: "四川成都市锦江区滨江中路15号"
// });
</script>

<style lang="scss" scoped></style>
