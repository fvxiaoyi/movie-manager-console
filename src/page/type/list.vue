<template>
	<div class="type-list-container">
	  <el-row class="top-bar">
	  	<el-col :span="1">
	  	  <back-btn></back-btn>
	  	</el-col>
	    <el-col :span="1" :offset="1">
	      <el-button type="primary" size="small" >添加</el-button>
	    </el-col>
	    <el-col :span="7" :offset="14">
	      <el-form :inline="true" size="small">
		    <el-form-item>
		      <el-input v-model="searchName" placeholder="请输入名称查询"></el-input>
		    </el-form-item>
		    <el-form-item>
		      <el-button type="primary">查询</el-button>
		    </el-form-item>
		  </el-form>
	    </el-col>
	  </el-row>
	  <el-table
	    :data="tableData3"
	    border
	    stripe>
	    <el-table-column
	      fixed
	      prop="date"
	      label="日期"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="province"
	      label="省份"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="city"
	      label="市区"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="address"
	      label="地址"
	      width="300">
	    </el-table-column>
	    <el-table-column
	      prop="zip"
	      label="邮编"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="zip"
	      label="邮编"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      prop="zip"
	      label="邮编"
	      width="120">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="180">
	      <template slot-scope="scope">
	        <el-button size="mini" type="primary">编辑</el-button>
	        <el-button size="mini" type="danger">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <div class="pagin-container">
	    <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="15"
          layout="jumper, prev, pager, next, total"
          :total="400">
        </el-pagination>
      </div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
      	searchName : '',
      	currentPage4: 4,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="scss">
  .type-list-container {
  	$border-style: 1px solid #EBEEF5;
    .top-bar {
  	  height: 49px;
  	  border-top: $border-style;
  	  margin-bottom: 10px;
  	  padding-top: 10px;
  	}
  	.el-table {
  	  width: 100%;
  	}
  	.pagin-container {
  	  height: 45px;
  	  padding-top: 15px;
  	  border: $border-style;
  	  border-top: none;
  	  text-align: center;
  	}
  }
</style>