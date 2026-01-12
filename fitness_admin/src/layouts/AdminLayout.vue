<template>
  <el-container class="admin-container">
    <!-- 顶部导航栏 -->
    <el-header class="admin-header">
      <div class="header-left">
        <el-icon @click="toggleSidebar" class="menu-toggle"><Menu /></el-icon>
        <span class="logo">Fitness Admin</span>
      </div>
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="user-info">
            <el-avatar :size="32" :src="userStore.userInfo?.avatar || ''">{{ (userStore.userInfo?.nickname || userStore.userInfo?.username || 'U').charAt(0) }}</el-avatar>
            <span class="user-name">{{ userStore.userInfo?.nickname || userStore.userInfo?.username || '未知用户' }}</span>
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>
                <span>个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <el-icon><Setting /></el-icon>
                <span>设置</span>
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    
    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="admin-sidebar" :class="{ 'collapsed': isCollapse }">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          :collapse="isCollapse"
          router
          unique-opened
        >
          <el-menu-item index="/">
            <el-icon><DataAnalysis /></el-icon>
            <template #title>仪表盘</template>
          </el-menu-item>
          
          <el-sub-menu index="user">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user/list">
              <el-icon><List /></el-icon>
              <template #title>用户列表</template>
            </el-menu-item>
            <el-menu-item index="/user/role">
              <el-icon><UserFilled /></el-icon>
              <template #title>角色管理</template>
            </el-menu-item>
          </el-sub-menu>
          
          <el-menu-item index="/permission">
            <el-icon><Lock /></el-icon>
            <template #title>权限管理</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <!-- 主内容区 -->
      <el-main class="admin-main">
        <div class="content-wrapper">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
// 侧边栏折叠状态
const isCollapse = ref(false);

// 计算当前激活的菜单
const activeMenu = computed(() => {
  const path = route.path;
  return path;
});

// 切换侧边栏
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value;
};

// 处理用户下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人中心功能开发中');
      break;
    case 'settings':
      ElMessage.info('设置功能开发中');
      break;
    case 'logout':
      handleLogout();
      break;
    default:
      break;
  }
};

// 处理退出登录
const handleLogout = async () => {
  try {
    await userStore.logout();
    ElMessage.success('退出登录成功');
    router.push('/login');
  } catch (error) {
    ElMessage.error('退出登录失败');
  }
};

// 组件挂载时获取用户信息
onMounted(async () => {
  if (userStore.isLoggedIn && !userStore.userInfo) {
    try {
      await userStore.getUserInfo();
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  }
});
</script>

<style scoped>
.admin-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.admin-header {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
}

.menu-toggle {
  font-size: 20px;
  cursor: pointer;
  margin-right: 16px;
  color: #606266;
  transition: color 0.3s;
}

.menu-toggle:hover {
  color: #409eff;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.user-name {
  margin: 0 8px;
  color: #303133;
}

.admin-sidebar {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
  background-color: #304156;
}

.sidebar-menu :deep(.el-menu-item),
.sidebar-menu :deep(.el-sub-menu__title) {
  height: 56px;
  line-height: 56px;
  color: #bfcbd9;
  background-color: #304156;
  transition: all 0.3s;
}

.sidebar-menu :deep(.el-menu-item:hover),
.sidebar-menu :deep(.el-sub-menu__title:hover) {
  color: #409eff;
  background-color: #263445;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  color: #409eff;
  background-color: #263445;
}

.sidebar-menu :deep(.el-menu-item.is-active::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: #409eff;
}

.sidebar-menu :deep(.el-sub-menu__icon-arrow) {
  color: #bfcbd9;
}

.sidebar-menu :deep(.el-sub-menu__icon-arrow.is-active) {
  color: #409eff;
  transform: rotate(180deg);
}

.sidebar-menu :deep(.el-sub-menu .el-menu-item) {
  padding-left: 60px !important;
  background-color: #1f2d3d;
}

.admin-main {
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.content-wrapper {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    z-index: 1000;
    transition: transform 0.3s;
  }
  
  .admin-sidebar.collapsed {
    transform: translateX(-100%);
  }
  
  .logo {
    font-size: 16px;
  }
  
  .user-name {
    display: none;
  }
}
</style>
