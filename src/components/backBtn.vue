<template>
  <div class="back-btn-wrap">
    <i class="el-icon-arrow-left" 
      :style="{height:height, width:width, lineHeight:height}"
      @click="onClick"></i>
  </div>
</template>

<script>
  export default {
    props: {
      height: {
        type: String,
        default: '30px'
      },
      width: {
      	type: String,
        default: '30px'
      }
    },
    methods: {
      onClick() {
      	this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  .back-btn-wrap {
  	$border-style: 1px solid #EBEEF5;
    .el-icon-arrow-left {
      display: block;
      text-align: center;
      border: $border-style;
      &:hover {
        background-color: #909399;
        color: #fff;
      }
    }
  }
</style>