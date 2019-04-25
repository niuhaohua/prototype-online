import indexPage from '@/pages/index'

export const defaultRouterMap = [{
    path: '/login',
    name: 'Login',
    menuShow: false,
    component: () => import('@/pages/login/index')
  }, {
    path: '/',
    name: '',
    menuShow: true,
    redirect: '/dataSource',
    leaf: true, // 只有一个节点
    iconCls: 'el-icon-upload', // 图标样式class
    component: indexPage,
    children: [{
      path: '/dataSource',
      name: '更新原型',
      menuShow: true,
      component: () => import('@/pages/Submit')
    }]
  }
  // ,
  // {
  //   path: '/',
  //   name: '',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //     path: '/product',
  //     name: '产品管理',
  //     menuShow: true,
  //     component: () => import('@/pages/Submit')
  //   }]
  // },
  // {
  //   path: '/',
  //   name: '',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //     path: '/customerRouter',
  //     name: '客户路由',
  //     menuShow: true,
  //     component: () => import('@/pages/Submit')
  //   }]
  // },
  // {
  //   path: '/',
  //   name: '',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //     path: '/defaultRouter',
  //     name: '默认路由',
  //     menuShow: true,
  //     component: () => import('@/pages/Submit')
  //   }]
  // },
  // {
  //   path: '/',
  //   name: '',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //     path: '/user',
  //     name: '用户管理',
  //     menuShow: true,
  //     component: () => import('@/pages/Submit')
  //   }]
  // },
  // {
  //   path: '/',
  //   name: '',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //     path: '/operatorSection',
  //     name: '运营商号段管理',
  //     menuShow: true,
  //     component: () => import('@/pages/Submit')
  //   }]
  // },
  // {
  //   path: '/',
  //   name: '',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //     path: '/log',
  //     name: '操作日志查询',
  //     menuShow: true,
  //     component: () => import('@/pages/Submit')
  //   }]
  // }
  // {
  //   path: '/account',
  //   name: '账号管理',
  //   menuShow: true,
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //       path: '/accountList',
  //       name: '账号列表',
  //       menuShow: true,
  //       component: () => import('@/pages/install/accountList')
  //     },
  //     {
  //       path: '/power',
  //       name: '权限管理',
  //       menuShow: true,
  //       component: () => import('@/pages/install/power')
  //     }
  //   ]
  // },
  // {
  //   path: '/mange',
  //   name: '信息管理',
  //   menuShow: true,
  //   iconCls: 'el-icon-upload', // 图标样式class
  //   component: indexPage,
  //   children: [{
  //       path: '/submit2',
  //       name: '账号信息',
  //       menuShow: true,
  //       component: () => import('@/pages/install/Submit2')
  //     },
  //     {
  //       path: '/submit3',
  //       name: '修改密码',
  //       menuShow: true,
  //       component: () => import('@/pages/install/Submit3')
  //     }
  //   ]
  // }
]
