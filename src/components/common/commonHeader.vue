<template>
  <div class="header">
    <div class="logo">健康打卡管理系统</div>
    <div class="collapse-btn" @click="handleCollapseChange">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullScreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <div class="user-avator">
          <img v-bind:src="this.avatar" />
        </div>
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ this.name }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="https://github.com/lutasam/AdminTemplate" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="userinfo">管理个人信息</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../service/bus";
import {takeUserInfo} from "@/api/user";
export default {
  name: "commonHeader",
  data() {
    return {
      collapse: false,
      fullScreen: false,
      name: "",
      avatar: "",
    };
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    // 全屏
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
      this.fullScreen = !this.fullScreen;
    },

    // 下拉菜单选择
    handleCommand(commond) {
      if (commond === "logout") {
        this.$router.push("/login");
      } else if (commond === "userinfo"){
        this.$router.push("/userinfo");
      }
    },

    // 控制折叠面板
    handleCollapseChange() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },

    loadUserInfo() {
      let params = {};
      takeUserInfo(params).then((res) => {
        if (res.code === 200) {
          this.name = res.data.user.name;
          this.avatar = res.data.user.avatar;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
};
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background-color: #6190e8;
  color: #ffffff;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
  color: #ffffff;
}
.header .logo {
  float: left;
  line-height: 70px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #ffffff;
  margin-left: 15px;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #999;
}
.btn-bell .el-icon-bell {
  color: #999;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 10px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>