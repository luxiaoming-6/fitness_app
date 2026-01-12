<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-header">
        <h2 class="login-title">Fitness Admin</h2>
        <p class="login-subtitle">欢迎登录后台管理系统</p>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-position="left"
        label-width="70px"
        class="login-form"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            prefix-icon="Phone"
            clearable
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable
            maxlength="20"
          />
        </el-form-item>
        
        <el-form-item label="验证码" prop="captcha">
          <el-row :gutter="12">
            <el-col :span="16">
              <el-input
                v-model="loginForm.captcha"
                placeholder="请输入验证码"
                prefix-icon="PictureRounded"
                clearable
                maxlength="6"
                show-word-limit
              />
            </el-col>
            <el-col :span="8">
              <div class="captcha-image" @click="refreshCaptcha">
                {{ captchaText }}
              </div>
            </el-col>
          </el-row>
        </el-form-item>
        
        <el-form-item class="login-options">
          <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
          <el-link type="primary" :underline="false" class="forgot-password">
            忘记密码？
          </el-link>
        </el-form-item>
        
        <el-form-item class="login-submit">
          <el-button
            type="primary"
            :loading="loading"
            @click="handleLogin"
            round
            class="login-button"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { ElMessage, ElNotification } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();
const loginFormRef = ref();
const loading = ref(false);

// 登录表单数据
const loginForm = reactive({
  phone: '',
  password: '',
  captcha: '',
  remember: false
});

// 生成随机验证码
const captchaText = ref('');
const generateCaptcha = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 刷新验证码
const refreshCaptcha = () => {
  captchaText.value = generateCaptcha();
};

// 验证码验证
const validateCaptcha = (rule, value, callback) => {
  if (value.toLowerCase() !== captchaText.value.toLowerCase()) {
    callback(new Error('验证码错误'));
  } else {
    callback();
  }
};

// 表单验证规则
const loginRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码长度为 6 个字符', trigger: 'blur' },
    { validator: validateCaptcha, trigger: 'blur' }
  ]
};

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return;
  
  try {
    await loginFormRef.value.validate();
    loading.value = true;
    
    // 调用登录接口
    await userStore.login({
      phone: loginForm.phone,
      password: loginForm.password
    });
    
    ElMessage.success('登录成功');
    
    // 跳转到首页
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
    if (error.msg) {
      ElMessage.error(error.msg);
    } else {
      ElMessage.error('登录失败，请检查账号密码是否正确');
    }
  } finally {
    loading.value = false;
    // 刷新验证码
    refreshCaptcha();
  }
};

// 组件挂载时初始化
onMounted(() => {
  // 生成初始验证码
  refreshCaptcha();
  
  // 如果有记住的密码，自动填充
  // 这里可以从localStorage或cookie中获取
});
</script>

<style>
/* 全局样式重置，确保全屏显示 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  box-sizing: border-box;
}

.login-form-wrapper {
  width: 100%;
  max-width: 420px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 32px;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin: 0 0 8px 0;
}

.login-subtitle {
  font-size: 14px;
  color: #909399;
  margin: 0;
}

.login-form {
  width: 100%;
}

.login-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: #303133;
}

.captcha-image {
  width: 100%;
  height: 40px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #606266;
  letter-spacing: 4px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.captcha-image:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.forgot-password {
  font-size: 14px;
}

.login-submit {
  margin-bottom: 0;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-form-wrapper {
    padding: 24px;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .login-form :deep(.el-form-item__label) {
    width: 60px;
    font-size: 14px;
  }
}
</style>
