<template>
  <div class="hello">
    <div class="head">
    <span>{{ this.adress }}</span>
    <!-- <span>{{ this.cha }}</span>
    <span>{{ this.dHeight }}</span> -->
    </div>
    <!-- <a href="javascript:;" @click="back">返回</a> -->
    <!-- <div class="choose_adress">
      <el-input v-model="adress" placeholder="请输入内容"></el-input>
    </div>-->
    <div id="scroll" class="adress-list-box">
      <Nav></Nav>
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <div v-for="item in resList" class="text item list-item">
          <div class="left">
            <img class="res_img" :src="item.restaurant.image_path | imgFilters" alt="">
          </div>
          <div class="right">
            <div class="item-name">{{ item.restaurant.name }}</div>
            <div class="item-2">评分：<span class="rating"><el-rate :disabled="true" :text-color="'#ff9900'" v-model="item.restaurant.rating" :show-score="true" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate></span>月售：{{ item.restaurant.recent_order_num }}单<span class="text" v-if="item.restaurant.delivery_mode">{{ item.restaurant.delivery_mode.text }}</span></div>
            <div class="item-3">
              <span class="item-3-left">￥{{ item.restaurant.float_minimum_order_amount }}起送 | 配送费￥{{ item.restaurant.float_delivery_fee }}</span>
              <span class="item-3-right">{{ item.restaurant.distance | distance }} | {{ item.restaurant.order_lead_time }}分钟</span>
            </div>
            <div class="item-4" v-if="item.restaurant.recommend.reason">
              <img src="https://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/"><span>{{ item.restaurant.recommend.reason }}</span>
            </div>
          </div>
        </div>
        <div id="loding"></div>
        <!-- <div class="" v-if="this.listFlag">未查找到附近店铺</div> -->
      </el-card>
    
    </div> 
  </div>
</template>
</script>
<script>
import axios from 'axios'
import { Loading } from 'element-ui'
import Nav from '@/components/nav'
// import scroll from '../directive/scroll'
export default {
  name: 'Detail',
  components: {
    axios,
    scroll,
    Nav
  },
  data () {
    return {
      adress: '',
      resList: [],
      offset: 0,
      longitude: null,
      latitude: null,
      getDataFlag: true,
      loadingInstance: null,
      loadingInstance2: null,
      listFlag: false
    }
  },
  created () {
  },
  mounted () {
    if (this.$route.params.longitude) {
      this.longitude = this.$route.params.longitude
      this.latitude = this.$route.params.latitude
      this.adress = this.$route.params.address
      localStorage.setItem('adress', JSON.stringify(this.$route.params))
      this.getdata(this.longitude, this.latitude)
    } else {
      var routeAdress = JSON.parse(localStorage.getItem('adress'))
      this.longitude = routeAdress.longitude
      this.latitude = routeAdress.latitude
      this.adress = routeAdress.address
      this.getdata(this.longitude, this.latitude)
    }
    this.scroll()
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    getdata: function (longitude, latitude) {
      if (!this.getDataFlag) {
        return
      }
      this.getDataFlag = false
      this.loadingInstance2 = Loading.service({
        target: '#loding',
        lock: true
        // text: '爱吃吃，不吃滚',
        // spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
      })
      var vm = this
      var message = {
        latitude: latitude,
        longitude: longitude,
        offset: this.offset,
        limit: 8,
        rank_id: '2d8ee9ad62084adf858bf7a3a3e19587',
        terminal: 'h5'
      }
      this.$api2.get('v3/restaurants', message, function (data) {
        vm.getDataFlag = true
        if (data.items.length !== 0) {
          vm.resList = vm.resList.concat(data.items)
          // vm.listFlag = false
        } else {
          vm.resList = []
          // vm.listFlag = true
        }
        vm.loadingInstance2.close()
        vm.offset += 8
      })
    },
    scroll: function () {
      var that = this
      document.getElementById('scroll').onscroll = function () {
        var elHeight = document.getElementsByClassName('box-card')[0].clientHeight
        var scroll = this.scrollTop
        var dHeight = this.clientHeight
        that.cha = elHeight - scroll + 2
        that.dHeight = dHeight
        if (elHeight - scroll + 2 <= dHeight) {
          var routeAdress = JSON.parse(localStorage.getItem('adress'))
          that.longitude = routeAdress.longitude
          that.latitude = routeAdress.latitude
          that.getdata(that.longitude, that.latitude)
        }
      }
    }
  },
  filters: {
    imgFilters: function (value) {
      if (value.substr(value.length - 3) === 'jpg') {
        return 'https://fuss10.elemecdn.com/' + value.substr(0, 1) + '/' + value.substr(1, 2) + '/' + value.substr(3) + '.jpg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'
      } else if (value.substr(value.length - 3) === 'png') {
        return 'https://fuss10.elemecdn.com/' + value.substr(0, 1) + '/' + value.substr(1, 2) + '/' + value.substr(3) + '.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'
      } else {
        return 'https://fuss10.elemecdn.com/' + value.substr(0, 1) + '/' + value.substr(1, 2) + '/' + value.substr(3) + '.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'
      }
    },
    distance: function (value) {
      if (value < 1000) {
        return value + 'm'
      } else {
        return value / 1000 + 'km'
      }
    }
  },
  directives: {
    scroll: {
      bind: function (el, binding) {
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  padding-top: 53px;
  height: 100%;
  box-sizing: border-box;
}
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
.head span{
  display: inline-block;
  width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
  padding: 10px 3%;
  border-bottom: 1px dashed #d3d3d3;
  /* display: flex; */
  /* height: 242px; */
}
.item-name {
  font-size: 15px;
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#scroll .item-2 {
  padding-top: 10px;
  font-size: 10px;
  color:#6F6F6F;
}
#scroll .item-2 .rating{
  color:#FFC000;
  margin-right: 2%;
  display: inline-block;
}
#scroll .item-2 .text{
  display: inline-block;
  float: right;
  padding-top: 2px;
  padding-left:2px;
  padding-right: 2px;
  border-radius: 2px;
  background: #0098FF;
  font-size: 8px;
  color:#FFF;
  vertical-align: middle;
}
#scroll .item-3 {
  padding-top: 10px;
  font-size: 10px;
  color:#6F6F6F;
}
#scroll .item-3-left{
  display: inline-block;
  width: 54%;
}
#scroll .item-3-right{
  display: inline-block;
  width: 42%;
  text-align: right;
}
#scroll .item-4 {
  padding-top: 10px;
  font-size: 8px;
  color:#E8470B
}
#scroll .item-4 img {
  width: 4.5%;
  vertical-align: text-top;
}

#scroll .res_img{
  /* float: left; */
  width:100%;
  height: 100%;
  display: block;
}
#scroll .left{
  display: inline-block;
  width: 20%;
  border:1px solid #DFDFDF;
}
#scroll .right{
  padding-left:10px;
  box-sizing: border-box;
  display: inline-block;
  width:77%;
  overflow-wrap: hidden;
  vertical-align: top;
}
#scroll #loding{
  height: 80px
}

</style>

<style>
#scroll .rating .el-rate__icon{
  font-size: 10px;
  margin-right: 2px;
}
#scroll .rating .el-rate__text{
  font-size: 11px
}
#scroll .rating .el-rate{
  height: 10px;
}
</style>
