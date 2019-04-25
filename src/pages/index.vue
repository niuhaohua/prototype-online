<template>
<el-container>
  <aside :class="{showSidebar:!collapsed}">
     <div class="menu-toggle1">
      </div>
       <el-menu :default-active="$route.path" unique-opened router :collapse="collapsed" @select="handleSelect">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
  </aside>
  <el-container>
    <el-header class="header" height="60px">
      <div class="menu-toggle" @click.prevent="collapse">
          <i class="el-icon-d-arrow-left" v-show="!collapsed"></i>
          <i class="el-icon-d-arrow-right" v-show="collapsed"></i>
        </div>
    <span class="header-text">
      ccx产品原型图管理后台
    </span>
    <div class="header-right">
        <img :src="imgUrl" alt="">
      <el-badge :value="badge" :hidden="badge>0? false:true" class="item">
        <span class="message">消息</span>
      </el-badge>
    <span class="message" @click="Logout">
      退出登录
    </span>
    </div>
    
    </el-header>
    
    <el-main>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in $router.currentRoute.matched" v-show="item.name">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <transition name="el-fade-in" mode="out-in">
      <router-view></router-view>
      </transition>
    </el-main>
    
  </el-container>
</el-container>

</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      defaultActiveIndex: "0",
      nickname: '',
      collapsed: false,
      badge:5,
      imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    }
  },
  created() {
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },

    jumpTo(url) {
      this.defaultActiveIndex = url;
      this.$router.push(url); //用go刷新
    },

    Logout(){
      console.log('登出')
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  background-color: #242f42;
  color: rgb(191, 203, 217);
  text-align: left;
  line-height: 60px;
  font-size: 20px;
  padding-left: 0;
}
.el-main{
    position: relative;
}
.header-text {
  margin-left: 10px;
}
aside {
  min-width: 50px;
  background: rgb(50, 65, 87);
  &::-webkit-scrollbar {
    display: none;
  }

  &.showSidebar {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .el-menu {
    height: 100%; /*写给不支持calc()的浏览器*/
    height: -moz-calc(100% - 80px);
    height: -webkit-calc(100% - 80px);
    height: calc(100% - 80px);
    border-radius: 0px;
    background-color: rgb(50, 65, 87);
    color: rgb(191, 203, 217);
    border-right: 0px;
  }
  .el-menu .el-menu-item.is-active {
    color: rgb(32, 160, 255);
  }

  .el-menu .el-menu-item {
    min-width: 60px;
    background-color: rgb(50, 65, 87);
    color: rgb(191, 203, 217);
  }
  .el-submenu .el-submenu__title span {
    min-width: 60px;
    color: rgb(191, 203, 217);
  }
  .el-menu {
    width: 200px;
  }
  .el-menu--collapse {
    width: 60px;
  }

  .el-menu .el-menu-item,
  .el-submenu .el-submenu__title {
    height: 46px;
    line-height: 46px;
  }
  .el-menu-item:hover,
  .el-submenu .el-menu-item:hover {
    background-color: rgb(40, 52, 70);
    color: rgb(191, 203, 217);
  }
  .el-menu-item.is-active:hover {
    color: rgb(32, 160, 255);
  }
}

.menu-toggle {
  display: inline-block;
  background: #242f42;
  text-align: center;
  color: rgb(191, 203, 217);
  width: 50px;
  height: 60px;
  cursor: pointer;
  line-height: 60px;
}
.menu-toggle:hover {
  color: rgb(32, 160, 255);
}
.menu-toggle1 {
  background: #242f42;
  text-align: center;
  height: 60px;
  border-right: 1px solid rgb(50, 65, 87);
  border-bottom: 1px solid rgb(50, 65, 87);
  background-image: url("../assets/logo1.png");
  background-position: -16px 6px;
  background-repeat: no-repeat;
}
.menu-toggle1 .logo {
  // width:
  margin-top: 6px;
}
.content-container {
  background: #fff;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  padding-bottom: 1px;

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
}
.header-right{
  float: right;
}
.header-right img{
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  position: relative;
  top: 14px;
  background: #fff;
}
.message{
  font-size: 14px;
  margin: 0 15px;
  cursor: pointer;
}
.message:hover{
  color: rgb(32, 160, 255);
}
.el-badge.item{
  line-height: 1;
  top: -2px;
}
</style>
