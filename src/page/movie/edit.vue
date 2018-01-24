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
  	<el-form :model="movie" label-width="80px" ref="movieForm">
      <el-form-item label="图片">

        <el-upload
          action="http://127.0.0.1:7001/store/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="displayImgs"
          :on-success="handleUploadSuccess" >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </el-form-item>
		  <el-form-item label="名称">
		    <el-input v-model="name"></el-input>
		  </el-form-item>
		  <el-form-item label="译名">
		    <el-input v-model="transName"></el-input>
		  </el-form-item>
		  <el-form-item label="类别">
			  <el-checkbox-group v-model="movie.types" >
			  	<el-checkbox border v-for="t in types" :label="t.id" :key="t.id" >{{t.name}}</el-checkbox>
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
		  <el-form-item label="豆瓣评分" width="50%" >
		    <el-input v-model="movie.doubanScore"></el-input>
		  </el-form-item>
		  <el-form-item label="IMDB评分" width="50%" >
		    <el-input v-model="movie.imdbScore"></el-input>
		  </el-form-item>

		  <div class="clear">
		  	<div class="left" style="width:50%">
		  		<el-form-item label="导演">
				    <el-button icon="el-icon-plus" size="small" round @click="addMutilAttrValue('directors')" ></el-button>
				  </el-form-item>
				  <el-form-item
				    v-for="(d, index) in directors"
				    :label="'导演' + index"
				    :key="index"
				    :rules="{
				      required: true, message: '导演名称不能为空', trigger: 'blur'
				    }"
				  >
				    <el-input v-model="d.value" style="width:80%"></el-input>
				    <el-button @click.prevent="removeMutilAttrValue('directors', d)">删除</el-button>
				  </el-form-item>
		  	</div>

		  	<div class="right" style="width:50%">
		  		<el-form-item label="演员">
				    <el-button icon="el-icon-plus" size="small" round @click="addMutilAttrValue('actors')" ></el-button>
				  </el-form-item>
				  <el-form-item
				    v-for="(a, index) in actors"
				    :label="'演员' + index"
				    :key="index"
				    :rules="{
				      required: true, message: '演员名称不能为空', trigger: 'blur'
				    }"
				  >
				    <el-input v-model="a.value" style="width:80%"></el-input>
				    <el-button @click.prevent="removeMutilAttrValue('actors', a)">删除</el-button>
				  </el-form-item>
		  	</div>
		  </div>

		  <el-form-item label="简介">
		  	<el-input
				  type="textarea"
				  autosize
				  placeholder="请输入内容"
				  v-model="movie.profile">
				</el-input>
		  </el-form-item>

		  <el-form-item label="下载地址">
		    <el-button icon="el-icon-plus" size="small" round @click="addMutilAttrValue('hrefs')"></el-button>
		  </el-form-item>
		  <el-form-item
		    v-for="(h, index) in hrefs"
		    :label="'下载地址' + index"
		    :rules="{
		      required: true, message: '下载地址不能为空', trigger: 'blur'
		    }"
		    :key="index"
		    label-width="100"
		  >
		    <el-input v-model="h.value" style="width:80%"></el-input>
		    <el-button @click.prevent="removeMutilAttrValue('hrefs', h)">删除</el-button>
		  </el-form-item>

		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">保存</el-button>
		    <el-button @click="cancel">取消</el-button>
		  </el-form-item>
		</el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        movie: {},
        types: [],
        dialogImageUrl: '',
        dialogVisible: false

      }
    },
    methods: {
      handleRemove(file, fileList) {
        if(this.movie.displayImg) {
          let index = this.movie.displayImg.indexOf(file.url.substring(file.url.lastIndexOf("/") + 1))
          if(index !== -1){
            this.movie.displayImg.splice(index, 1)
          }
        }
      },
      handleUploadSuccess(response, file, fileList) {
        if(!this.movie.displayImg) {
          this.movie.displayImg = []
        }
        this.movie.displayImg.push(response.data.id)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onSubmit() {
      	let me = this
      	this.movie.actors = this.actors.filter(m => m.value).map(m => m.value)
       	this.movie.directors = this.directors.filter(m => m.value).map(m => m.value)
       	this.movie.hrefs = this.hrefs.filter(m => m.value).map(m => m.value)
       	let url = this.movie.id ? 'http://127.0.0.1:7001/movie/update' : 'http://127.0.0.1:7001/movie/create'
       	console.log(url)
       	this.$http.post(url, this.movie)
    		.then((response) => {
    			if(response.data.success) {
    				me.$notify({
		          title: '成功',
		          message: '保存成功',
		          type: 'success'
		        });
    				me.loadData()
    			} else {
    				this.$notify.error({
		          title: '错误',
		          message: response.data.msg
		        });
    			}
    		})
      },
      cancel() {
      	this.$router.go(-1)
      },
      removeMutilAttrValue(attr, value) {
      	if(this[attr] instanceof Array) {
      		let index = this.movie[attr].indexOf(value.value)
      		console.log(index)
      		if (index !== -1) {
      			console.log(index)
	        	this.movie[attr].splice(index, 1)
	        } else {
	        	index = this[attr].map(m => m.value).indexOf(value.value)
	        	this.movie[attr].splice(index, 1)
	        }
      	}
      },
      addMutilAttrValue(attr) {
      	if(this[attr] instanceof Array) {
      		if(this[attr].filter(f => f.value === '').length > 0) {
      			return
      		}
      		this.movie[attr].push('')
      	}
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
      			if(response.data.success) {
      				me.movie = response.data.data
      			} else {
      				this.$notify.error({
			          title: '错误',
			          message: response.data.msg
			        });
      			}
      		})
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
    	actors: {
    		get() {
    			let result = []
    			if( this.movie.actors && this.movie.actors.length > 0) {
    				this.movie.actors.forEach(a => result.push({ value : a}))
    			}
    			return result
    		}
    	},
    	directors: {
    		get() {
    			let result = []
    			if( this.movie.directors && this.movie.directors.length > 0) {
    				this.movie.directors.forEach(a => result.push({ value : a}))
    			}
    			return result
    		}
    	},
    	hrefs: {
    		get() {
    			let result = []
    			if( this.movie.hrefs && this.movie.hrefs.length > 0) {
    				this.movie.hrefs.forEach(a => result.push({ value : a}))
    			}
    			return result
    		}
    	},
      displayImgs: {
        get() {
          let result = []
          if( this.movie.displayImg && this.movie.displayImg.length > 0) {
           result = this.movie.displayImg.map(m => {return { name: 'img.jpg', url: `http://127.0.0.1:7001/store/gain/${m}` }})
          }
          return result
        }
      }
    },
    created() {
    	this.loadData()
    }
  }
</script>

<style lang="scss">
	@import '../../style/common';
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