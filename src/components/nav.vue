
<template>
  <div id="nav-list">
    <mt-swipe :auto="0">
      <mt-swipe-item>
        <div class="box">
          <div class="box-item" v-for="item in this.list1">
            <img class="box-img" :src="item.image_hash | imgFilters" alt="">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item v-if="this.list2.length > 0">
        <div class="box">
          <div class="box-item" v-for="item in this.list2">
            <img class="box-img" :src="item.image_hash | imgFilters" alt="">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import axios from 'axios'
import { Loading } from 'element-ui'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import { Swipe, SwipeItem } from 'mint-ui'
export default {
  name: 'Detail',
  components: {
    axios
  },
  data () {
    return {
      adress: '',
      longitude: null,
      latitude: null,
      loadingInstance: null,
      list1: [],
      list2: []
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
      this.getNavList(this.longitude, this.latitude)
    } else {
      var routeAdress = JSON.parse(localStorage.getItem('adress'))
      this.longitude = routeAdress.longitude
      this.latitude = routeAdress.latitude
      this.adress = routeAdress.address
      this.getNavList(this.longitude, this.latitude)
    }
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    getNavList: function (longitude, latitude) {
      this.loadingInstance = Loading.service({
        target: '#nav-list',
        lock: true
      })
      var vm = this
      var message = {
        latitude: 31.23037,
        longitude: 121.473701,
        templates: ['main_template', 'favourable_template', 'svip_template']
      }
      this.$api2.get('openapi/entries', message, function (data) {
        if (data[0].entries.length <= 8) {
          vm.list1 = data[0].entries
        }
        if (data[0].entries.length > 8 && data[0].entries.length <= 16) {
          vm.list1 = data[0].entries.slice(0, 8)
          console.log(vm.list1)
          vm.list2 = data[0].entries.slice(8, 16)
        }
        vm.loadingInstance.close()
      })
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav-list{
  overflow: hidden;
  height: 150px;
}
.box{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.box-item{
  width: 25%;
  text-align: center;
}
.box-img{
  width: 50%;
}
.box-item span{
  display:block;
  font-size: 10px;
}
</style>
