<template>
  <div class="role-list-container">
    <h2 class="page-title">角色管理</h2>
    
    <!-- 操作按钮区域 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd" round>
        <el-icon><Plus /></el-icon>
        新增角色
      </el-button>
      <el-button type="danger" @click="handleBatchDelete" round :disabled="selectedIds.length === 0">
        <el-icon><Delete /></el-icon>
        批量删除
      </el-button>
    </div>
    
    <!-- 角色列表 -->
    <el-card shadow="hover" class="table-card">
      <el-table
        v-loading="loading"
        :data="rolesData"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        
        <el-table-column prop="id" label="ID" width="80" sortable />
        
        <el-table-column prop="name" label="角色名称" sortable />
        
        <el-table-column prop="code" label="角色编码" sortable />
        
        <el-table-column prop="description" label="角色描述" />
        
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
        
        <el-table-column label="操作" width="240" fixed="right">
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
            <el-button
              type="warning"
              size="small"
              @click="handlePermissions(scope.row)"
              :icon="Lock"
            >
              权限设置
            </el-button>
            <el-popconfirm
              title="确定要删除该角色吗？"
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
          :total="rolesData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 新增/编辑角色对话框 -->
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
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入角色名称"
            clearable
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="角色编码" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入角色编码（英文大写）"
            clearable
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            placeholder="请输入角色描述"
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
import { View, Edit, Delete, Lock } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 加载状态
const loading = ref(false);

// 选中的角色ID
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
const dialogTitle = ref('新增角色');
const submitLoading = ref(false);

// 表单数据
const formData = reactive({
  id: '',
  name: '',
  code: '',
  description: '',
  status: 1
});

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 20, message: '角色名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
    { pattern: /^[A-Z_]+$/, message: '角色编码只能包含大写字母和下划线', trigger: 'blur' }
  ]
};

// 模拟角色数据
const rolesData = ref([
  {
    id: 1,
    name: '超级管理员',
    code: 'SUPER_ADMIN',
    description: '拥有系统所有权限',
    status: 1,
    createTime: '2026-01-01 10:00:00',
    updateTime: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    name: '管理员',
    code: 'ADMIN',
    description: '拥有大部分管理权限',
    status: 1,
    createTime: '2026-01-02 11:30:00',
    updateTime: '2026-01-02 11:30:00'
  },
  {
    id: 3,
    name: '普通用户',
    code: 'USER',
    description: '普通用户权限',
    status: 1,
    createTime: '2026-01-03 09:15:00',
    updateTime: '2026-01-03 09:15:00'
  }
]);

// 处理选择变化
const handleSelectionChange = (selection) => {
  selectedIds.value = selection.map(item => item.id);
};

// 处理状态变化
const handleStatusChange = (row) => {
  console.log('Status changed:', row);
  ElMessage.success(`角色${row.status === 1 ? '启用' : '禁用'}成功`);
};

// 处理查看
const handleView = (row) => {
  console.log('View role:', row);
  ElMessage.info('查看功能开发中');
};

// 处理编辑
const handleEdit = (row) => {
  dialogTitle.value = '编辑角色';
  // 复制角色数据到表单
  Object.assign(formData, {
    id: row.id,
    name: row.name,
    code: row.code,
    description: row.description,
    status: row.status
  });
  dialogVisible.value = true;
};

// 处理删除
const handleDelete = (row) => {
  console.log('Delete role:', row);
  // 从数组中删除
  const index = rolesData.value.findIndex(item => item.id === row.id);
  if (index > -1) {
    rolesData.value.splice(index, 1);
  }
  ElMessage.success('删除成功');
};

// 处理批量删除
const handleBatchDelete = () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先选择要删除的角色');
    return;
  }
  
  ElMessageBox.confirm('确定要删除选中的角色吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('Batch delete:', selectedIds.value);
    // 从数组中删除
    rolesData.value = rolesData.value.filter(item => !selectedIds.value.includes(item.id));
    selectedIds.value = [];
    ElMessage.success('批量删除成功');
  }).catch(() => {
    // 取消删除
  });
};

// 处理权限设置
const handlePermissions = (row) => {
  console.log('Set permissions:', row);
  ElMessage.info('权限设置功能开发中');
};

// 处理新增
const handleAdd = () => {
  dialogTitle.value = '新增角色';
  // 重置表单
  Object.assign(formData, {
    id: '',
    name: '',
    code: '',
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
      // 编辑角色
      const index = rolesData.value.findIndex(item => item.id === formData.id);
      if (index > -1) {
        rolesData.value[index] = {
          ...rolesData.value[index],
          ...formData,
          updateTime: new Date().toISOString()
        };
      }
      ElMessage.success('编辑成功');
    } else {
      // 新增角色
      const newRole = {
        ...formData,
        id: Date.now(),
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString()
      };
      rolesData.value.unshift(newRole);
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
  console.log('Role list mounted');
});
</script>

<style scoped>
.role-list-container {
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
