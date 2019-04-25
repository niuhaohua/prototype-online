import Vue from 'vue'
import Vuex from 'vuex'
import {
  asyncRouterMap
} from '../router/asyncRouterMap.js'
import {
  defaultRouterMap
} from '../router/index.js'
Vue.use(Vuex)

const state = {
  count: 1,
  address: null,
  defaultRouter: [],
  routerArray: []
}
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
const actions = {
  GenerateRoutes({ commit }, data) {
    console.log({ commit }, data)
    return new Promise(resolve => {
      let accessedRouters
      if (data.includes('admin1')) {
        accessedRouters = asyncRouterMap
      } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
      }
      commit('SET_ROUTERS', accessedRouters)
      resolve()
    })
  }
}
const mutations = {
  add(state, n) {
    state.count += n
  },
  reduse(state) {
    state.count--
  },
  SET_ROUTERS: (state, routers) => {
    state.routerArray = routers
    state.defaultRouter = defaultRouterMap.concat(routers)
  }
}
const getters = {
  count: function (state) {
    state.count += 100
    return state.count
  }
}
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
export default store
