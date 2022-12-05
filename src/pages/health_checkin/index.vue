<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" class="input-wrapper"></el-input>
      </el-form-item>
      <el-form-item label="体温" prop="temperature_range">
        <el-radio-group v-model="form.temperature_range">
          <el-radio label=0>小于36°C</el-radio>
          <el-radio label=1>36°C~37°C</el-radio>
          <el-radio label=2>37°C~38°C</el-radio>
          <el-radio label=3>38°C~39°C</el-radio>
          <el-radio label=4>大于等于39°C</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="健康状态" prop="is_healthy">
        <el-radio-group v-model="form.is_healthy">
          <el-radio label=true>健康</el-radio>
          <el-radio label=false>不健康</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="健康码" prop="health_code_status">
        <el-select v-model="form.health_code_status" class="input-wrapper">
          <el-option label="绿码" value=1></el-option>
          <el-option label="灰码" value=2></el-option>
          <el-option label="黄码" value=3></el-option>
          <el-option label="红码" value=4></el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="姓名">-->
<!--        <el-input v-model="form.username" class="input-wrapper"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="毕业学校">-->
<!--        <el-select v-model="form.school" class="input-wrapper">-->
<!--          <el-option label="南京航空航天大学" value="nuaa"></el-option>-->
<!--          <el-option label="南京理工大学" value="nust"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="在校时间">-->
<!--        <div>-->
<!--          <el-date-picker-->
<!--              v-model="form.startDate"-->
<!--              type="datetime"-->
<!--              placeholder="入学日期"-->
<!--              class="input-wrapper"-->
<!--          />-->
<!--          <span style="margin: 0 10px;color: #DCDFE6">-</span>-->
<!--          <el-date-picker-->
<!--              v-model="form.startDate"-->
<!--              type="datetime"-->
<!--              placeholder="离校日期"-->
<!--              class="input-wrapper"-->
<!--          />-->
<!--        </div>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="所学专业">-->
<!--        <el-cascader :options="options" class="input-wrapper">-->
<!--          <template slot-scope="{ node, data }">-->
<!--            <span>{{ data.label }}</span>-->
<!--            <span v-if="!node.isLeaf">({{ data.children.length }})</span>-->
<!--          </template>-->
<!--        </el-cascader>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="必修专业">-->
<!--        <el-radio-group v-model="form.resource">-->
<!--          <el-radio label="数据结构"></el-radio>-->
<!--          <el-radio label="算法"></el-radio>-->
<!--          <el-radio label="计算机操作系统"></el-radio>-->
<!--          <el-radio label="数据库系统"></el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="选修课">-->
<!--        <el-checkbox-group v-model="form.type">-->
<!--          <el-checkbox label="计算机组装与维修" name="type"></el-checkbox>-->
<!--          <el-checkbox label="企业网安全高级技术" name="type"></el-checkbox>-->
<!--          <el-checkbox label="计算机网络技术" name="type"></el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否在校">-->
<!--        <el-switch v-model="form.status"></el-switch>-->
<!--      </el-form-item>-->
      <el-form-item label="备注信息" prop="remark">
        <el-input type="textarea" v-model="form.remark" rows="4" style="width: 600px"></el-input>
      </el-form-item>
      <el-form-item label="附件上传">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            style="margin: 20px 0"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {uploadUserRecord} from "@/api/record";

export default {
  name: "health_checkin",
  data() {
    return {
      form: {
        address: "",
        temperature_range: 0,
        is_healthy: true,
        health_code_status: 1,
        remark: "",
        appendix: "",
      },
      rules: {
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" },
          { max: 100, message: "地址过长", trigger: "blur" },
        ],
        temperature_range: [
          { required: true, message: "体温不能为空", trigger: "blur" },
        ],
        health_code_status: [
          { required: true, message: "健康码状态不能为空", trigger: "blur" },
        ],
        is_healthy: [
          { required: true, message: "健康状态不能为空", trigger: "blur" },
        ],
      },
      // options: [
      //   {
      //     value: "hk",
      //     label: "航空学院",
      //     children: [
      //       {
      //         value: "fxqsj",
      //         label: "飞行棋设计与工程",
      //       },
      //       {
      //         value: "fxqhj",
      //         label: "飞行器环境与生命保障工程",
      //       },
      //     ],
      //   },
      //   {
      //     value: "ny",
      //     label: "能源与动力学院",
      //     children: [
      //       {
      //         value: "fxqdl",
      //         label: "飞行器动力工程",
      //       },
      //       {
      //         value: "ny",
      //         label: "能源与动力工程",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return;
        } else {
          let params = {
            address: this.form.address,
            temperature_range: this.form.temperature_range,
            is_healthy: this.form.is_healthy,
            health_code_status: this.form.health_code_status,
            remark: this.form.remark,
            appendix: this.form.appendix,
          };
          uploadUserRecord(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("上传成功!");
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    onCancel() {

    }
  },
};
</script>

<style scoped>
</style>