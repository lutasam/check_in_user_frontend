<template>
  <div class="container">
<!--    <el-form :inline="true" :model="searchFormInline" class="demo-form-inline">-->
<!--&lt;!&ndash;      <el-form-item label="商品名">&ndash;&gt;-->
<!--&lt;!&ndash;        <el-input v-model="searchFormInline.name" clearable></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-form-item>&ndash;&gt;-->
<!--      &lt;!&ndash; <el-form-item label="学校">-->
<!--        <el-select v-model="formInline.region" placeholder clearable>-->
<!--          <el-option label="南京航空航天大学" value="nuaa"></el-option>-->
<!--          <el-option label="南京理工大学" value="nust"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item> &ndash;&gt;-->
<!--&lt;!&ndash;      <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button type="primary" icon="el-icon-search" @click="handleSearch"&ndash;&gt;-->
<!--&lt;!&ndash;          >搜索</el-button&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;      </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button type="warning" icon="el-icon-refresh" @click="handleReset"&ndash;&gt;-->
<!--&lt;!&ndash;          >重置</el-button&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;      </el-form-item>&ndash;&gt;-->
<!--    </el-form>-->
    <el-table
      ref="tableData"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
<!--      <el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column prop="id" label="记录序号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="temperature_range" label="体温"></el-table-column>
      <el-table-column prop="is_healthy" label="健康状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.is_healthy === false" type="danger">异常</el-tag>
          <el-tag v-else type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="health_code_status" label="健康码">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.health_code_status === '绿码'" type="success">{{ scope.row.health_code_status }}</el-tag>
          <el-tag v-else type="danger">{{ scope.row.health_code_status }}</el-tag>
        </template>
      </el-table-column>
<!--      <el-table-column label="商品图片">-->
<!--        <template slot-scope="scope">-->
<!--          <el-image-->
<!--            lazy-->
<!--            style="width: 50px; height: 50px;border-radius: 5px"-->
<!--            :src="scope.row.img"-->
<!--            :preview-src-list="scope.row.srcList"-->
<!--          ></el-image>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="商品状态">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag v-if="scope.row.status === 0" type="danger">异常</el-tag>-->
<!--          <el-tag v-else type="success">正常</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="created_at" label="上传时间"></el-table-column>
<!--      <el-table-column label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            plain-->
<!--            type="primary"-->
<!--            @click="handleEdit(scope.row)"-->
<!--            >编辑</el-button-->
<!--          >-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            plain-->
<!--            type="danger"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            >删除</el-button-->
<!--          >-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { findUserAllRecords } from "../../api/record";
export default {
  name: "checkin_records",
  data() {
    return {
      tableData: [
        {
          id: "1599588546200240128",
          address: "湖北武汉和平大道1178号",
          temperature_range: "36°C~37°C之间",
          is_healthy: true,
          health_code_status: "绿码",
          created_at: "2022-12-05 10:16:43"
        },
      ],
      total: 1,
      pageSize: 10,
      currentPage: 1,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadData();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    loadData() {
      let params = {
        current_page: this.currentPage,
        page_size: this.pageSize,
      };
      findUserAllRecords(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped></style>
