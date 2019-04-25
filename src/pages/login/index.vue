<template>
  <el-container class="container">
    <el-main>
      <el-form class="form" ref="form">
        <div class="logo">
          <img src="../../../static/faivo.png" alt>
        </div>
        <el-form-item>
          <el-input v-model="account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { defaultRouterMap, RouterMap } from '../../router/index'
import store from '../../vuex/hello'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      account: 'admin',
      password: 'admin'
    }
  },
  created() {
  },
  mounted() { },
  methods: {
    login() {
        let data = {
            'dsName':'',
            'currentPage':1,
            'numPerPage':10
        }
        
      this.$api.get('api/dp-op-router/ds/queryds', data,
        (res) => {
            console.log(res)
        },
        (res) => {
         
        })
    //   sessionStorage.setItem('user', JSON.stringify(user));
    //   store.state.defaultRouter = defaultRouterMap
    //   this.$router.push({ path: '/submit' })
      // this.$message({
      //     message: '恭喜你，这是一条成功消息',
      //     type: 'error'
      // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  background: rgba(255, 119, 123);
}
.form {
  padding: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.logo {
  text-align: center;
  padding-bottom: 30px;
}
.login-btn {
  width: 100%;
}
</style>
