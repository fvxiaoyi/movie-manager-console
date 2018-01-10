<template>
  <div class="movie-edit-wrap">
  	<div class="top-bar">
  		<el-col :span="1">
	  	  <back-btn></back-btn>
	  	</el-col>
	    <el-col :span="2" :offset="1">
	      <span v-if="movie.id" class="title">编辑</span>
	      <span v-else class="title">添加</span>
	    </el-col>
		</div>
  	<el-form ref="form" :model="movie" label-width="80px">
		  <el-form-item label="活动名称">
		    <el-input v-model="movie.name"></el-input>
		  </el-form-item>
		  <el-form-item label="活动区域">
		    <el-select v-model="movie.region" placeholder="请选择活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="活动时间">
		    <el-col :span="11">
		      <el-date-picker type="date" placeholder="选择日期" v-model="movie.date1" style="width: 100%;"></el-date-picker>
		    </el-col>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="即时配送">
		    <el-switch v-model="movie.delivery"></el-switch>
		  </el-form-item>
		  <el-form-item label="活动性质">
		    <el-checkbox-group v-model="movie.type">
		      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
		      <el-checkbox label="地推活动" name="type"></el-checkbox>
		      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
		      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
		    </el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="特殊资源">
		    <el-radio-group v-model="movie.resource">
		      <el-radio label="线上品牌商赞助"></el-radio>
		      <el-radio label="线下场地免费"></el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="活动形式">
		    <el-input type="textarea" v-model="movie.desc"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">保存</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        movie: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      loadData() {
      	let id = this.$route.params.id
      	if(id) {
      		this.movie.id = id
      		console.log(this.movie)
      	} else {

      	}
      }
    },
    created() {
    	this.loadData()
    }
  }
</script>

<style lang="scss">
	.movie-edit-wrap {
		$border-style: 1px solid #EBEEF5;
		.top-bar {
  	  height: 49px;
  	  border-top: $border-style;
  	  margin: 9px 0 10px 0;
  	  padding-top: 10px;
  	  .title {
  	  	display: block;
  	  	height: 30px;
  	  	line-height: 30px;
  	  	font-size: 20px;
  	  }
  	}
	}
</style>