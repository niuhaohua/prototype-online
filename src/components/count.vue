<template>
  <div>
    <h3>{{ msg }}</h3>
    <h4>{{ count }}</h4>
    <p>
      <button @click="add(10)">+</button>
      <button @click="reduse">-</button>
    </p>
  </div>
</template>
<script>
import store from '@/vuex/hello'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      msg: 'hello vuex'
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['count'])
  },
  methods: {
    ...mapMutations(['reduse', 'add'])
  },
  store
}
</script>