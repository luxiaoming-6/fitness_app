<template>
  <div class="permission-list-container">
    <h2 class="page-title">权限管理</h2>
    
    <!-- 操作按钮区域 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd" round>
        <el-icon><Plus /></el-icon>
        新增权限
      </el-button>
      <el-button type="danger" @click="handleBatchDelete" round :disabled="selectedIds.length === 0">
        <el-icon><Delete /></el-icon>
        批量删除
      </el-button>
    </div>
    
    <!-- 权限列表 -->
    <el-card shadow="hover" class="table-card">
      <el-table
        v-loading="loading"
        :data="permissionsData"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        
        <el-table-column prop="id" label="ID" width="80" sortable />
        
        <el-table-column prop="name" label="权限名称" sortable />
        
        <el-table-column prop="code" label="权限编码" sortable />
        
        <el-table-column prop="description" label="权限描述" />
        
        <el-table-column prop="module" label="所属模块" sortable />
        
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
        
        <el-table-column prop="createTime" label="创建时间" width="180" sortable>
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        
        <el-table-column prop="updateTime" label="更新时间" width="180" sortable>
          <template #default="scope">
            {{ formatDate(scope.row.updateTime) }}
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
              title="确定要删除该权限吗？"
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
          :total="permissionsData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 新增/编辑权限对话框 -->
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
        <el-form-item label="权限名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入权限名称"
            clearable
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="权限编码" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入权限编码（如：user:list）"
            clearable
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="所属模块" prop="module">
          <el-select
            v-model="formData.module"
            placeholder="请选择所属模块"
            clearable
          >
            <el-option label="用户管理" value="user" />
            <el-option label="角色管理" value="role" />
            <el-option label="权限管理" value="permission" />
            <el-option label="订单管理" value="order" />
            <el-option label="商品管理" value="product" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="权限描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            placeholder="请输入权限描述"
            clearable
            maxlength="100"
            show-word-limit
            :rows="3"
          />
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

// 加载状态
const loading = ref(false);

// 选中的权限ID
const selectedIds = ref([]);

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10
});

// 表单引用
const formRef = ref(null);

// 对话框状态
const dialogVisible = ref(false);
const dialogTitle = ref('新增权限');
const submitLoading = ref(false);

// 表单数据
const formData = reactive({
  id: '',
  name: '',
  code: '',
  module: '',
  description: '',
  status: 1
});

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
    { min: 2, max: 20, message: '权限名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入权限编码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9:_-]+$/, message: '权限编码只能包含字母、数字、冒号、下划线和连字符', trigger: 'blur' }
  ],
  module: [
    { required: true, message: '请选择所属模块', trigger: 'change' }
  ]
};

// 模拟权限数据
const permissionsData = ref([
  {
    id: 1,
    name: '用户列表',
    code: 'user:list',
    module: 'user',
    description: '查看用户列表',
    status: 1,
    createTime: '2026-01-01 10:00:00',
    updateTime: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    name: '创建用户',
    code: 'user:create',
    module: 'user',
    description: '创建新用户',
    status: 1,
    createTime: '2026-01-01 10:00:00',
    updateTime: '2026-01-01 10:00:00'
  },
  {
    id: 3,
    name: '编辑用户',
    code: 'user:update',
    module: 'user',
    description: '编辑用户信息',
    status: 1,
    createTime: '2026-01-01 10:00:00',
    updateTime: '2026-01-01 10:00:00'
  },
  {
    id: 4,
    name: '删除用户',
    code: 'user:delete',
    module: 'user',
    description: '删除用户',
    status: 1,
    createTime: '2026-01-01 10:00:00',
    updateTime: '2026-01-01 10:00:00'
  },
  {
    id: 5,
    name: '角色列表',
    code: 'role:list',
    module: 'role',
    description: '查看角色列表',
    status: 1,
    createTime: '2026-01-02 11:30:00',
    updateTime: '2026-01-02 11:30:00'
  },
  {
    id: 6,
    name: '创建角色',
    code: 'role:create',
    module: 'role',
    description: '创建新角色',
    status: 1,
    createTime: '2026-01-02 11:30:00',
    updateTime: '2026-01-02 11:30:00'
  },
  {
    id: 7,
    name: '编辑角色',
    code: 'role:update',
    module: 'role',
    description: '编辑角色信息',
    status: 1,
    createTime: '2026-01-02 11:30:00',
    updateTime: '2026-01-02 11:30:00'
  },
  {
    id: 8,
    name: '删除角色',
    code: 'role:delete',
    module: 'role',
    description: '删除角色',
    status: 1,
    createTime: '2026-01-02 11:30:00',
    updateTime: '2026-01-02 11:30:00'
  }
]);

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id);
};

// 处理状态变化
const handleStatusChange = (row) => {
  console.log('Status changed:', row);
  ElMessage.success(`权限${row.status === 1 ? '启用' : '禁用'}成功`);
};

// 处理查看
const handleView = (row) => {
  console.log('View permission:', row);
  ElMessage.info('查看功能开发中');
};

// 处理编辑
const handleEdit = (row) => {
  dialogTitle.value = '编辑权限';
  // 复制权限数据到表单
  Object.assign(formData, {
    id: row.id,
    name: row.name,
    code: row.code,
    module: row.module,
    description: row.description,
    status: row.status
  });
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  console.log('Delete permission:', row);
  // 从数组中删除
  const index = permissionsData.value.findIndex(item => item.id === row.id);
  if (index > -1) {
    permissionsData.value.splice(index, 1);
  }
  ElMessage.success('删除成功');
};

// 处理批量删除
const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先选择要删除的权限');
    return;
  }
  
  ElMessageBox.confirm('确定要删除选中的权限吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('Batch delete:', selectedIds.value);
    // 从数组中删除
    permissionsData.value = permissionsData.value.filter(item => !selectedIds.value.includes(item.id));
    selectedIds.value = [];
    ElMessage.success('批量删除成功');
  }).catch(() => {
    // 取消删除
  });
};

// 处理新增
const handleAdd = () => {
  dialogTitle.value = '新增权限';
  // 重置表单
  Object.assign(formData, {
    id: '',
    name: '',
    code: '',
    module: '',
    description: '',
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
      // 编辑权限
      const index = permissionsData.value.findIndex(item => item.id === formData.id);
      if (index > -1) {
        permissionsData.value[index] = {
          ...permissionsData.value[index],
          ...formData,
          updateTime: new Date().toISOString()
        };
      }
      ElMessage.success('编辑成功');
    } else {
      // 新增权限
      const newPermission = {
        ...formData,
        id: Date.now(),
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      };
      permissionsData.value.unshift(newPermission);
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
  console.log('Permission list mounted');
});
</script>

<style scoped>
.permission-list-container {
  padding: 0;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
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
