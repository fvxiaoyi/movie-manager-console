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
		  <el-form-item label="名称">
		    <el-input v-model="name"></el-input>
		  </el-form-item>
		  <el-form-item label="译名">
		    <el-input v-model="transName"></el-input>
		  </el-form-item>

		  <el-form-item label="类别">
			  <el-checkbox-group v-model="checkList">
			  	<el-checkbox v-for="type in types" label="type.id">{{type.name}}</el-checkbox>
			  </el-checkbox-group>
		  </el-form-item>

		  <el-form-item label="年份">
		    <el-input v-model="movie.year"></el-input>
		  </el-form-item>
		  <el-form-item label="语言">
		    <el-input v-model="language"></el-input>
		  </el-form-item>
		  <el-form-item label="国家">
		    <el-input v-model="country"></el-input>
		  </el-form-item>
		  <el-form-item label="时长">
		    <el-input v-model="movie.time"></el-input>
		  </el-form-item>
		  <el-form-item label="豆瓣评分">
		    <el-input v-model="movie.doubanScore"></el-input>
		  </el-form-item>
		  <el-form-item label="IMDB评分">
		    <el-input v-model="movie.imdbScore"></el-input>
		  </el-form-item>
		  <el-form-item label="简介">
		  	<el-input
				  type="textarea"
				  autosize
				  placeholder="请输入内容"
				  v-model="movie.profile">
				</el-input>
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
        },
        checkList: ['选中且禁用','复选框 A'],
        types: []
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      loadData() {
      	let id = this.$route.params.id,
      		me = this
      	this.$http.post('http://127.0.0.1:7001/type/findAll', {})
    		.then(function (response) {
    			me.types = response.data.data
    		})
      	if(id) {
      		this.$http.post('http://127.0.0.1:7001/movie/get', { id })
      		.then(function (response) {
      			me.movie = response.data.data
      		})
      	} else {

      	}
      }
    },
    computed: {
    	name: {
    		get() {
    			return this.movie.name && this.movie.name.length > 0 ? this.movie.name.reduce((x,y) => x + ',' + y) : ''
    		},
    		set(v) {
    			if(v && v.length > 0) {
    				this.movie.name = v.split(',')
    			} else {
    				this.movie.name = []
    			}
    		}
    	},
    	transName: {
    		get() {
    			return this.movie.transName && this.movie.transName.length > 0 ? this.movie.transName.reduce((x,y) => x + ',' + y) : ''
    		},
    		set(v) {
    			if(v && v.length > 0) {
    				this.movie.transName = v.split(',')
    			} else {
    				this.movie.transName = []
    			}
    		}
    	},
    	country: {
    		get() {
    			return this.movie.country && this.movie.country.length > 0 ? this.movie.country.reduce((x,y) => x + ',' + y) : ''
    		},
    		set(v) {
    			if(v && v.length > 0) {
    				this.movie.country = v.split(',')
    			} else {
    				this.movie.country = []
    			}
    		}
    	},
    	language: {
    		get() {
    			return this.movie.language && this.movie.language.length > 0 ? this.movie.language.reduce((x,y) => x + ',' + y) : ''
    		},
    		set(v) {
    			if(v && v.length > 0) {
    				this.movie.language = v.split(',')
    			} else {
    				this.movie.language = []
    			}
    		}
    	},
    	type: {
    		get() {
    			return this.movie.types && this.movie.types.length > 0 ? this.movie.types.map(_m => _m._id) : []
    		},
    		set(v) {
    			console.log(v)
    			this.movie.types = v
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