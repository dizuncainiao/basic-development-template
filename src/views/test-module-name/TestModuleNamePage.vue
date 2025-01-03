<script setup lang="ts">
import TestDialog from '@/views/test-module-name/TestDialog.vue'
import TestDrawer from '@/views/test-module-name/TestDrawer.vue'

// 组件 ref 命名示例
const testDialogRef = ref()
</script>

<template>
  <div>TestModuleNamePage content</div>

  <TestDialog ref="testDialogRef" />

  <TestDrawer />
</template>

<style scoped></style>
