<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="头像" prop="avatar">
<!--        <el-upload-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            list-type="picture-card"-->
<!--            :on-preview="handlePictureCardPreview"-->
<!--            :on-remove="handleRemove"-->
<!--        >-->
<!--          <i class="el-icon-plus"></i>-->
<!--        </el-upload>-->
      </el-form-item>
      <el-form-item label="ID" prop="id">
        <el-input v-model="form.id" class="input-wrapper" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" class="input-wrapper" :disabled="true"></el-input>
        <el-button style="margin-left: 5px" type="danger" @click="openResetEmailDlg">修改邮箱</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-button type="danger" @click="openResetPassDlg">修改密码</el-button>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" class="input-wrapper"></el-input>
      </el-form-item>
      <el-form-item label="所在部门" prop="department">
        <el-input v-model="form.department" class="input-wrapper" :disabled="true"></el-input>
      </el-form-item>
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
<!--      <el-form-item label="备注信息">-->
<!--        <el-input type="textarea" v-model="form.desc" rows="4" style="width: 600px"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

      <!-- 重置密码窗口 -->
      <el-dialog
          :visible.sync="isResetPassDlgVisiable"
          :modal-append-to-body="false"
          width="30%"
      >
        <div class="right-wrapper">
          <el-form ref="resetPassRef" :model="resetPassForm" :rules="rules">
            <div class="login-title">重置密码</div>
            <el-form-item style="margin-top: 20px" prop="password">
              <el-input
                  show-password
                  v-model="resetPassForm.password"
                  size="large"
                  style="width: 300px"
                  type="password"
                  placeholder="密码"
                  prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 20px" prop="repassword">
              <el-input
                  show-password
                  v-model="resetPassForm.repassword"
                  size="large"
                  style="width: 300px"
                  type="password"
                  placeholder="确认密码"
                  prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-button
                  type="primary"
                  style="width: 100%"
                  size="large"
                  @click="onChangePass"
              >重置密码</el-button
              >
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-input
                  v-model="resetPassForm.active_code"
                  size="large"
                  style="width: 200px"
                  placeholder="验证码"
                  prefix-icon="el-icon-lock"
              ></el-input>
              <el-button
                  type="primary"
                  style="width: 33%; margin-left: 1px;"
                  size="large"
                  @click="onActivePass"
              >验证</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <!-- 重置邮箱窗口 -->
      <el-dialog
          :visible.sync="isResetEmailDlgVisiable"
          :modal-append-to-body="false"
          width="30%"
      >
        <div class="right-wrapper">
          <el-form ref="resetEmailRef" :model="resetEmailForm" :rules="rules">
            <div class="login-title">重置邮箱</div>
            <el-form-item style="margin-top: 20px" prop="email">
              <el-input
                  v-model="resetEmailForm.email"
                  size="large"
                  style="width: 300px"
                  placeholder="邮箱"
                  prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-button
                  type="primary"
                  style="width: 100%"
                  size="large"
                  @click="onChangeEmail"
              >重置邮箱</el-button
              >
            </el-form-item>
            <el-form-item style="margin-top: 30px">
              <el-input
                  v-model="resetEmailForm.active_code"
                  size="large"
                  style="width: 200px"
                  placeholder="验证码"
                  prefix-icon="el-icon-lock"
              ></el-input>
              <el-button
                  type="primary"
                  style="width: 33%; margin-left: 1px"
                  size="large"
                  @click="onActiveEmail"
              >验证</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>

    </el-form>
  </div>
</template>

<script>
import {uploadUserRecord} from "@/api/record";
import {takeUserInfo} from "@/api/user";
import {activeChangeUserEmail, applyChangeUserEmail, applyRegister, resetPassword} from "@/api/login";

export default {
  name: "userinfo",
  data() {
    // 邮箱校验
    var checkEmail = (rule, value, callback) => {
      const mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (rule.required && !value) {
        return callback(new Error("邮箱不能为空"));
      }
      if (value) {
        if (!mal.test(value)) {
          callback(new Error("请输入正确邮箱"));
        } else {
          callback();
        }
      }
    };
    var validateTwoPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isResetPassDlgVisiable: false,
      isResetEmailDlgVisiable: false,
      form: {
        id: "",
        email: "",
        name: "",
        avatar: "",
        department: "",
      },
      resetPassForm: {
        password: "",
        repassword: "",
        active_code: "",
      },
      resetEmailForm: {
        email: "",
        active_code: "",
      },
      rules: {
        name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, validator: checkEmail, trigger: "blur" },
          { max: 50, message: "邮箱过长", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { max: 50, message: "密码过长", trigger: "blur" },
        ],
        repassword: [
          { required: true, validator: validateTwoPass, trigger: "blur" },
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
  created() {
    this.loadData();
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return;
        } else {
          let params = {
            email: this.form.email,
            name: this.form.name,
            avatar: this.form.avatar
          };
          uploadUserRecord(params).then((res) => {
            if (res.code === 200) {
              this.$message.success("更新成功!");
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    onChangeEmail() {
      this.$refs["resetEmailRef"].validate((valid) => {
        if (valid) {
          let params = {
            email: this.registerForm.email,
          };
          applyChangeUserEmail(params).then((res) => {
            if (res.code === 200) {
              this.$message.success(
                  "修改成功，验证码已发到您的邮箱，请在5分钟内输入验证码激活账号"
              );
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    onActiveEmail() {
      let params = {
        email: this.resetEmailForm.email,
        avtive_code: this.resetEmailForm.active_code
      };
      activeChangeUserEmail(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("验证成功!");
          this.isResetEmailDlgVisiable = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    onChangePass() {
      this.$refs["resetPassRef"].validate((valid) => {
        if (valid) {
          let params = {
            email: this.resetPassForm.email,
          };
          resetPassword(params).then((res) => {
            if (res.code === 200) {
              this.$message.success(
                  "修改成功，验证码已发到您的邮箱，请在5分钟内输入验证码激活账号"
              );
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    onActivePass() {
      let params = {
        email: this.resetPassForm.email,
        active_code: this.resetPassForm.active_code,
        password: this.resetPassForm.password
      };
      activeChangeUserEmail(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("验证成功!");
          this.isResetPassDlgVisiable = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    openResetPassDlg() {
      this.isResetPassDlgVisiable = true;
    },
    openResetEmailDlg() {
      this.isResetEmailDlgVisiable = true;
    },
    onCancel() {

    },
    loadData() {
      let params = {};
      takeUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.form = res.data.user;
          this.$message.success("更新成功!");
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
};
</script>

<style scoped>
.right-wrapper {
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.login-title {
  width: 300px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 40px;
}
</style>

