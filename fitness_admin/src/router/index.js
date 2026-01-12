import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user';

// 公共路由
const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  }
];

// 私有路由
const privateRoutes = [
  {
    path: '/',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'DataAnalysis',
          requiresAuth: true
        }
      },
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('../views/user/List.vue'),
        meta: {
          title: '用户列表',
          icon: 'User',
          requiresAuth: true,
          permission: 'user:list'
        }
      },
      {
        path: '/user/role',
        name: 'RoleList',
        component: () => import('../views/user/Role.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
          requiresAuth: true,
          permission: 'role:list'
        }
      },
      {
        path: '/permission',
        name: 'PermissionList',
        component: () => import('../views/permission/Index.vue'),
        meta: {
          title: '权限管理',
          icon: 'Lock',
          requiresAuth: true,
          permission: 'permission:list'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...publicRoutes, ...privateRoutes]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Fitness Admin` : 'Fitness Admin';
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/login');
  }
  
  // 已登录用户不能访问登录页
  if (to.path === '/login' && userStore.isLoggedIn) {
    return next('/');
  }
  
  next();
});

export default router;
