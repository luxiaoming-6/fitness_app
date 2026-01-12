<template>
  <div class="user-list-container">
    <h2 class="page-title">用户管理</h2>
    
    <!-- 搜索和筛选区域 -->
    <el-card shadow="hover" class="search-card">
      <el-form :model="searchForm" label-position="left" label-width="80px" inline>
        <el-form-item label="手机号">
          <el-input
            v-model="searchForm.phone"
            placeholder="请输入手机号"
            prefix-icon="Phone"
            clearable
            maxlength="11"
          />
        </el-form-item>
        
        <el-form-item label="姓名">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入姓名"
            prefix-icon="User"
            clearable
            maxlength="20"
          />
        </el-form-item>
        
        <el-form-item label="性别">
          <el-select
            v-model="searchForm.gender"
            placeholder="请选择性别"
            clearable
          >
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            size="default"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSearch" round>
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset" round>
            <el-icon><RefreshRight /></el-icon>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <!-- 操作按钮区域 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd" round>
        <el-icon><Plus /></el-icon>
        新增用户
      </el-button>
      <el-button type="danger" @click="handleBatchDelete" round :disabled="selectedIds.length === 0">
        <el-icon><Delete /></el-icon>
        批量删除
      </el-button>
      <el-button type="warning" @click="handleBatchStatus" round :disabled="selectedIds.length === 0">
        <el-icon><SwitchButton /></el-icon>
        {{ batchActionText }}
      </el-button>
    </div>
    
    <!-- 用户列表 -->
    <el-card shadow="hover" class="table-card">
      <el-table
        v-loading="loading"
        :data="usersData"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        
        <el-table-column prop="id" label="ID" width="80" sortable />
        
        <el-table-column prop="name" label="姓名" sortable>
          <template #default="scope">
            <div class="user-info">
              <el-avatar :size="24" :src="scope.row.avatar || ''">{{ scope.row.name?.charAt(0) || 'U' }}</el-avatar>
              <span class="user-name">{{ scope.row.name || '未知' }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="phone" label="手机号" />
        
        <el-table-column prop="gender" label="性别" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.gender === 1 ? 'primary' : 'success'">
              {{ scope.row.gender === 1 ? '男' : '女' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        
        <el-table-column prop="role" label="角色" width="120">
          <template #default="scope">
            <el-tag>
              {{ scope.row.role || '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="createTime" label="注册时间" width="180" sortable>
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        
        <el-table-column prop="lastLoginTime" label="最后登录" width="180" sortable>
          <template #default="scope">
            {{ scope.row.lastLoginTime ? formatDate(scope.row.lastLoginTime) : '未登录' }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleView(scope.row)"
              :icon="View"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="handleEdit(scope.row)"
              :icon="Edit"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定要删除该用户吗？"
              @confirm="handleDelete(scope.row)"
              confirm-button-text="确定"
              cancel-button-text="取消"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  :icon="Delete"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="usersData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 新增/编辑用户对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-position="top"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入姓名"
            clearable
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入手机号"
            clearable
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="密码" prop="password" v-if="!formData.id">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="角色" prop="role">
          <el-select
            v-model="formData.role"
            placeholder="请选择角色"
            clearable
          >
            <el-option label="超级管理员" value="super_admin" />
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="formData.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { View, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 搜索表单
const searchForm = reactive({
  phone: '',
  name: '',
  gender: '',
  status: '',
  dateRange: []
});

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10
});

// 选中的用户ID
const selectedIds = ref([]);

// 加载状态
const loading = ref(false);

// 表单引用
const formRef = ref(null);

// 对话框状态
const dialogVisible = ref(false);
const dialogTitle = ref('新增用户');
const submitLoading = ref(false);

// 表单数据
const formData = reactive({
  id: '',
  name: '',
  phone: '',
  gender: '1',
  password: '',
  role: 'user',
  status: 1
});

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
};

// 模拟用户数据
const usersData = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138001',
    gender: 1,
    status: 1,
    role: 'super_admin',
    avatar: '',
    createTime: '2026-01-01 10:00:00',
    lastLoginTime: '2026-01-08 14:30:00'
  },
  {
    id: 2,
    name: '李四',
    phone: '13800138002',
    gender: 2,
    status: 1,
    role: 'admin',
    avatar: '',
    createTime: '2026-01-02 11:30:00',
    lastLoginTime: '2026-01-07 16:45:00'
  },
  {
    id: 3,
    name: '王五',
    phone: '13800138003',
    gender: 1,
    status: 0,
    role: 'user',
    avatar: '',
    createTime: '2026-01-03 09:15:00',
    lastLoginTime: null
  },
  {
    id: 4,
    name: '赵六',
    phone: '13800138004',
    gender: 2,
    status: 1,
    role: 'user',
    avatar: '',
    createTime: '2026-01-04 14:20:00',
    lastLoginTime: '2026-01-08 10:15:00'
  },
  {
    id: 5,
    name: '孙七',
    phone: '13800138005',
    gender: 1,
    status: 1,
    role: 'user',
    avatar: '',
    createTime: '2026-01-05 16:45:00',
    lastLoginTime: '2026-01-07 19:30:00'
  },
  {
    id: 6,
    name: '周八',
    phone: '13800138006',
    gender: 2,
    status: 1,
    role: 'user',
    avatar: '',
    createTime: '2026-01-06 10:50:00',
    lastLoginTime: '2026-01-08 09:20:00'
  },
  {
    id: 7,
    name: '吴九',
    phone: '13800138007',
    gender: 1,
    status: 1,
    role: 'user',
    avatar: '',
    createTime: '2026-01-07 13:25:00',
    lastLoginTime: '2026-01-08 11:45:00'
  },
  {
    id: 8,
    name: '郑十',
    phone: '13800138008',
    gender: 2,
    status: 1,
    role: 'user',
    avatar: '',
    createTime: '2026-01-08 08:10:00',
    lastLoginTime: null
  }
]);

// 批量操作文本
const batchActionText = ref('批量禁用');

// 处理搜索
const handleSearch = () => {
  loading.value = true;
  console.log('Search form:', searchForm);
  // 模拟搜索延迟
  setTimeout(() => {
    loading.value = false;
    ElMessage.success('搜索完成');
  }, 500);
};

// 处理重置
const handleReset = () => {
  Object.assign(searchForm, {
    phone: '',
    name: '',
    gender: '',
    status: '',
    dateRange: []
  });
  ElMessage.success('重置成功');
};

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id);
  // 更新批量操作文本
  const hasEnabled = selection.some(item => item.status === 1);
  const hasDisabled = selection.some(item => item.status === 0);
  
  if (hasEnabled && hasDisabled) {
    batchActionText.value = '批量操作';
  } else if (hasEnabled) {
    batchActionText.value = '批量禁用';
  } else if (hasDisabled) {
    batchActionText.value = '批量启用';
  }
};

// 处理状态变化
const handleStatusChange = (row) => {
  console.log('Status changed:', row);
  ElMessage.success(`用户${row.status === 1 ? '启用' : '禁用'}成功`);
};

// 处理查看
const handleView = (row) => {
  console.log('View user:', row);
  ElMessage.info('查看功能开发中');
};

// 处理编辑
const handleEdit = (row) => {
  dialogTitle.value = '编辑用户';
  // 复制用户数据到表单
  Object.assign(formData, {
    id: row.id,
    name: row.name,
    phone: row.phone,
    gender: row.gender,
    role: row.role,
    status: row.status
  });
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  console.log('Delete user:', row);
  // 从数组中删除
  const index = usersData.value.findIndex(item => item.id === row.id);
  if (index > -1) {
    usersData.value.splice(index, 1);
  }
  ElMessage.success('删除成功');
};

// 处理批量删除
const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先选择要删除的用户');
    return;
  }
  
  ElMessageBox.confirm('确定要删除选中的用户吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('Batch delete:', selectedIds.value);
    // 从数组中删除
    usersData.value = usersData.value.filter(item => !selectedIds.value.includes(item.id));
    selectedIds.value = [];
    ElMessage.success('批量删除成功');
  }).catch(() => {
    // 取消删除
  });
};

// 处理批量状态变更
const handleBatchStatus = () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先选择要操作的用户');
    return;
  }
  
  const action = batchActionText.value === '批量禁用' ? '禁用' : '启用';
  const newStatus = batchActionText.value === '批量禁用' ? 0 : 1;
  
  ElMessageBox.confirm(`确定要${action}选中的用户吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log(`Batch ${action}:`, selectedIds.value);
    // 更新状态
    usersData.value.forEach(item => {
      if (selectedIds.value.includes(item.id)) {
        item.status = newStatus;
      }
    });
    selectedIds.value = [];
    ElMessage.success(`批量${action}成功`);
  }).catch(() => {
    // 取消操作
  });
};

// 处理新增
const handleAdd = () => {
  dialogTitle.value = '新增用户';
  // 重置表单
  Object.assign(formData, {
    id: '',
    name: '',
    phone: '',
    gender: '1',
    password: '',
    role: 'user',
    status: 1
  });
  // 重置表单验证
  if (formRef.value) {
    formRef.value.resetFields();
  }
  dialogVisible.value = true;
};

// 处理提交
const handleSubmit = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    submitLoading.value = true;
    
    if (formData.id) {
      // 编辑用户
      const index = usersData.value.findIndex(item => item.id === formData.id);
      if (index > -1) {
        usersData.value[index] = {
          ...usersData.value[index],
          ...formData
        };
      }
      ElMessage.success('编辑成功');
    } else {
      // 新增用户
      const newUser = {
        ...formData,
        id: Date.now(),
        createTime: new Date().toISOString(),
        lastLoginTime: null
      };
      usersData.value.unshift(newUser);
      ElMessage.success('新增成功');
    }
    
    dialogVisible.value = false;
  } catch (error) {
    console.error('Submit failed:', error);
  } finally {
    submitLoading.value = false;
  }
};

// 处理对话框关闭
const handleDialogClose = () => {
  // 重置表单
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

// 处理分页大小变化
const handleSizeChange = (size) => {
  pagination.pageSize = size;
  console.log('Page size changed:', size);
};

// 处理当前页变化
const handleCurrentChange = (current) => {
  pagination.currentPage = current;
  console.log('Current page changed:', current);
};

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString();
};

// 组件挂载时初始化
onMounted(() => {
  console.log('User list mounted');
});
</script>

<style scoped>
.user-list-container {
  padding: 0;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.action-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
}

.table-card {
  margin-bottom: 0;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-name {
  margin-left: 8px;
  color: #303133;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .action-bar {
    flex-wrap: wrap;
  }
  
  .pagination-container {
    justify-content: center;
  }
}
</style>
