<template>
  <div class="hello">
    <div class="head">选择收货地址1111</div>
    <div class="choose_adress">
      <el-input v-model="adress" placeholder="请输入内容"></el-input>
    </div>
    <!-- <div>{{ this.position }}</div> -->
    <div class="adress-list-box">
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <div v-if="this.listFlag" class="text item list-item">
          未查找到有效地址
        </div>
        <div v-for="item in adressList" class="text item list-item">
          <router-link class="router-link" :to="{name:'Detail',params:item}">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-adress">{{ item.address }}</div>
          </router-link>
        </div>
      </el-card>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  components: {
    axios
  },
  data() {
    return {
      adress: '',
      adressList: [],
      longitude: null,
      latitude: null,
      position: '123',
      listFlag: false
    }
  },
  watch: {
    adress: function (newadress) {
      if (!/(^\s+)|(\s+$)/g.test (newadress) && newadress.length > 0) {
        this.getAdress(newadress)
      }
    }
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          this.longitude = position.coords.longitude
          this.latitude = position.coords.latitude
          // alert(this.longitude, this.latitude)
        },
        function(e) {
          // var msg = e.code
          // var dd = e.message
          // alert('错误：' + msg + ',' + dd)
        }
      )
    }
  },
  mounted() {},
  methods: {
    getAdress: function(newadress) {
      axios({
        method: 'GET',
        url: '/pet'
      })
        .then(function(res) {
          console.log(res)
        })
        .catch(function(err) {
          let res = err.response;
          if (err) {
            window.alert("api error, HTTP CODE: " + res.status);
          }
        })
      var message = {
        keyword: newadress,
        offset: 0,
        limit: 20,
        longitude: this.longitude,
        latitude: this.latitude
      }
      var vm = this
      this.$api.get('search_poi_nearby', message, function(data) {
        if (message.keyword) {
          if (data.length === 0) {
            vm.listFlag = true
          } else {
            vm.listFlag = false
          }
          vm.adressList = data
        } else {
          vm.adressList = []
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background-color: #0090ff;
}

.choose_adress {
  padding: 10px 20px;
  padding-top: 60px;
  height: 10%;
}

.input-adress {
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 15px;
}

.adress-list-box {
  overflow: scroll;
  height: 100%;
}

.list-item {
  padding: 10px 20px;
  border-bottom: 1px solid #d3d3d3;
  text-decoration: none;
}

.item-name {
  font-size: 18px;
}

.item-adress {
  padding-top: 5px;
  font-size: 14px;
}

.router-link {
  text-decoration: none;
  color: #333;
}
</style>
