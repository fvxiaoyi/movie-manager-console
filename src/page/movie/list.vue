<template>
	<div class="movie-list-container">
	  <el-row class="top-bar">
	  	<el-col :span="1">
	  	  <back-btn></back-btn>
	  	</el-col>
	    <el-col :span="1" :offset="1">
	      <el-button type="primary" size="small" plain @click="onAddClick">添加</el-button>
	    </el-col>
	    <el-col :span="7" :offset="14">
	      <el-form :inline="true" size="small">
		    <el-form-item>
		      <el-input v-model="searchName" placeholder="请输入名称查询"></el-input>
		    </el-form-item>
		    <el-form-item>
		      <el-button type="info" plain @click="onSearchClick">查询</el-button>
		    </el-form-item>
		  </el-form>
	    </el-col>
	  </el-row>
	  <el-table
	    :data="movies"
	    border
	    stripe
	    @sort-change="onSortChange">
	    <el-table-column
	      sortable="custom"
	      prop="year"
	      label="年份"
	      width="120">
	    </el-table-column>
	    <el-table-column
	    	sortable="custom"
	      prop="name"
	      label="名称"
	      width="350">
	    </el-table-column>
	    <el-table-column
	      prop="transName"
	      label="译名"
	      width="350">
	    </el-table-column>
	    <el-table-column
	      prop="country"
	      label="国家"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      prop="types"
	      label="类型"
	      width="200">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="180">
	      <template slot-scope="scope">
	        <el-button size="mini" type="primary" @click="onEditClick(scope.row)">编辑</el-button>
	        <el-button size="mini" type="danger">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <div class="pagin-container">
	    <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="15"
          layout="jumper, prev, pager, next, total"
          :total="total" >
        </el-pagination>
      </div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
      	param : {},
      	searchName : '',
      	currentPage: 1,
      	total: 0,
      	movies: []
      }
    },
    methods: {
      handleCurrentChange(val) {
      	this.currentPage = val
        this.loadData()
      },
      onAddClick() {
      	this.$router.push('/movie/add')
      },
      onEditClick(row) {
      	this.$router.push(`/movie/edit/${row.id}`)
      },
      onSortChange(sort) {
      	if(sort.prop) {
      		this.param.sort = {
	      		prop : sort.prop,
	      		order : sort.order
	      	}
      	} else {
      		if(this.param.sort) {
      			delete this.param.sort
      		}
      	}
      	this.loadData()
      },
      onSearchClick() {
      	if(this.searchName.length === 0 && this.param.searchName) {
      		delete this.param.searchName
      	} else {
      		this.param['searchName'] = this.searchName
      	}
      	this.loadData()
      },
      loadData() {
      	let me = this,
      		pagingParam = {
      			start : this.start * 15,
      			limit : 15
      		}
      	pagingParam.param = this.param
	    	this.$http.post('http://127.0.0.1:7001/movie/list', pagingParam).then(function (response) {
	    		if(response.data.success) {
	    			let _data = response.data.data
	    			_data.forEach(m => {
	    				if(m.name && m.name.length > 0) {
	    					m.name = m.name.reduce((x,y) => x + ',' + y)
	    				} else {
	    					m.name = ''
	    				}
	    				if(m.transName && m.transName.length > 0) {
	    					m.transName = m.transName.reduce((x,y) => x + ',' + y)
	    				} else {
	    					m.transName = ''
	    				}
	    				if(m.types && m.types.length > 0) {
	    					m.types = m.types.map(_m => _m.name).reduce((x,y) => x + ',' + y)
	    				} else {
	    					m.types = ''
	    				}
	    			})
	    			me.total = response.data.total
	    			me.movies = _data
	    		}
			  })
	    }
    },
    created() {
    	this.loadData()
    },
    computed: {
    	start() {
    		return this.currentPage === 1 ? 0 : this.currentPage - 1
    	}
    }
  }
</script>

<style lang="scss">
  .movie-list-container {
  	$border-style: 1px solid #EBEEF5;
    .top-bar {
  	  height: 49px;
  	  border-top: $border-style;
  	  margin: 9px 0 10px 0;
  	  padding-top: 10px;
  	}
  	.el-table {
  	  width: 1400px;
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